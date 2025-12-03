import type { Note } from "@/interfaces";
import { AddIcon } from "@/shared/icons";
import NoteChip from "./NoteChip";
import {
  Card,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Spinner,
} from "@/shared/ui";
import { useFetch } from "@/hooks";
import { useState, useEffect } from "react";

interface NotesCardProps {
  notebookId: string;
  onNoteSelect?: (note: Note) => void;
  refreshTrigger?: number;
}

export default function NotesCard({
  notebookId,
  onNoteSelect,
  refreshTrigger,
}: NotesCardProps) {
  const {
    data: notes,
    loading,
    error,
    refetch: refetchNotes,
  } = useFetch<Note[]>(`notebooks/${notebookId}/notes`);

  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState<boolean>(false);
  const [newNoteTitle, setNewNoteTitle] = useState<string>("");

  useEffect(() => {
    if (refreshTrigger !== undefined) {
      refetchNotes(true);
    }
  }, [refreshTrigger]);

  const {
    loading: addingNote,
    error: addingNoteError,
    refetch: addNote,
  } = useFetch<Note>(
    `notebooks/${notebookId}/notes`,
    {
      method: "POST",
      data: {
        title: newNoteTitle,
      },
      onSuccess: () => {
        setNewNoteTitle("");
        setIsAddNoteModalOpen(false);
        refetchNotes(true);
      },
      onError: (error) => {
        console.error("Error adding note:", error);
      },
    },
    false
  );

  return (
    <>
      <Card className="h-full overflow-y-auto">
        <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0 h-8">
          <h2 className="text-lg font-sans font-semibold">Notes</h2>
          <Tooltip text="Add note" position="bottom">
            <IconButton
              icon={<AddIcon />}
              variant="primary"
              size="sm"
              className="flex-shrink-0"
              onClick={() => setIsAddNoteModalOpen(true)}
            />
          </Tooltip>
        </div>
        <Divider className="my-4" />
        {(() => {
          if (loading) {
            return (
              <div className="text-center text-gray-500 text-sm">
                Loading notes...
              </div>
            );
          }
          if (error) {
            return (
              <div className="text-red-500 text-sm">
                Error loading notes: {error.message}
              </div>
            );
          }
          if (notes && notes.length > 0) {
            return (
              <div className="flex flex-col gap-2">
                {notes
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((note) => (
                    <NoteChip
                      key={note.id}
                      note={note}
                      onSelect={onNoteSelect}
                    />
                  ))}
              </div>
            );
          }
          return (
            <div className="text-gray-500 text-sm">
              No notes found. Click the button above to add a note.
            </div>
          );
        })()}
      </Card>

      {/* Add Note Modal */}
      <Modal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        title="Add note"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsAddNoteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                await addNote();
              }}
              disabled={!newNoteTitle.trim() || addingNote}
              icon={addingNote ? <Spinner /> : <AddIcon />}
            >
              {addingNote ? "Adding" : "Add"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <TextField
            id="note-title"
            label="Note Title"
            type="text"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            placeholder="Enter new note title"
            autoFocus
          />
          {addingNoteError && (
            <div className="text-red-500 text-sm">
              Error: {addingNoteError.message}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
