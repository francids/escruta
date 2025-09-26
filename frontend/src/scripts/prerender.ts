import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createSitemap } from "./generateSitemap.ts";
import { Browser, Page } from "puppeteer-core";
import { preview } from "vite";
import type { PreviewServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  "/home",
  "/docs",
  "/docs/features/audio-summary",
  "/docs/features/flashcards",
  "/docs/features/mind-map",
  "/docs/features/notebooks",
  "/docs/features/notes",
  "/docs/features/sources",
  "/docs/features/study-guide",
];

class PrerenderService {
  private server: PreviewServer | null = null;
  private browser: Browser | null = null;
  private page: Page | null = null;

  async start() {
    console.log("Starting prerender process...");
    await this.startServer();
    await this.initBrowser();
  }

  private async startServer(): Promise<void> {
    this.server = await preview({ server: { port: 4173 } });
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  private async initBrowser(): Promise<void> {
    this.browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      args: [
        ...chromium.args,
        "--disable-dev-shm-usage",
        "--disable-web-security",
        "--no-sandbox",
      ],
      headless: true,
    });

    this.page = await this.browser.newPage();

    await this.page.setRequestInterception(true);
    this.page.on("request", (req) => {
      if (req.resourceType() === "image" || req.resourceType() === "font") {
        req.abort();
      } else {
        req.continue();
      }
    });
  }

  async prerenderRoutes(): Promise<void> {
    console.log(`Prerendering ${routes.length} routes...`);

    await this.testConnection();

    for (const route of routes) {
      try {
        await this.prerenderRoute(route);
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error(
          `Failed to prerender ${route}:`,
          (error as Error).message
        );
      }
    }
  }

  private async testConnection(): Promise<void> {
    if (!this.page) {
      throw new Error("Page not initialized");
    }

    console.log("Testing server connection...");

    for (let i = 0; i < 5; i++) {
      try {
        if (!this.server?.resolvedUrls?.local) {
          throw new Error("Server URL not available");
        }
        await this.page.goto(this.server?.resolvedUrls?.local[0], {
          waitUntil: "domcontentloaded",
          timeout: 5000,
        });
        console.log("Server is ready!");
        return;
      } catch {
        console.log(`Connection attempt ${i + 1}/5 failed, retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    throw new Error("Cannot connect to server after 5 attempts");
  }

  private async prerenderRoute(route: string): Promise<void> {
    const startTime = Date.now();

    if (!this.page) {
      throw new Error("Page not initialized");
    }

    if (!this.server?.resolvedUrls?.local) {
      throw new Error("Server URL not available");
    }

    await this.page.goto(
      new URL(route, this.server?.resolvedUrls?.local[0]).toString(),
      {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      }
    );

    await this.page
      .waitForFunction(
        () =>
          (document.querySelector("[data-reactroot], #root")?.children.length ??
            0) > 0,
        { timeout: 5000 }
      )
      .catch(() => {});

    const content = await this.page.content();
    const filePath = this.getFilePath(route);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);

    const duration = Date.now() - startTime;
    console.log(`${route} (${duration}ms)`);
  }

  private getFilePath(route: string): string {
    const routePath = route.replace(/^\//, "") || "index";
    return path.join(__dirname, "..", "..", "dist", routePath, "index.html");
  }

  async cleanup(): Promise<void> {
    console.log("Cleaning up...");

    if (this.browser) {
      await this.browser.close();
    }

    if (this.server) {
      await this.server.close();
    }
  }
}

async function prerender(): Promise<void> {
  const service = new PrerenderService();

  try {
    await service.start();
    await service.prerenderRoutes();
    createSitemap();
    console.log("Prerender complete!");
  } catch (error) {
    console.error("Prerender failed:", error);
    process.exit(1);
  } finally {
    await service.cleanup();
    process.exit(0);
  }
}

prerender();
