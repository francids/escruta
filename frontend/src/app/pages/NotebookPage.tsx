import { useEffect, useState, useRef } from "react";
import { useLoaderData } from "react-router";
import { useFetch, useCookie } from "@/hooks";
import type { Note, Source, Notebook, NotebookContent } from "@/interfaces";
import { EditIcon, NotebookIcon, FireIcon } from "@/shared/icons";
import {
  Tooltip,
  IconButton,
  Tab,
  type TabsRef,
  TextField,
  Button,
  Modal,
  Spinner,
} from "@/shared/ui";
import { motion, AnimatePresence } from "motion/react";
import SourcesCard from "../components/SourcesCard";
import NotesCard from "../components/NotesCard";
import ChatCard from "../components/ChatCard";
import NoteEditor from "../components/NoteEditor";
import SourceViewer from "../components/SourceViewer";
import ToolsCard from "../components/ToolsCard";
import SEOMetadata from "@/shared/SEOMetadata";
import { generateNotebookMetadata } from "@/config/seo";
import { cn } from "@/lib/utils";

export default function NotebookPage() {
  const notebookId: string = useLoaderData();
  const {
    data: notebook,
    loading,
    error,
    refetch: refetchNotebook,
  } = useFetch<NotebookContent>(`/notebooks/${notebookId}`, {
    onError: (err) => {
      console.error("Error fetching notebook:", err);
    },
  });

  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [notesRefreshKey, setNotesRefreshKey] = useState<number>(0);
  const [sourcesRefreshKey, setSourcesRefreshKey] = useState<number>(0);
  const [leftPanelWidth, setLeftPanelWidth] = useCookie<number>(
    "notebookLeftPanelWidth",
    33
  );
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const tabsRef = useRef<TabsRef>(null);

  const handleSourceSelectFromChat = (sourceId: string) => {
    const tempSource: Source = {
      id: sourceId,
      notebookId: notebookId,
      title: "",
      isConvertedByAi: false,
      link: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSelectedSource(tempSource);
    tabsRef.current?.setActiveTab("1");
  };

  useEffect(() => {
    if (notebook?.title) {
      setNewTitle(notebook.title);
    }
  }, [notebook]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const containerWidth = window.innerWidth - 46;
      const newWidth = Math.min(
        Math.max(((e.clientX - 16) / containerWidth) * 100, 30),
        64
      );
      setLeftPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.classList.remove("resizing");
    };

    if (isResizing) {
      document.body.classList.add("resizing");
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("resizing");
    };
  }, [isResizing, setLeftPanelWidth]);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleDoubleClick = () => {
    setLeftPanelWidth(50);
  };

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

  if (error) {
    if ("status" in error && error.status === 404) {
      return (
        <div className="flex justify-center h-screen w-full flex-col">
          <div className="border-y border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-6 py-5">
            <motion.div
              className="flex justify-center items-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xs flex items-center justify-center mb-4 mx-auto">
                  <div className="w-8 h-8 text-gray-400 dark:text-gray-600">
                    <NotebookIcon />
                  </div>
                </div>
                <h1 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notebook not found
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The notebook you're looking for doesn't exist or has been
                  deleted.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    if ("status" in error && error.status === 401) {
      return (
        <div className="flex justify-center h-screen w-full flex-col">
          <div className="border-y border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-6 py-5">
            <motion.div
              className="flex justify-center items-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-950 rounded-xs flex items-center justify-center mb-4 mx-auto">
                  <div className="w-8 h-8 text-yellow-500">
                    <NotebookIcon />
                  </div>
                </div>
                <h1 className="text-xl font-medium text-yellow-600 dark:text-yellow-400 mb-2">
                  Access denied
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  You do not have permission to access this notebook.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-center h-screen w-full flex-col">
        <div className="border-y border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-6 py-5">
          <motion.div
            className="flex justify-center items-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-950 rounded-xs flex items-center justify-center mb-4 mx-auto">
                <div className="w-8 h-8 text-red-500">
                  <FireIcon />
                </div>
              </div>
              <h1 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
                Error loading notebook
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {error.message}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center h-screen w-full flex-col">
        <div className="border-y border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-6 py-5">
          <div className="flex justify-center items-center py-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Loading notebook...
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const metadata = notebook
    ? generateNotebookMetadata(notebook.title, notebookId)
    : null;

  return (
    <div className="flex h-screen max-h-full w-full flex-col">
      {metadata && (
        <SEOMetadata
          title={metadata.title}
          description={metadata.description}
          url={metadata.url}
          image={metadata.image}
          twitterCard={metadata.twitterCard}
        />
      )}
      <motion.div
        className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-6 py-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center gap-4">
          <h1 className="flex flex-col items-start gap-1.5 min-w-0">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Notebook
            </span>
            <span className="text-2xl font-bold truncate w-full text-gray-900 dark:text-white select-text">
              {notebook?.title}
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Tooltip text="Edit title" position="left">
              <IconButton
                icon={<EditIcon />}
                variant="ghost"
                size="md"
                className="flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setIsRenameModalOpen(true)}
              />
            </Tooltip>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <section className="flex h-full overflow-hidden gap-1">
          <motion.div
            className={cn("min-h-0 flex flex-col overflow-hidden", {
              "transition-all duration-200 ease-out": !isResizing,
            })}
            style={{ width: `${leftPanelWidth ?? 33}%` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <Tab
              ref={tabsRef}
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
                          onSourceAdded={function () {
                            if (
                              notebook?.sources !== undefined &&
                              notebook!.sources.length === 0
                            ) {
                              refetchNotebook(true);
                              setSourcesRefreshKey((prev) => prev + 1);
                            }
                          }}
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
                {
                  id: "3",
                  label: "Tools",
                  content: <ToolsCard />,
                },
              ]}
              defaultActiveTab="1"
            />
          </motion.div>

          {/* Resizer */}
          <motion.div
            className="w-2 cursor-col-resize flex items-center justify-center group"
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div
              className={cn("w-1 h-8 rounded-xs transition-all duration-150", {
                "bg-blue-500 dark:bg-blue-400": isResizing,
                "bg-gray-300/60 dark:bg-gray-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-500":
                  !isResizing,
              })}
            />
          </motion.div>

          <motion.div
            className={cn("min-h-0 flex flex-col overflow-hidden", {
              "transition-all duration-200 ease-out": !isResizing,
            })}
            style={{ width: `${100 - (leftPanelWidth ?? 33)}%` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ChatCard
              notebookId={notebookId}
              sourcesCount={notebook?.sources.length ?? 0}
              refreshTrigger={sourcesRefreshKey}
              onSourceSelect={handleSourceSelectFromChat}
            />
          </motion.div>
        </section>
      </div>

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
              icon={renamingNotebook ? <Spinner /> : <EditIcon />}
            >
              {renamingNotebook ? "Renaming" : "Rename"}
            </Button>
          </>
        }
      >
        <div className="space-y-6">
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
            <div className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-950 px-3 py-2 rounded-xs border border-red-200 dark:border-red-800">
              Error: {renameError.message}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
