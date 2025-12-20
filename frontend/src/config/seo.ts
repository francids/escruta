const baseUrl = "https://app.escruta.com";

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
  return routeMetadata[path] || routeMetadata["/app"];
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
