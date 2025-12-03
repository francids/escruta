import type { Source } from "@/interfaces";
import { AddIcon } from "@/shared/icons";
import SourceChip from "./SourceChip";
import {
  Card,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Switch,
  Dropdown,
  FilePicker,
  Spinner,
} from "@/shared/ui";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks";
import type { SourceType } from "../utils";

interface SourcesCardProps {
  notebookId: string;
  onSourceSelect?: (source: Source) => void;
  refreshTrigger?: number;
  onSourceAdded?: () => void;
}

export default function SourcesCard({
  notebookId,
  onSourceSelect,
  refreshTrigger,
  onSourceAdded,
}: SourcesCardProps) {
  useEffect(() => {
    if (refreshTrigger !== undefined) {
      refetchSources(true);
    }
  }, [refreshTrigger]);

  const {
    data: sources,
    loading,
    error,
    refetch: refetchSources,
  } = useFetch<Source[]>(`notebooks/${notebookId}/sources`);

  const [isAddSourceModalOpen, setIsAddSourceModalOpen] =
    useState<boolean>(false);
  const [isAIConverterEnabled, setIsAIConverterEnabled] =
    useState<boolean>(false);
  const [sourceType, setSourceType] = useState<SourceType>("Website");
  const [newSourceLink, setNewSourceLink] = useState<string>("");
  const [newSourceFile, setNewSourceFile] = useState<File | null>(null);
  const [newSourceLinkError, setNewSourceLinkError] = useState<string>("");

  const { loading: addingSource, refetch: addSource } = useFetch<Source>(
    sourceType === "File"
      ? `notebooks/${notebookId}/sources/upload?aiConverter=${isAIConverterEnabled}`
      : `notebooks/${notebookId}/sources?aiConverter=${isAIConverterEnabled}`,
    {
      method: "POST",
      data:
        sourceType === "File"
          ? (() => {
              const formData = new FormData();
              if (newSourceFile) {
                formData.append("file", newSourceFile);
                formData.append("title", newSourceFile.name);
              }
              return formData;
            })()
          : {
              link: newSourceLink,
            },
      headers:
        sourceType === "File"
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      onSuccess: () => {
        setNewSourceLink("");
        setNewSourceFile(null);
        setSourceType("Website");
        setIsAddSourceModalOpen(false);
        refetchSources(true);
        onSourceAdded?.();
      },
      onError: (error) => {
        console.error("Error adding source:", error);
        const errorMessage =
          "response" in error ? error.response?.data : error.message;
        setNewSourceLinkError("Failed to add source. " + errorMessage);
      },
    },
    false
  );

  async function handleAddSource() {
    setNewSourceLinkError("");

    if (sourceType === "File") {
      if (!newSourceFile) {
        setNewSourceLinkError("Please select a file");
        return;
      }

      const maxFileSize = 50 * 1024 * 1024;
      if (newSourceFile.size > maxFileSize) {
        setNewSourceLinkError(
          "File size exceeds the 50MB limit. Please select a smaller file."
        );
        return;
      }
    } else {
      if (!newSourceLink.trim()) {
        setNewSourceLinkError("Please enter a valid URL");
        return;
      }

      if (sourceType === "Website" && !/^https?:\/\/.+/i.test(newSourceLink)) {
        setNewSourceLinkError(
          "Please enter a valid URL starting with https://"
        );
        return;
      }

      if (sourceType === "YouTube Video") {
        const youtubeRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/i;
        if (!youtubeRegex.test(newSourceLink)) {
          setNewSourceLinkError("Please enter a valid YouTube URL");
          return;
        }
      }
    }

    await addSource();
  }

  function handleModalClose() {
    if (!addingSource) {
      setIsAddSourceModalOpen(false);
      setNewSourceLink("");
      setNewSourceFile(null);
      setSourceType("Website");
      setNewSourceLinkError("");
    }
  }

  return (
    <>
      <Card className="h-full overflow-y-auto">
        <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0">
          <h2 className="text-lg font-sans font-semibold">Sources</h2>
          <div className="flex gap-3">
            {/* <Tooltip text="Find sources" position="bottom">
              <IconButton
                icon={<StarsIcon />}
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
              />
            </Tooltip> */}
            <Tooltip text="Add source" position="bottom">
              <IconButton
                icon={<AddIcon />}
                variant="primary"
                size="sm"
                className="flex-shrink-0"
                onClick={() => setIsAddSourceModalOpen(true)}
              />
            </Tooltip>
          </div>
        </div>
        <Divider className="my-4" />
        {(() => {
          if (loading) {
            return (
              <div className="text-center text-gray-500 text-sm">
                Loading sources...
              </div>
            );
          }
          if (error) {
            return (
              <div className="text-red-500 text-sm">
                Error loading sources: {error.message}
              </div>
            );
          }
          if (sources && sources.length > 0) {
            return (
              <div className="flex flex-col gap-2">
                {sources.map((source) => (
                  <SourceChip
                    key={source.id}
                    source={source}
                    onSourceSelect={onSourceSelect}
                  />
                ))}
              </div>
            );
          }
          return (
            <div className="text-gray-500 text-sm">
              No sources found. Click the button above to add a source.
            </div>
          );
        })()}
      </Card>

      {/* Add Source Modal */}
      {isAddSourceModalOpen && (
        <Modal
          isOpen={isAddSourceModalOpen}
          onClose={handleModalClose}
          title="Add source"
          closeOnOutsideClick={!addingSource}
          closeOnEscape={!addingSource}
          actions={
            <div className="flex justify-between w-full">
              {sourceType === "Website" || sourceType === "File" ? (
                <Tooltip
                  text="Enable AI to improve source readability."
                  position="bottom"
                  className="grid"
                >
                  <Switch
                    checked={isAIConverterEnabled}
                    onChange={setIsAIConverterEnabled}
                    label="AI converter"
                    disabled={addingSource}
                  />
                </Tooltip>
              ) : (
                <div className="flex-1"></div>
              )}
              <div className="flex gap-3">
                <Button variant="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddSource}
                  disabled={
                    (sourceType === "File"
                      ? !newSourceFile
                      : !newSourceLink.trim()) || addingSource
                  }
                  icon={addingSource ? <Spinner /> : <AddIcon />}
                >
                  {addingSource ? "Adding" : "Add"}
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <Dropdown
              label="Source type"
              // options={["Website", "YouTube Video", "File"]}
              options={["Website", "File"]}
              selectedOption={sourceType}
              onSelect={setSourceType}
            />

            {sourceType === "File" ? (
              <>
                <FilePicker
                  id="source-file"
                  label="Select file"
                  onChange={setNewSourceFile}
                  value={newSourceFile}
                  accept=".pdf,.docx,.txt,.md"
                  placeholder="PDF, DOCX, TXT, or Markdown files"
                />
                <div className="text-gray-500">Maximum file size: 50 MB</div>
              </>
            ) : (
              <TextField
                id="source-link"
                label="URL"
                type="url"
                value={newSourceLink}
                onChange={(e) => setNewSourceLink(e.target.value)}
                placeholder={
                  sourceType === "YouTube Video"
                    ? "https://www.youtube.com/watch?v=..."
                    : "https://example.com"
                }
                autoFocus
              />
            )}

            {newSourceLinkError && (
              <div className="text-red-500 text-sm">{newSourceLinkError}</div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
