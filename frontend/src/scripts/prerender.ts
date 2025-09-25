import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import { createSitemap } from "./generateSitemap.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const baseUrl = "https://escruta.francids.com";

type RouteConfig = {
  title: string;
  description: string;
  url: string;
  image: string;
  twitterCard: string;
};

const routesDict: Record<string, RouteConfig> = {
  "/home": {
    title: "Escruta - Think, ask, learn",
    description:
      "Organize, analyze, and learn from your own knowledge. Ask questions, take notes, and get insights—all in a open-source platform.",
    url: `${baseUrl}/home`,
    image: `${baseUrl}/OpenGraphImage.png`,
    twitterCard: "summary_large_image",
  },
};

function updateOpenGraphTags(content: string, route: string): string {
  const config =
    routesDict[route as keyof typeof routesDict] || routesDict["/home"];

  content = content.replace(
    /<title>.*?<\/title>/i,
    `<title>${config.title}</title>`
  );

  content = content.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${config.description}" />`
  );

  content = content.replace(
    /<meta\s+name="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="og:title" content="${config.title}" />`
  );

  content = content.replace(
    /<meta\s+name="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="og:description" content="${config.description}" />`
  );

  content = content.replace(
    /<meta\s+name="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="og:url" content="${config.url}" />`
  );

  content = content.replace(
    /<meta\s+name="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="og:image" content="${config.image}" />`
  );

  content = content.replace(
    /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:card" content="${config.twitterCard}" />`
  );

  content = content.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${config.title}" />`
  );

  content = content.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${config.description}" />`
  );

  content = content.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${config.image}" />`
  );

  return content;
}

async function prerender() {
  const server = exec("npx vite preview --port 4173", {
    cwd: path.join(__dirname, "..", ".."),
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath(),
    args: chromium.args,
  });
  const page = await browser.newPage();

  for (const route of Object.keys(routesDict)) {
    console.log(`Prerendering ${route}`);
    await page.goto(`http://localhost:4173${route}`, {
      waitUntil: "networkidle0",
    });
    let content = await page.content();
    content = updateOpenGraphTags(content, route);
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "dist",
      route.replace(/^\//, ""),
      "index.html"
    );
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
  }
  console.log("Prerendering complete.");
  console.log("Generating sitemap...");
  createSitemap();

  await browser.close();
  server.kill();
  process.exit(0);
}

prerender().catch(console.error);
