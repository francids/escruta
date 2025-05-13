import type Note from "../interfaces/Note";
import Card from "./ui/Card";
import { AddIcon } from "./icons";
import NoteChip from "./NoteChip";
import { IconButton, Tooltip } from "./ui";

export default function NotesCard() {
  const notebookId = "123";
  const demoNotes: Note[] = [
    {
      id: "1",
      title: "Note 1",
      content: "This is the content of note 1.",
      notebookId: notebookId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Note 2",
      content: "This is the content of note 2.",
      notebookId: notebookId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <Card className="h-full overflow-y-auto">
      <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0 h-8">
        <h2 className="text-lg font-sans font-normal">Notes</h2>
        <Tooltip text="Add note" position="bottom">
          <IconButton
            icon={<AddIcon />}
            variant="primary"
            size="sm"
            className="flex-shrink-0"
          />
        </Tooltip>
      </div>
      <ul className="list-disc list-inside flex flex-col gap-2">
        {demoNotes?.map((note) => (
          <NoteChip key={note.id} note={note} />
        ))}
      </ul>
    </Card>
  );
}
