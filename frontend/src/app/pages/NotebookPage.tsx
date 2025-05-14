import { useLoaderData } from "react-router";
import useFetch from "../../hooks/useFetch";
import type NotebookContent from "../interfaces/NotebookContent";
import { EditIcon } from "../components/icons";
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

export default function NotebookPage() {
  const notebookId: string = useLoaderData();
  const {
    data: notebook,
    loading,
    error,
  } = useFetch<NotebookContent>(`/notebooks/${notebookId}`);

  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");

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
      <section className="grid grid-cols-3 grid-rows-1 gap-4 lg:grid-cols-4 h-full max-h-full overflow-hidden">
        <Tab
          className="col-span-1 col-start-1"
          items={[
            {
              id: "1",
              label: "Sources",
              content: <SourcesCard />,
            },
            {
              id: "2",
              label: "Notes",
              content: <NotesCard />,
            },
          ]}
          defaultActiveTab="1"
        />

        {/* Chat */}
        <Card className="col-span-3 col-start-2">
          <h2 className="text-lg font-sans font-normal">Chat</h2>
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
