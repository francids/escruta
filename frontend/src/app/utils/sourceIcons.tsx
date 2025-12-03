import { LinkIcon, FileIcon, YouTubeIcon } from "@/shared/icons";
import type { SourceType } from "./sourceUtils";
import type { Source } from "@/interfaces";
import { getSourceType } from "./sourceUtils";

export function getSourceTypeIcon(sourceType: SourceType) {
  switch (sourceType) {
    case "File":
      return <FileIcon />;
    case "YouTube Video":
      return <YouTubeIcon />;
    case "Website":
    default:
      return <LinkIcon />;
  }
}

export function getSourceIcon(source: Source) {
  const sourceType = getSourceType(source);
  return getSourceTypeIcon(sourceType);
}
