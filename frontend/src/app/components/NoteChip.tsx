import { cn } from "@/lib/utils";
import type { Note } from "@/interfaces";

interface NoteChipProps {
  note: Note;
  className?: string;
  onSelect?: (note: Note) => void;
}

export default function NoteChip({ note, className, onSelect }: NoteChipProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xs border cursor-pointer",
        "transition-all duration-300 ease-out select-none",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
        "dark:focus:ring-offset-gray-900",
        "bg-white dark:bg-gray-800",
        "border-gray-200 dark:border-gray-600",
        "hover:bg-blue-50 dark:hover:bg-gray-700",
        "hover:border-blue-300 dark:hover:border-gray-500",
        "hover:scale-[101%]",
        className
      )}
      onClick={() => onSelect?.(note)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(note);
        }
      }}
      tabIndex={0}
      role="button"
    >
      <div className="relative p-3 h-full flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors duration-300">
            {note.title}
          </h2>
        </div>
      </div>
    </div>
  );
}
