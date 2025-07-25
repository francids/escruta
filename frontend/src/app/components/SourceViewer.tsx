import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import type Source from "../interfaces/Source";
import { CloseIcon, DeleteIcon, LinkIcon, CopyIcon } from "./icons";
import { Button, Card, IconButton, Modal, Tooltip, Divider, Toast } from "./ui";
import Markdown from "react-markdown";

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
  const [showCopyToast, setShowCopyToast] = useState(false);

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
      <Toast
        isVisible={showCopyToast}
        onClose={() => setShowCopyToast(false)}
        message="Source content copied to clipboard"
        type="success"
        position="bottom-right"
        duration={1500}
      />
      <Card className={`${className} flex flex-col overflow-y-auto p-0`}>
        <div className="sticky h-20 top-0 z-10 ">
          <div className="h-6 bg-gray-50 dark:bg-gray-800 w-full flex-shrink-0" />
          <div className="h-14 px-6 bg-gray-50 dark:bg-gray-800">
            <div className="h-12 px-2 gap-3 flex justify-between items-center flex-shrink-0">
              <h2 className="truncate">{source.title || "Source viewer"}</h2>
              <div className="flex gap-2">
                <Tooltip text="Copy source content" position="bottom">
                  <IconButton
                    icon={<CopyIcon />}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(fullSource?.content || "");
                      setShowCopyToast(true);
                    }}
                  />
                </Tooltip>
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
            <Divider />
          </div>
        </div>
        {loading && (
          <div className="text-center text-gray-500 text-sm px-6">
            Loading source...
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm px-6">
            Error loading source: {error.message}
          </div>
        )}
        {fullSource && !loading && !error && (
          <div className="flex-1">
            <div className="h-auto min-h-[80%] w-full px-6 py-8 overflow-auto text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words select-text">
              <div className="prose dark:prose-invert max-w-none text-base">
                <Markdown>{fullSource.content}</Markdown>
              </div>
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
