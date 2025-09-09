import { useState } from "react";
import type { Notebook } from "@/interfaces";
import { useAuth, useCookie, useFetch } from "@/hooks";
import { Button, Dropdown, Modal, TextField } from "../components/ui";
import NotebookCard from "../components/NotebookCard";
import CommonBar from "../components/CommonBar";
import { motion } from "motion/react";

enum SortOptions {
  Newest = "Newest",
  Oldest = "Oldest",
  Alphabetical = "Alphabetical",
  ReverseAlphabetical = "Reverse Alphabetical",
}

export default function HomePage() {
  const { currentUser } = useAuth();
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
    <div className="flex h-screen max-h-full w-full flex-col">
      <motion.div
        className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-6 py-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center gap-4">
          <h1 className="flex flex-col items-start gap-1.5 min-w-0">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Dashboard
            </span>
            <span className="text-2xl font-bold truncate w-full text-gray-900 dark:text-white select-text flex flex-row gap-2 items-center justify-center">
              Welcome, {currentUser?.fullName || "User"}!
            </span>
          </h1>
        </div>
      </motion.div>

      <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-950 overflow-auto">
        <CommonBar className="justify-between items-center sticky top-0 z-10 mb-4 backdrop-blur-2xl bg-gray-50/60 dark:bg-gray-800/70">
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
          <div className="flex flex-wrap gap-4 mb-8">
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
    </div>
  );
}
