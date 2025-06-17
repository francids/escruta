import type Source from "../interfaces/Source";
import { LinkIcon } from "./icons";

export default function SourceChip({
  source,
  className,
}: {
  source: Source;
  className?: string;
}) {
  const handleCardClick = () => {
    if (source.link) {
      window.open(source.link, "_blank", "noopener noreferrer");
    }
  };

  return (
    <div
      className={`h-12 w-full rounded-xs border p-3 cursor-pointer hover:shadow-sx transition-shadow flex items-center gap-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 ${className}`}
      onClick={handleCardClick}
    >
      <div className="text-gray-600 dark:text-gray-300 flex-shrink-0 w-5 h-5">
        <LinkIcon />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
          {source.title}
        </h2>
      </div>
    </div>
  );
}
