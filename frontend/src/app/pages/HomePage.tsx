import { useState } from "react";
import type { Notebook } from "@/interfaces";
import { useAuth, useCookie, useFetch } from "@/hooks";
import {
  Button,
  Dropdown,
  Modal,
  TextField,
  SegmentedButtons,
  Spinner,
} from "@/shared/ui";
import NotebookCard from "../components/NotebookCard";
import CommonBar from "../components/CommonBar";
import { AddIcon, GridIcon, ListIcon } from "@/shared/icons";
import { motion } from "motion/react";
import SEOMetadata from "@/shared/SEOMetadata";
import { getRouteMetadata } from "@/config/seo";

enum SortOptions {
  Newest = "Newest",
  Oldest = "Oldest",
  Alphabetical = "Alphabetical",
  ReverseAlphabetical = "Reverse Alphabetical",
}

type ViewMode = "grid" | "list";

export default function HomePage() {
  const { currentUser } = useAuth();
  const { data, loading, error, refetch } = useFetch<Notebook[]>("/notebooks");
  const [sortBy, setSortBy] = useCookie<SortOptions>(
    "notebookSortPreference",
    SortOptions.Newest
  );
  const [viewMode, setViewMode] = useCookie<ViewMode>(
    "notebookViewMode",
    "grid"
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
      onSuccess: async () => {
        await refetch(true);
        setNewNotebookTitle("");
        setIsCreateModalOpen(false);
      },
      onError: (error) => {
        console.error("Error creating notebook:", error);
      },
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

  const metadata = getRouteMetadata("/app");

  return (
    <div className="flex h-screen max-h-full w-full flex-col">
      <SEOMetadata
        title={metadata.title}
        description={metadata.description}
        url={metadata.url}
        image={metadata.image}
        twitterCard={metadata.twitterCard}
      />
      <motion.div
        className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-6 py-5 z-30"
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
        <div className="pointer-events-none blur-xl fixed w-full h-16 bg-gradient-to-b from-blue-50 dark:from-gray-950 to-transparent z-10"></div>

        <CommonBar className="justify-between items-center sticky top-0 z-20 mb-4 backdrop-blur-2xl bg-gray-50/60 dark:bg-gray-800/70">
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create notebook
          </Button>

          {data && data.length > 0 ? (
            <div className="flex items-center gap-4">
              <SegmentedButtons
                options={[
                  {
                    value: "grid" as const,
                    icon: <GridIcon />,
                    ariaLabel: "Grid view",
                  },
                  {
                    value: "list" as const,
                    icon: <ListIcon />,
                    ariaLabel: "List view",
                  },
                ]}
                value={viewMode || "grid"}
                onChange={setViewMode}
                size="sm"
              />

              <Dropdown<SortOptions>
                options={Object.values(SortOptions)}
                selectedOption={sortBy!}
                onSelect={(option) => setSortBy(option as SortOptions)}
                label="Sort by:"
              />
            </div>
          ) : (
            <span></span>
          )}
        </CommonBar>

        {data && data.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "flex flex-wrap gap-4 mb-8"
                : "flex flex-col gap-3 mb-8"
            }
          >
            {getSortedNotebooks().map((notebook) => (
              <NotebookCard
                key={notebook.id}
                notebook={notebook}
                viewMode={viewMode}
              />
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
                onClick={async () => await createNotebook()}
                disabled={!newNotebookTitle.trim() || creatingNotebook}
                icon={creatingNotebook ? <Spinner /> : <AddIcon />}
              >
                {creatingNotebook ? "Creating" : "Create"}
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
