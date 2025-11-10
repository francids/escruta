const baseUrl = "https://escruta.francids.com";

export interface RouteMetadata {
  title: string;
  description: string;
  url: string;
  image: string;
  keywords?: string;
  type?: string;
  twitterCard?: string;
}

export const routeMetadata: Record<string, RouteMetadata> = {
  "/": {
    title: "Escruta - Think, ask, learn",
    description:
      "Organize, analyze, and learn from your own knowledge. Ask questions, take notes, and get insights—all in a open-source platform.",
    url: baseUrl,
    image: `${baseUrl}/OpenGraphImage.webp`,
    keywords:
      "knowledge management, AI research, note taking, open source, study tools, academic research, knowledge base, documentation, learning platform",
    twitterCard: "summary_large_image",
  },
  "/home": {
    title: "Escruta - Think, ask, learn",
    description:
      "Organize, analyze, and learn from your own knowledge. Ask questions, take notes, and get insights—all in a open-source platform.",
    url: `${baseUrl}/home`,
    image: `${baseUrl}/OpenGraphImage.webp`,
    keywords:
      "knowledge management, AI research, note taking, open source, study tools, academic research, knowledge base, documentation, learning platform",
    twitterCard: "summary_large_image",
  },
  "/app": {
    title: "Dashboard - Escruta",
    description:
      "Access your notebooks, sources, and AI-powered research tools in Escruta.",
    url: `${baseUrl}/app`,
    image: `${baseUrl}/OpenGraphImage.webp`,
    twitterCard: "summary_large_image",
  },
};

export function getRouteMetadata(path: string): RouteMetadata {
  return routeMetadata[path] || routeMetadata["/"];
}

export function generateNotebookMetadata(
  notebookTitle: string,
  notebookId: string
): RouteMetadata {
  return {
    title: `${notebookTitle} - Escruta`,
    description: `Explore and manage your research in the ${notebookTitle} notebook. Take notes, upload sources, and get AI-powered insights.`,
    url: `${baseUrl}/app/notebook/${notebookId}`,
    image: `${baseUrl}/OpenGraphImage.webp`,
    twitterCard: "summary_large_image",
  };
}
