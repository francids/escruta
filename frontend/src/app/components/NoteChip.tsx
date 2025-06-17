import type Note from "../interfaces/Note";

interface NoteChipProps {
  note: Note;
  className?: string;
  onSelect?: (note: Note) => void;
}

export default function NoteChip({ note, className, onSelect }: NoteChipProps) {
  return (
    <div
      className={`h-12 w-full rounded-xs border p-3 cursor-pointer hover:shadow-sx transition-shadow flex items-center gap-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 ${className}`}
      onClick={() => onSelect?.(note)}
    >
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
          {note.title}
        </h2>
      </div>
    </div>
  );
}
