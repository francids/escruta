import type Note from "../interfaces/Note";
import { CloseIcon } from "./icons";
import { Card, IconButton } from "./ui";

interface NoteEditorProps {
  note: Note;
  handleCloseNote: () => void;
}

export default function NoteEditor({ note, handleCloseNote }: NoteEditorProps) {
  return (
    <Card className="h-full relative z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-sans font-semibold truncate">
          {note.title}
        </h2>
        <IconButton
          icon={<CloseIcon />}
          variant="ghost"
          size="sm"
          onClick={handleCloseNote}
        />
      </div>
      <div className="h-full overflow-y-auto">
        <p className="text-gray-700 dark:text-gray-300">{note.content}</p>
      </div>
    </Card>
  );
}
