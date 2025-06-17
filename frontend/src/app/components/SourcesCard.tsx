import type Source from "../interfaces/Source";
import { AddIcon, StarsIcon } from "./icons";
import SourceChip from "./SourceChip";
import {
  Card,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  Tooltip,
} from "./ui";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

interface SourcesCardProps {
  notebookId: string;
  onSourceSelect?: (source: Source) => void;
}

export default function SourcesCard({
  notebookId,
  onSourceSelect,
}: SourcesCardProps) {
  const {
    data: sources,
    loading,
    error,
    refetch: refetchSources,
  } = useFetch<Source[]>(`notebooks/${notebookId}/sources`);

  const [isAddSourceModalOpen, setIsAddSourceModalOpen] =
    useState<boolean>(false);
  const [newSourceLink, setNewSourceLink] = useState<string>("");
  const [newSourceLinkError, setNewSourceLinkError] = useState<string>("");

  const {
    loading: addingSource,
    error: addingSourceError,
    refetch: addSource,
  } = useFetch<Source>(
    `notebooks/${notebookId}/sources`,
    {
      method: "POST",
      data: {
        link: newSourceLink,
      },
      onSuccess: () => {
        setNewSourceLink("");
        setIsAddSourceModalOpen(false);
        refetchSources(true);
      },
      onError: (error) => {
        console.error("Error adding source:", error);
      },
    },
    false
  );

  async function handleAddSource() {
    setNewSourceLinkError("");
    if (!newSourceLink.trim()) return;
    if (!/^https?:\/\/.+/i.test(newSourceLink)) {
      setNewSourceLinkError("Please enter a valid URL starting with https://");
      return;
    }
    await addSource();
  }

  return (
    <>
      <Card className="h-full overflow-y-auto">
        <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0">
          <h2 className="text-lg font-sans font-normal">Sources</h2>
          <div className="flex gap-3">
            <Tooltip text="Find sources" position="bottom">
              <IconButton
                icon={<StarsIcon />}
                variant="secondary"
                size="sm"
                className="flex-shrink-0"
              />
            </Tooltip>
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
              <div className="grid grid-cols-2 gap-2">
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
      <Modal
        isOpen={isAddSourceModalOpen}
        onClose={() => setIsAddSourceModalOpen(false)}
        title="Add source"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsAddSourceModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddSource}
              disabled={!newSourceLink.trim() || addingSource}
            >
              {addingSource ? "Adding..." : "Add"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <TextField
            id="source-link"
            label="Source Link"
            type="url"
            value={newSourceLink}
            onChange={(e) => setNewSourceLink(e.target.value)}
            placeholder="https://example.com"
            autoFocus
          />
          {newSourceLinkError && (
            <div className="text-red-500 text-sm">{newSourceLinkError}</div>
          )}
          {addingSourceError && (
            <div className="text-red-500 text-sm">
              Error: {addingSourceError.message}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
