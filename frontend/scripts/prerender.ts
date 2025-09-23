import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  "/docs",
  "/docs/features/audio-summary",
  "/docs/features/flashcards",
  "/docs/features/mind-map",
  "/docs/features/notebooks",
  "/docs/features/notes",
  "/docs/features/sources",
  "/docs/features/study-guide",
];

async function prerender() {
  const server = exec("npx vite preview --port 4173", {
    cwd: path.join(__dirname, ".."),
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const route of routes) {
    console.log(`Prerendering ${route}`);
    await page.goto(`http://localhost:4173${route}`, {
      waitUntil: "networkidle0",
    });
    const content = await page.content();
    const filePath = path.join(
      __dirname,
      "..",
      "dist",
      route.replace(/^\//, ""),
      "index.html"
    );
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
  }

  await browser.close();
  server.kill();
}

prerender().catch(console.error);
