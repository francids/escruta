import type Note from "../interfaces/Note";
import { NotebookIcon, DotsVerticalIcon } from "./icons";
import { IconButton } from "./ui";

export default function NoteChip({
  note,
  className,
}: {
  note: Note;
  className?: string;
}) {
  return (
    <li className={`flex items-center gap-2 ${className}`}>
      <IconButton
        icon={<NotebookIcon />}
        variant="secondary"
        size="xs"
        className="flex-shrink-0"
        tabIndex={-1}
      />
      <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
        {note.title}
      </span>
      <IconButton
        icon={<DotsVerticalIcon />}
        variant="ghost"
        size="xs"
        className="flex-shrink-0 ml-auto"
        ariaLabel="More options"
        onClick={() => {
          console.log("More options clicked for note:", note.title);
        }}
      />
    </li>
  );
}
