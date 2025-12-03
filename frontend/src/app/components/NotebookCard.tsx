import type { Notebook } from "@/interfaces";
import { Button, Menu, Modal, IconButton, Spinner } from "@/shared/ui";
import { NotebookIcon, DotsVerticalIcon } from "@/shared/icons";
import { useState } from "react";
import { useFetch } from "@/hooks";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";

interface NotebookCardProps {
  notebook: Notebook;
  viewMode?: "grid" | "list";
}

export default function NotebookCard({
  notebook,
  viewMode = "grid",
}: NotebookCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const baseClasses =
    "rounded-xs border cursor-pointer bg-gray-50 hover:bg-blue-50/50 dark:bg-gray-800 dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-600 transition-all duration-200 ease-out";

  const gridClasses =
    "h-40 w-full p-4 flex flex-col justify-between hover:scale-[101.5%]";
  const listClasses =
    "h-20 w-full p-4 flex flex-row items-center justify-between hover:scale-[100.25%]";

  return (
    <>
      <div
        className={cn(baseClasses, {
          [gridClasses]: viewMode === "grid",
          [listClasses]: viewMode === "list",
          "min-w-44 max-w-52": viewMode === "grid",
        })}
        onClick={() => {
          navigate(`/app/notebook/${notebook.id}`);
          window.scrollTo(0, 0);
        }}
      >
        {viewMode === "grid" ? (
          <>
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-xs bg-blue-25 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300">
                <NotebookIcon className="w-5 h-5" />
              </div>
              <div onClick={handleMenuClick}>
                <Menu
                  items={[
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
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                {notebook.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(notebook.updatedAt)}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-2 rounded-xs bg-blue-25 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300">
                <div className="w-6 h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                  <NotebookIcon />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {notebook.title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(notebook.updatedAt)}
                </p>
              </div>
            </div>

            <div onClick={handleMenuClick}>
              <Menu
                items={[
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
          </>
        )}
      </div>

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
              icon={deletingNotebook ? <Spinner /> : undefined}
            >
              {deletingNotebook ? "Deleting" : "Delete"}
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
