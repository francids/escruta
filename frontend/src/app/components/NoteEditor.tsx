import { lazy } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useFetch } from "@/hooks";
import type { Note } from "@/interfaces";
import {
  CheckIcon,
  CloseIcon,
  CompressIcon,
  DeleteIcon,
  EditIcon,
  ExpandIcon,
  SaveIcon,
} from "@/shared/icons";
import {
  Button,
  Card,
  IconButton,
  Modal,
  Spinner,
  TextField,
  Tooltip,
} from "@/shared/ui";
const Editor = lazy(() => import("./Editor"));

interface NoteEditorProps {
  notebookId: string;
  note: Note;
  handleCloseNote: () => void;
  onNoteDeleted: () => void;
  className?: string;
}

export default function NoteEditor({
  notebookId,
  note,
  handleCloseNote,
  className,
  onNoteDeleted,
}: NoteEditorProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {
    data: fullNote,
    loading,
    error,
    refetch: refetchNote,
  } = useFetch<Note>(`notebooks/${notebookId}/notes/${note.id}`);

  const [isEditTitleModalOpen, setIsEditTitleModalOpen] =
    useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [currentNoteId, setCurrentNoteId] = useState<string>(note.id);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (note.id !== currentNoteId) {
      setContent("");
      setOriginalContent("");
      setCurrentNoteId(note.id);
    }
  }, [note.id, currentNoteId]);

  useEffect(() => {
    refetchNote(true);
  }, [note.id]);

  useEffect(() => {
    if (fullNote?.content !== undefined) {
      const noteContent = fullNote.content || "";
      setContent(noteContent);
      setOriginalContent(noteContent);
    }
  }, [fullNote?.content]);

  const {
    loading: updatingNote,
    error: updateError,
    refetch: updateNote,
  } = useFetch<Note>(
    `notebooks/${notebookId}/notes`,
    {
      method: "PUT",
      data: {
        id: note.id,
        title: newTitle,
        content: fullNote?.content || null,
      },
      onSuccess: () => {
        setIsEditTitleModalOpen(false);
        note.title = newTitle;
        setNewTitle(note.title);
      },
      onError: (error) => {
        console.error("Error updating note:", error);
      },
    },
    false
  );

  const { refetch: saveNoteContent } = useFetch<Note>(
    `notebooks/${notebookId}/notes`,
    {
      method: "PUT",
      data: {
        id: note.id,
        content: content,
      },
      onSuccess: () => {
        setIsSaving(false);
        setOriginalContent(content);
        refetchNote();
      },
      onError: (error) => {
        console.error("Error saving note content:", error);
        setIsSaving(false);
      },
    },
    false
  );

  const {
    loading: deletingNote,
    error: deleteError,
    refetch: deleteNote,
  } = useFetch<Note>(
    `notebooks/${notebookId}/notes/${note.id}`,
    {
      method: "DELETE",
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        onNoteDeleted();
        handleCloseNote();
      },
      onError: (error) => {
        console.error("Error deleting note:", error);
      },
    },
    false
  );

  return (
    <>
      <Card
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        className={cn(
          "flex flex-col overflow-y-auto dark:bg-gray-800",
          className
        )}
      >
        <div className="flex justify-between items-center flex-shrink-0 mb-2">
          <h2 className="text-lg font-sans font-semibold truncate">
            {note.title}
          </h2>
          <div className="flex gap-2">
            <Tooltip text="Save note" position="bottom">
              <IconButton
                icon={<SaveIcon />}
                variant="ghost"
                size="sm"
                disabled={
                  isSaving ||
                  updatingNote ||
                  loading ||
                  fullNote === undefined ||
                  content === originalContent
                }
                onClick={async () => {
                  setIsSaving(true);
                  await saveNoteContent();
                }}
              />
            </Tooltip>
            <Tooltip text="Edit title" position="bottom">
              <IconButton
                icon={<EditIcon />}
                variant="ghost"
                size="sm"
                disabled={updatingNote || isSaving || loading}
                onClick={() => setIsEditTitleModalOpen(true)}
              />
            </Tooltip>
            <Tooltip text="Delete note" position="bottom">
              <IconButton
                icon={<DeleteIcon />}
                variant="ghost"
                size="sm"
                onClick={() => setIsDeleteModalOpen(true)}
              />
            </Tooltip>
            <Tooltip
              text={isExpanded ? "Restore size" : "Expand"}
              position="bottom"
            >
              <IconButton
                icon={isExpanded ? <CompressIcon /> : <ExpandIcon />}
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded((s) => !s)}
              />
            </Tooltip>
            <Tooltip text="Close note" position="bottom">
              <IconButton
                icon={<CloseIcon />}
                variant="ghost"
                size="sm"
                onClick={handleCloseNote}
              />
            </Tooltip>
          </div>
        </div>
        {loading && (
          <div className="text-center text-gray-500 text-sm">
            Loading note...
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            Error loading note: {error.message}
          </div>
        )}
        {fullNote && !loading && !error && (
          <div className="flex-1">
            <Editor
              initialContent={fullNote.content || ""}
              onContentChange={setContent}
              placeholder="Write your note content here..."
              autoFocus
            />
          </div>
        )}
      </Card>

      {/* Edit Title Modal */}
      <Modal
        isOpen={isEditTitleModalOpen}
        onClose={() => setIsEditTitleModalOpen(false)}
        title="Edit note title"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsEditTitleModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                await updateNote();
              }}
              disabled={!newTitle.trim() || updatingNote}
              icon={updatingNote ? <Spinner /> : <CheckIcon />}
            >
              {updatingNote ? "Updating" : "Update"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <TextField
            id="note-title"
            label="Note Title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new note title"
            autoFocus
          />
          {updateError && (
            <div className="text-red-500 text-sm">
              Error: {updateError.message}
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Note Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete note"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={deletingNote}
              onClick={async () => {
                await deleteNote();
              }}
              icon={deletingNote ? <Spinner /> : <DeleteIcon />}
            >
              {deletingNote ? "Deleting" : "Delete"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this note? This action cannot be
            undone.
          </p>
          {deleteError && (
            <div className="text-red-500 text-sm">
              Error: {deleteError.message}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
