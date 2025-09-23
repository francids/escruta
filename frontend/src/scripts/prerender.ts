import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const baseUrl = "https://escruta.francids.com";

type RouteConfig = {
  title: string;
  description: string;
  url: string;
  image: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
};

const routesDict: Record<string, RouteConfig> = {
  "/home": {
    title: "Escruta - Think, ask, learn",
    description:
      "Organize, analyze, and learn from your own knowledge. Ask questions, take notes, and get insights—all in a open-source platform.",
    url: `${baseUrl}/home`,
    image: `${baseUrl}/OpenGraphImage.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Escruta - Think, ask, learn",
    twitterDescription:
      "Organize, analyze, and learn from your own knowledge. Ask questions, take notes, and get insights—all in a open-source platform.",
    twitterImage: `${baseUrl}/OpenGraphImage.png`,
  },
  "/docs": {
    title: "Documentation - Escruta",
    description:
      "Complete documentation for Escruta, the open-source AI-powered platform for researchers, students, and knowledge workers.",
    url: `${baseUrl}/docs`,
    image: `${baseUrl}/OpenGraphImageDocumentation.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Documentation - Escruta",
    twitterDescription:
      "Complete documentation for Escruta, the open-source AI-powered platform for researchers, students, and knowledge workers.",
    twitterImage: `${baseUrl}/OpenGraphImageDocumentation.png`,
  },
  "/docs/features/audio-summary": {
    title: "Audio Summary - Escruta Documentation",
    description:
      "Learn how to use Escruta's AI-powered audio summary feature to convert your research materials into spoken content.",
    url: `${baseUrl}/docs/features/audio-summary`,
    image: `${baseUrl}/OpenGraphImageDocumentation.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Audio Summary - Escruta Documentation",
    twitterDescription:
      "Learn how to use Escruta's AI-powered audio summary feature to convert your research materials into spoken content.",
    twitterImage: `${baseUrl}/OpenGraphImageDocumentation.png`,
  },
  "/docs/features/flashcards": {
    title: "Flashcards - Escruta Documentation",
    description:
      "Create and study with AI-generated flashcards based on your research materials and notes in Escruta.",
    url: `${baseUrl}/docs/features/flashcards`,
    image: `${baseUrl}/OpenGraphImageDocumentation.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Flashcards - Escruta Documentation",
    twitterDescription:
      "Create and study with AI-generated flashcards based on your research materials and notes in Escruta.",
    twitterImage: `${baseUrl}/OpenGraphImageDocumentation.png`,
  },
  "/docs/features/mind-map": {
    title: "Mind Maps - Escruta Documentation",
    description:
      "Generate interactive mind maps from your research content to visualize connections and concepts in Escruta.",
    url: `${baseUrl}/docs/features/mind-map`,
    image: `${baseUrl}/OpenGraphImageDocumentation.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Mind Maps - Escruta Documentation",
    twitterDescription:
      "Generate interactive mind maps from your research content to visualize connections and concepts in Escruta.",
    twitterImage: `${baseUrl}/OpenGraphImageDocumentation.png`,
  },
  "/docs/features/notebooks": {
    title: "Notebooks - Escruta Documentation",
    description:
      "Organize your research into centralized notebooks. Learn how to manage projects and topics effectively in Escruta.",
    url: `${baseUrl}/docs/features/notebooks`,
    image: `${baseUrl}/OpenGraphImageDocumentation.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Notebooks - Escruta Documentation",
    twitterDescription:
      "Organize your research into centralized notebooks. Learn how to manage projects and topics effectively in Escruta.",
    twitterImage: `${baseUrl}/OpenGraphImageDocumentation.png`,
  },
  "/docs/features/notes": {
    title: "Notes - Escruta Documentation",
    description:
      "Take and organize notes within your research projects. Discover Escruta's intelligent note-taking capabilities.",
    url: `${baseUrl}/docs/features/notes`,
    image: `${baseUrl}/OpenGraphImageDocumentation.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Notes - Escruta Documentation",
    twitterDescription:
      "Take and organize notes within your research projects. Discover Escruta's intelligent note-taking capabilities.",
    twitterImage: `${baseUrl}/OpenGraphImageDocumentation.png`,
  },
  "/docs/features/sources": {
    title: "Sources - Escruta Documentation",
    description:
      "Upload and manage documents, web links, and research materials. Learn about Escruta's source management system.",
    url: `${baseUrl}/docs/features/sources`,
    image: `${baseUrl}/OpenGraphImageDocumentation.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Sources - Escruta Documentation",
    twitterDescription:
      "Upload and manage documents, web links, and research materials. Learn about Escruta's source management system.",
    twitterImage: `${baseUrl}/OpenGraphImageDocumentation.png`,
  },
  "/docs/features/study-guide": {
    title: "Study Guides - Escruta Documentation",
    description:
      "Generate comprehensive study guides from your research materials using Escruta's AI-powered study tools.",
    url: `${baseUrl}/docs/features/study-guide`,
    image: `${baseUrl}/OpenGraphImageDocumentation.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Study Guides - Escruta Documentation",
    twitterDescription:
      "Generate comprehensive study guides from your research materials using Escruta's AI-powered study tools.",
    twitterImage: `${baseUrl}/OpenGraphImageDocumentation.png`,
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
    `<meta name="twitter:title" content="${config.twitterTitle}" />`
  );

  content = content.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${config.twitterDescription}" />`
  );

  content = content.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${config.twitterImage}" />`
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
  await browser.close();
  server.kill();
  process.exit(0);
}

prerender().catch(console.error);
