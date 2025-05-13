import NotebookCard from "../components/NotebookCard";
import type Notebook from "../interfaces/Notebook";
import useFetch from "../../hooks/useFetch";
import useCookie from "../../hooks/useCookie";
import Logo from "../../shared/Logo";
import { Button, Dropdown, Modal, TextField } from "../components/ui";
import { useState } from "react";
import CommonBar from "../components/CommonBar";

enum SortOptions {
  Newest = "Newest",
  Oldest = "Oldest",
  Alphabetical = "Alphabetical",
  ReverseAlphabetical = "Reverse Alphabetical",
}

export default function HomePage() {
  const { data, loading, error, refetch } = useFetch<Notebook[]>("/notebooks");
  const [sortBy, setSortBy] = useCookie<SortOptions>(
    "notebookSortPreference",
    SortOptions.Newest
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newNotebookTitle, setNewNotebookTitle] = useState("");

  const {
    loading: creatingNotebook,
    error: createError,
    refetch: createNotebook,
  } = useFetch<Notebook>(
    "/notebooks",
    {
      method: "POST",
      data: { title: newNotebookTitle },
    },
    false
  );

  if (loading) {
    return <div className="m-4">Loading...</div>;
  }

  if (error) {
    return <div className="m-4">Error fetching notebooks: {error.message}</div>;
  }

  function getSortedNotebooks() {
    if (!data) return [];

    const sortedData = [...data];
    switch (sortBy) {
      case SortOptions.Newest:
        return sortedData.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case SortOptions.Oldest:
        return sortedData.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case SortOptions.Alphabetical:
        return sortedData.sort((a, b) => a.title.localeCompare(b.title));
      case SortOptions.ReverseAlphabetical:
        return sortedData.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sortedData;
    }
  }

  const handleCreateNotebook = async () => {
    try {
      await createNotebook();
      await refetch(true);
      setNewNotebookTitle("");
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating notebook:", error);
    }
  };

  return (
    <div className="p-6">
      <CommonBar className="justify-between items-center">
        <h1 className="text-3xl font-sans font-normal flex flex-row gap-2 items-center">
          <span className="leading-none mb-1">Welcome to </span>
          <Logo className="h-4.5 w-auto" />
        </h1>
      </CommonBar>
      <CommonBar className="justify-between items-center">
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create notebook
        </Button>
        {data && data.length > 0 ? (
          <Dropdown<SortOptions>
            options={Object.values(SortOptions)}
            selectedOption={sortBy!}
            onSelect={(option) => setSortBy(option as SortOptions)}
            label="Sort by:"
          />
        ) : (
          <span></span>
        )}
      </CommonBar>

      {data && data.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {getSortedNotebooks().map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}
        </div>
      ) : (
        <CommonBar className="text-center text-gray-500">
          No notebooks available. Create one to get started!
        </CommonBar>
      )}

      {/* Create Notebook Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create new notebook"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
              disabled={creatingNotebook}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateNotebook}
              disabled={!newNotebookTitle.trim() || creatingNotebook}
            >
              {creatingNotebook ? "Creating..." : "Create"}
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
            placeholder="Enter notebook title"
            autoFocus
          />
          {createError && (
            <div className="text-red-500 text-sm">
              Error: {createError.message}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
