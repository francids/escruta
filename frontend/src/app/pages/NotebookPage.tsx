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
import { motion, AnimatePresence } from "motion/react";
import Card from "../components/ui/Card";
import CommonBar from "../components/CommonBar";
import SourcesCard from "../components/SourcesCard";
import NotesCard from "../components/NotesCard";
import { useEffect, useState } from "react";
import type Notebook from "../interfaces/Notebook";
import type Note from "../interfaces/Note";
import type Source from "../interfaces/Source";
import ChatCard from "../components/ChatCard";
import NoteEditor from "../components/NoteEditor";
import SourceViewer from "../components/SourceViewer";

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
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [notesRefreshKey, setNotesRefreshKey] = useState<number>(0);
  const [sourcesRefreshKey, setSourcesRefreshKey] = useState<number>(0);

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
                content: (
                  <div className="relative h-full w-full">
                    <AnimatePresence>
                      {selectedSource ? (
                        <motion.div
                          key={selectedSource.id}
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -20 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            duration: 0.3,
                          }}
                          className="absolute inset-0 z-10 h-[96%] self-end"
                        >
                          <SourceViewer
                            notebookId={notebookId}
                            source={selectedSource}
                            handleCloseSource={() => setSelectedSource(null)}
                            onSourceDelete={() => {
                              setSelectedSource(null);
                              setSourcesRefreshKey((prev) => prev + 1);
                            }}
                            className="h-full"
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    <motion.div
                      animate={{
                        opacity: selectedSource ? 0.5 : 1,
                        scale: selectedSource ? 0.98 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <SourcesCard
                        notebookId={notebookId}
                        onSourceSelect={(source: Source) =>
                          setSelectedSource(source)
                        }
                        refreshTrigger={sourcesRefreshKey}
                      />
                    </motion.div>
                  </div>
                ),
              },
              {
                id: "2",
                label: "Notes",
                content: (
                  <div className="relative h-full w-full">
                    <AnimatePresence>
                      {selectedNote ? (
                        <motion.div
                          key={selectedNote.id}
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -20 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            duration: 0.3,
                          }}
                          className="absolute inset-0 z-10 h-[96%] self-end"
                        >
                          <NoteEditor
                            notebookId={notebookId}
                            note={selectedNote}
                            className="h-full"
                            handleCloseNote={() => setSelectedNote(null)}
                            onNoteDeleted={() => {
                              setSelectedNote(null);
                              setNotesRefreshKey((prev) => prev + 1);
                            }}
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    <motion.div
                      animate={{
                        opacity: selectedNote ? 0.5 : 1,
                        scale: selectedNote ? 0.98 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <NotesCard
                        notebookId={notebookId}
                        onNoteSelect={(note: Note) => setSelectedNote(note)}
                        refreshTrigger={notesRefreshKey}
                      />
                    </motion.div>
                  </div>
                ),
              },
            ]}
            defaultActiveTab="1"
          />
        </div>

        {/* Chat */}
        <ChatCard notebookId={notebookId} refreshTrigger={sourcesRefreshKey} />

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
