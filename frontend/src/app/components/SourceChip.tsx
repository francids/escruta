import { useState } from "react";
import type Source from "../interfaces/Source";
import { LinkIcon } from "./icons";
import { Button, Modal } from "./ui";
import useFetch from "../../hooks/useFetch";

interface SourceChipProps {
  notebookId: string;
  source: Source;
  className?: string;
  onSourceDeleted?: () => void;
}

export default function SourceChip({
  notebookId,
  source,
  className,
  onSourceDeleted,
}: SourceChipProps) {
  const {
    data: fullSource,
    loading,
    error,
    refetch: fetchFullSource,
  } = useFetch<Source>(
    `notebooks/${notebookId}/sources/${source.id}`,
    {
      method: "GET",
      onError: (error) => {
        console.error("Error fetching full source:", error);
      },
    },
    false
  );

  const {
    loading: deletingSource,
    error: deleteError,
    refetch: deleteSource,
  } = useFetch<Source>(
    `notebooks/${notebookId}/sources/${source.id}`,
    {
      method: "DELETE",
      onSuccess: () => {
        setIsModalOpen(false);
        setIsDeleteLoading(false);
        onSourceDeleted?.();
      },
      onError: (error) => {
        console.error("Error deleting source:", error);
      },
    },
    false
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleChipClick = () => {
    setIsModalOpen(true);
    fetchFullSource();
  };

  return (
    <>
      <div
        className={`h-12 w-full rounded-xs border p-3 cursor-pointer hover:shadow-sx transition-shadow flex items-center gap-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 ${className}`}
        onClick={handleChipClick}
      >
        <div className="text-gray-600 dark:text-gray-300 flex-shrink-0 w-5 h-5">
          <LinkIcon />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
            {source.title}
          </h2>
        </div>
      </div>

      {/* Source Info Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={source.title}
        width="lg"
        actions={
          <div className="w-full flex justify-between gap-3">
            <Button
              variant="danger"
              onClick={() => setIsDeleteLoading(true)}
              disabled={deletingSource}
            >
              {deletingSource ? "Deleting..." : "Delete"}
            </Button>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  window.open(source.link, "_blank", "noopener noreferrer");
                }}
                icon={<LinkIcon />}
              >
                Open source
              </Button>
            </div>
          </div>
        }
      >
        {loading ? (
          <div className="text-center text-gray-500 text-sm">
            Loading sources...
          </div>
        ) : null}
        {error ? (
          <div className="text-red-500 text-sm">
            Error loading source: {error.message}
          </div>
        ) : null}
        {fullSource && !loading && !error && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 select-text">
              {fullSource.content}
            </p>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteLoading}
        onClose={() => setIsDeleteLoading(false)}
        title="Delete source"
        width="sm"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteLoading(false)}
              disabled={deletingSource}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setIsDeleteLoading(true);
                deleteSource().finally(() => {
                  setIsDeleteLoading(false);
                });
              }}
              disabled={deletingSource}
            >
              {deletingSource ? "Deleting..." : "Delete"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this source? This action cannot be
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
