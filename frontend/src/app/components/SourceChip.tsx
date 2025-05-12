import type Source from "../interfaces/Source";
import { LinkIcon, DotsVerticalIcon } from "./icons";
import { IconButton } from "./ui";

export default function SourceChip({
  source,
  className,
}: {
  source: Source;
  className?: string;
}) {
  return (
    <li className={`flex items-center gap-2 ${className}`}>
      <a href={source.link} target="_blank" rel="noopener noreferrer">
        <IconButton
          icon={<LinkIcon />}
          variant="secondary"
          size="xs"
          className="flex-shrink-0"
          tabIndex={-1}
        />
      </a>
      <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
        {source.title}
      </span>
      <IconButton
        icon={<DotsVerticalIcon />}
        variant="ghost"
        size="xs"
        className="flex-shrink-0 ml-auto"
        ariaLabel="More options"
        onClick={() => {
          console.log("More options clicked for source:", source.title);
        }}
      />
    </li>
  );
}
