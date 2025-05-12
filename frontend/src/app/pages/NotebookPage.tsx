import CommonBar from "../components/CommonBar";
import { useLoaderData } from "react-router";
import useFetch from "../../hooks/useFetch";
import type NotebookContent from "../interfaces/NotebookContent";
import { EditIcon } from "../components/icons";
import { Tooltip, IconButton } from "../components/ui";

export default function NotebookPage() {
  const notebookId: string = useLoaderData();
  const {
    data: notebook,
    loading,
    error,
  } = useFetch<NotebookContent>(`/notebooks/${notebookId}`);

  if (error) {
    if ("status" in error && error.status === 404) {
      return (
        <CommonBar className="justify-between items-center gap-4 m-4">
          <h1 className="text-2xl font-sans font-normal truncate">
            Notebook not found
          </h1>
        </CommonBar>
      );
    }

    return (
      <CommonBar className="justify-between items-center gap-4 m-4">
        Error fetching notebook: {error.message}
      </CommonBar>
    );
  }

  if (loading) {
    return <CommonBar className="m-4">Loading notebook...</CommonBar>;
  }

  return (
    <div className="p-6 md:p-8">
      <CommonBar className="justify-between items-center gap-4">
        <h1 className="text-2xl font-sans font-normal truncate">
          Notebook: <span className="font-semibold">{notebook?.title}</span>
        </h1>
        <Tooltip text="Edit title" position="bottom">
          <IconButton
            icon={<EditIcon />}
            variant="secondary"
            size="md"
            className="flex-shrink-0"
          />
        </Tooltip>
      </CommonBar>
    </div>
  );
}
