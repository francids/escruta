import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import type Source from "../interfaces/Source";
import { CloseIcon, DeleteIcon, LinkIcon } from "./icons";
import { Button, Card, IconButton, Modal, Tooltip } from "./ui";

interface SourceViewerProps {
  notebookId: string;
  source: Source;
  handleCloseSource: () => void;
  onSourceDelete: () => void;
  className?: string;
}

export default function SourceViewer({
  notebookId,
  source,
  handleCloseSource,
  onSourceDelete,
  className,
}: SourceViewerProps) {
  const {
    data: fullSource,
    loading,
    error,
    refetch: refetchSource,
  } = useFetch<Source>(`notebooks/${notebookId}/sources/${source.id}`);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentSourceId, setCurrentSourceId] = useState<string>(source.id);

  useEffect(() => {
    if (source.id !== currentSourceId) {
      setCurrentSourceId(source.id);
    }
  }, [source.id, currentSourceId]);

  useEffect(() => {
    refetchSource(true);
  }, [source.id]);

  const {
    loading: deletingSource,
    error: deleteError,
    refetch: deleteSource,
  } = useFetch<Source>(
    `notebooks/${notebookId}/sources/${source.id}`,
    {
      method: "DELETE",
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        onSourceDelete();
        handleCloseSource();
      },
      onError: (error) => {
        console.error("Error deleting source:", error);
      },
    },
    false
  );

  return (
    <>
      <Card className={`${className} flex flex-col overflow-y-auto`}>
        <div className="flex justify-between items-center flex-shrink-0 mb-2">
          <h2 className="text-lg font-sans font-semibold truncate">
            {source.title}
          </h2>
          <div className="flex gap-2">
            <Tooltip text="Open source" position="bottom">
              <IconButton
                icon={<LinkIcon />}
                variant="ghost"
                size="sm"
                onClick={() => {
                  window.open(source.link, "_blank", "noopener noreferrer");
                }}
              />
            </Tooltip>
            <Tooltip text="Delete source" position="bottom">
              <IconButton
                icon={<DeleteIcon />}
                variant="ghost"
                size="sm"
                onClick={() => setIsDeleteModalOpen(true)}
              />
            </Tooltip>
            <Tooltip text="Close source" position="bottom">
              <IconButton
                icon={<CloseIcon />}
                variant="ghost"
                size="sm"
                onClick={handleCloseSource}
              />
            </Tooltip>
          </div>
        </div>
        {loading && (
          <div className="text-center text-gray-500 text-sm">
            Loading source...
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            Error loading source: {error.message}
          </div>
        )}
        {fullSource && !loading && !error && (
          <div className="flex-1">
            <div className="h-auto min-h-[80%] w-full pb-4 overflow-auto text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
              {fullSource.content}
            </div>
          </div>
        )}
      </Card>

      {/* Delete Source Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete source"
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
              disabled={deletingSource}
              onClick={async () => {
                await deleteSource();
              }}
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
