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
  "/docs": {
    title: "Documentation - Escruta",
    description:
      "Complete documentation for Escruta, the open-source AI-powered platform for researchers, students, and knowledge workers.",
    url: `${baseUrl}/docs`,
    image: `${baseUrl}/OpenGraphImageDocumentation.webp`,
    twitterCard: "summary_large_image",
  },
  "/docs/features/audio-summary": {
    title: "Audio Summary - Escruta Documentation",
    description:
      "Learn how to use Escruta's AI-powered audio summary feature to convert your research materials into spoken content.",
    url: `${baseUrl}/docs/features/audio-summary`,
    image: `${baseUrl}/OpenGraphImageDocumentation.webp`,
    twitterCard: "summary_large_image",
  },
  "/docs/features/flashcards": {
    title: "Flashcards - Escruta Documentation",
    description:
      "Create and study with AI-generated flashcards based on your research materials and notes in Escruta.",
    url: `${baseUrl}/docs/features/flashcards`,
    image: `${baseUrl}/OpenGraphImageDocumentation.webp`,
    twitterCard: "summary_large_image",
  },
  "/docs/features/mind-map": {
    title: "Mind Maps - Escruta Documentation",
    description:
      "Generate interactive mind maps from your research content to visualize connections and concepts in Escruta.",
    url: `${baseUrl}/docs/features/mind-map`,
    image: `${baseUrl}/OpenGraphImageDocumentation.webp`,
    twitterCard: "summary_large_image",
  },
  "/docs/features/notebooks": {
    title: "Notebooks - Escruta Documentation",
    description:
      "Organize your research into centralized notebooks. Learn how to manage projects and topics effectively in Escruta.",
    url: `${baseUrl}/docs/features/notebooks`,
    image: `${baseUrl}/OpenGraphImageDocumentation.webp`,
    twitterCard: "summary_large_image",
  },
  "/docs/features/notes": {
    title: "Notes - Escruta Documentation",
    description:
      "Take and organize notes within your research projects. Discover Escruta's intelligent note-taking capabilities.",
    url: `${baseUrl}/docs/features/notes`,
    image: `${baseUrl}/OpenGraphImageDocumentation.webp`,
    twitterCard: "summary_large_image",
  },
  "/docs/features/sources": {
    title: "Sources - Escruta Documentation",
    description:
      "Upload and manage documents, web links, and research materials. Learn about Escruta's source management system.",
    url: `${baseUrl}/docs/features/sources`,
    image: `${baseUrl}/OpenGraphImageDocumentation.webp`,
    twitterCard: "summary_large_image",
  },
  "/docs/features/study-guide": {
    title: "Study Guides - Escruta Documentation",
    description:
      "Generate comprehensive study guides from your research materials using Escruta's AI-powered study tools.",
    url: `${baseUrl}/docs/features/study-guide`,
    image: `${baseUrl}/OpenGraphImageDocumentation.webp`,
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
