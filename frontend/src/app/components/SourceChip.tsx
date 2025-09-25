import { twMerge } from "tailwind-merge";
import type { Source } from "@/interfaces";
import { getSourceIcon } from "../utils";

interface SourceChipProps {
  source: Source;
  className?: string;
  onSourceSelect?: (source: Source) => void;
}

export default function SourceChip({
  source,
  className,
  onSourceSelect,
}: SourceChipProps) {
  const baseClasses = `
    group relative overflow-hidden rounded-xs border cursor-pointer 
    transition-all duration-300 ease-out select-none
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 
    dark:focus:ring-offset-gray-900
    bg-white dark:bg-gray-800
    border-gray-200 dark:border-gray-600
    hover:bg-blue-50 dark:hover:bg-gray-700
    hover:border-blue-300 dark:hover:border-gray-500
    hover:scale-[101%]
  `;

  const handleChipClick = () => {
    onSourceSelect?.(source);
  };

  return (
    <div
      className={twMerge(baseClasses, className)}
      onClick={handleChipClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleChipClick();
        }
      }}
      tabIndex={0}
      role="button"
    >
      <div className="relative p-3 h-full flex items-center gap-3">
        <div className="p-2 rounded-xs transition-all duration-300 bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-800 flex-shrink-0">
          <div className="w-4 h-4 transition-all duration-300 transform group-hover:scale-110 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {getSourceIcon(source)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors duration-300">
            {source.title}
          </h2>
        </div>
      </div>
    </div>
  );
}
