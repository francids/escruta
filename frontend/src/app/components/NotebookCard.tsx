import type Notebook from "../interfaces/Notebook";
import { Button, Menu, Modal, TextField } from "./ui";
import { NotebookIcon, DotsVerticalIcon } from "./icons";
import { IconButton } from "./ui";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router";

export default function NotebookCard({ notebook }: { notebook: Notebook }) {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  const [newNotebookTitle, setNewNotebookTitle] = useState<string>(
    notebook.title
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    loading: renamingNotebook,
    error: renameError,
    refetch: renameNotebook,
  } = useFetch<Notebook>(
    "/notebooks",
    {
      method: "PUT",
      data: {
        id: notebook.id,
        title: newNotebookTitle,
      },
    },
    false
  );

  const {
    loading: deletingNotebook,
    error: deleteError,
    refetch: deleteNotebook,
  } = useFetch<Notebook>(
    "/notebooks",
    {
      method: "DELETE",
      data: {
        id: notebook.id,
      },
    },
    false
  );

  async function handleRenameNotebook() {
    try {
      await renameNotebook();
      notebook.title = newNotebookTitle;
      setIsRenameModalOpen(false);
    } catch (error) {
      console.error("Error renaming notebook:", error);
    }
  }

  async function handleDeleteNotebook() {
    try {
      await deleteNotebook();
      setIsDeleted(true);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting notebook:", error);
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date)
      .toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(".", "");
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (isDeleted) {
    return null;
  }

  return (
    <>
      <div
        className="h-40 w-full rounded-xs border p-4 cursor-pointer hover:shadow-sx transition-shadow flex flex-col justify-between bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
        onClick={() => {
          navigate(`/app/notebook/${notebook.id}`);
          window.scrollTo(0, 0);
        }}
        style={{ minWidth: "180px", maxWidth: "220px" }}
      >
        <div className="flex justify-between items-start">
          <NotebookIcon />
          <div onClick={handleMenuClick}>
            <Menu
              items={[
                {
                  label: "Rename",
                  onClick: () => setIsRenameModalOpen(true),
                },
                {
                  label: "Delete",
                  onClick: () => setIsDeleteModalOpen(true),
                  variant: "danger",
                },
              ]}
              trigger={
                <IconButton
                  icon={<DotsVerticalIcon />}
                  size="sm"
                  ariaLabel="More options"
                  variant="ghost"
                />
              }
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-1 line-clamp-2">
            {notebook.title}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(notebook.updatedAt)}
          </p>
        </div>
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
              disabled={!newNotebookTitle.trim() || renamingNotebook}
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
            value={newNotebookTitle}
            onChange={(e) => setNewNotebookTitle(e.target.value)}
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

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={`Delete notebook "${notebook.title}"`}
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
              onClick={handleDeleteNotebook}
              disabled={deletingNotebook}
            >
              {deletingNotebook ? "Deleting..." : "Delete"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this notebook? This action cannot be
            undone. All notes and data associated with this notebook will be
            permanently deleted.
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
