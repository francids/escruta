import { useLoaderData } from "react-router";
import useFetch from "../../hooks/useFetch";
import type NotebookContent from "../interfaces/NotebookContent";
import { EditIcon, WaveIcon, MindMapIcon } from "../components/icons";
import {
  Tooltip,
  IconButton,
  Tab,
  TextField,
  Button,
  Modal,
} from "../components/ui";
import Card from "../components/ui/Card";
import CommonBar from "../components/CommonBar";
import SourcesCard from "../components/SourcesCard";
import NotesCard from "../components/NotesCard";
import { useEffect, useState } from "react";
import type Notebook from "../interfaces/Notebook";
import type Note from "../interfaces/Note";
import ChatCard from "../components/ChatCard";
import NoteEditor from "../components/NoteEditor";

export default function NotebookPage() {
  const notebookId: string = useLoaderData();
  const {
    data: notebook,
    loading,
    error,
  } = useFetch<NotebookContent>(`/notebooks/${notebookId}`);

  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    if (notebook?.title) {
      setNewTitle(notebook.title);
    }
  }, [notebook]);

  const {
    loading: renamingNotebook,
    error: renameError,
    refetch: renameNotebook,
  } = useFetch<Notebook>(
    "/notebooks",
    {
      method: "PUT",
      data: {
        id: notebookId,
        title: newTitle,
      },
    },
    false
  );

  if (error) {
    if ("status" in error && error.status === 404) {
      return (
        <CommonBar className="justify-between items-center gap-4 m-4">
          <h1 className="text-2xl font-sans font-normal truncate">
            Notebook not found
          </h1>
        </CommonBar>
      );
    }

    return (
      <CommonBar className="justify-between items-center gap-4 m-4">
        Error fetching notebook: {error.message}
      </CommonBar>
    );
  }

  if (loading) {
    return <CommonBar className="m-4">Loading notebook...</CommonBar>;
  }

  async function handleRenameNotebook() {
    if (!newTitle.trim()) return;
    try {
      await renameNotebook();
      notebook!.title = newTitle;
      setIsRenameModalOpen(false);
    } catch (error) {
      console.error("Error renaming notebook:", error);
    }
  }

  function handleNoteSelect(note: Note) {
    setSelectedNote(note);
  }

  function handleCloseNote() {
    setSelectedNote(null);
  }

  return (
    <div className="flex h-screen w-full flex-col p-6">
      <CommonBar className="justify-between items-center gap-4">
        <h1 className="text-2xl font-sans font-normal truncate">
          Notebook: <span className="font-semibold">{notebook?.title}</span>
        </h1>
        <Tooltip text="Edit title" position="bottom">
          <IconButton
            icon={<EditIcon />}
            variant="ghost"
            size="md"
            className="flex-shrink-0"
            onClick={() => setIsRenameModalOpen(true)}
          />
        </Tooltip>
      </CommonBar>
      <section className="grid grid-cols-12 grid-rows-1 gap-4 h-full max-h-full overflow-hidden relative">
        <div className="col-span-5 relative">
          <Tab
            className="h-full"
            items={[
              {
                id: "1",
                label: "Sources",
                content: <SourcesCard notebookId={notebookId} />,
              },
              {
                id: "2",
                label: "Notes",
                content: selectedNote ? (
                  <NoteEditor
                    note={selectedNote}
                    handleCloseNote={handleCloseNote}
                  />
                ) : (
                  <NotesCard onNoteSelect={handleNoteSelect} />
                ),
              },
            ]}
            defaultActiveTab="1"
          />
        </div>

        {/* Chat */}
        <ChatCard />

        {/* Tools */}
        <Card className="col-span-1 h-full flex flex-col gap-2">
          <h2 className="text-lg font-sans font-normal mb-2">Tools</h2>
          <Tooltip text="Audio Summary" position="left">
            <IconButton icon={<WaveIcon />} size="lg" />
          </Tooltip>
          <Tooltip text="Mind Map" position="left">
            <IconButton icon={<MindMapIcon />} size="lg" className="mt-2" />
          </Tooltip>
        </Card>
      </section>

      {/* Rename Modal */}
      <Modal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        title="Rename notebook"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsRenameModalOpen(false)}
              disabled={renamingNotebook}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleRenameNotebook}
              disabled={!newTitle.trim() || renamingNotebook}
            >
              {renamingNotebook ? "Renaming..." : "Rename"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <TextField
            id="notebook-title"
            label="Notebook Title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new notebook title"
            autoFocus
          />
          {renameError && (
            <div className="text-red-500 text-sm">
              Error: {renameError.message}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
