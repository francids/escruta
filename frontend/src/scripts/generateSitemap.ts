import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const baseUrl = "https://escruta.francids.com";

const routes = [
  {
    url: "/home",
    priority: 1.0,
    changefreq: "weekly",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    url: "/docs",
    priority: 0.9,
    changefreq: "weekly",
    lastmod: new Date().toISOString().split("T")[0],
  },
];

function generateSitemap(): string {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return sitemapContent;
}

function createSitemap() {
  const sitemap = generateSitemap();
  const outputPath = path.join(__dirname, "..", "..", "dist", "sitemap.xml");

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, sitemap, "utf-8");

  console.log("Sitemap generated successfully at:", outputPath);
}

export { generateSitemap, createSitemap };

if (import.meta.url === `file://${process.argv[1]}`) {
  createSitemap();
}
