import { useLoaderData } from "react-router";
import useFetch from "../../hooks/useFetch";
import type NotebookContent from "../interfaces/NotebookContent";
import { EditIcon } from "../components/icons";
import { Tooltip, IconButton, Tab } from "../components/ui";
import Card from "../components/ui/Card";
import CommonBar from "../components/CommonBar";
import SourcesCard from "../components/SourcesCard";
import NotesCard from "../components/NotesCard";

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
    <div className="flex h-screen w-full flex-col p-6">
      <CommonBar className="justify-between items-center gap-4">
        <h1 className="text-2xl font-sans font-normal truncate">
          Notebook: <span className="font-semibold">{notebook?.title}</span>
        </h1>
        <Tooltip text="Edit title" position="bottom">
          <IconButton
            icon={<EditIcon />}
            variant="ghost"
            size="md"
            className="flex-shrink-0"
          />
        </Tooltip>
      </CommonBar>
      <section className="grid grid-cols-3 grid-rows-1 gap-4 lg:grid-cols-4 h-full max-h-full overflow-hidden">
        <Tab
          className="col-span-1 col-start-1"
          items={[
            {
              id: "1",
              label: "Sources",
              content: <SourcesCard />,
            },
            {
              id: "2",
              label: "Notes",
              content: <NotesCard />,
            },
          ]}
          defaultActiveTab="1"
        />

        {/* Chat */}
        <Card className="col-span-3 col-start-2">
          <h2 className="text-lg font-sans font-normal">Chat</h2>
        </Card>
      </section>
    </div>
  );
}
