import type { Source } from "@/interfaces";

export type SourceType = "Website" | "YouTube Video" | "File";

export function getSourceType(source: Source): SourceType {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/i;
  if (youtubeRegex.test(source.link)) {
    return "YouTube Video";
  }

  const fileExtensions = /\.(pdf|doc|docx|txt|md|csv|xlsx|ppt|pptx)$/i;
  if (!source.link.startsWith("http") || fileExtensions.test(source.link)) {
    return "File";
  }

  return "Website";
}

export function getYouTubeVideoId(url: string): string | null {
  const regexes = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/i,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/i,
  ];

  for (const regex of regexes) {
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function isYouTubeVideo(source: Source): boolean {
  return getSourceType(source) === "YouTube Video";
}

export function isFile(source: Source): boolean {
  return getSourceType(source) === "File";
}

export function isWebsite(source: Source): boolean {
  return getSourceType(source) === "Website";
}
