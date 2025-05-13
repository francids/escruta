import CommonBar from "../components/CommonBar";
import { useLoaderData } from "react-router";
import useFetch from "../../hooks/useFetch";
import type NotebookContent from "../interfaces/NotebookContent";
import { AddIcon, EditIcon } from "../components/icons";
import { Tooltip, IconButton, Tab } from "../components/ui";
import Card from "../components/Card";
import type Source from "../interfaces/Source";
import SourceChip from "../components/SourceChip";
import type Note from "../interfaces/Note";
import NoteChip from "../components/NoteChip";

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

  const demoSources: Source[] = [
    {
      id: "1",
      title: "Source 1",
      link: "https://example.com/source1",
      notebookId: notebookId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Source 2 Source 2 Source 2 Source 2 Source 2 Source 2 Source 2",
      link: "https://example.com/source2",
      notebookId: notebookId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      title: "Source 3",
      link: "https://example.com/source3",
      notebookId: notebookId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const demoNotes: Note[] = [
    {
      id: "1",
      title: "Note 1",
      content: "This is the content of note 1.",
      notebookId: notebookId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Note 2",
      content: "This is the content of note 2.",
      notebookId: notebookId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div className="flex h-screen w-full flex-col p-4">
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
              content: (
                <Card className="h-full overflow-y-auto">
                  <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0">
                    <h2 className="text-lg font-sans font-normal">Sources</h2>
                    <Tooltip text="Add source" position="bottom">
                      <IconButton
                        icon={<AddIcon />}
                        variant="primary"
                        size="sm"
                        className="flex-shrink-0"
                      />
                    </Tooltip>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {demoSources?.map((source) => (
                      <SourceChip key={source.id} source={source} />
                    ))}
                  </ul>
                </Card>
              ),
            },
            {
              id: "2",
              label: "Notes",
              content: (
                <Card className="h-full overflow-y-auto">
                  <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0 h-8">
                    <h2 className="text-lg font-sans font-normal">Notes</h2>
                    <Tooltip text="Add note" position="bottom">
                      <IconButton
                        icon={<AddIcon />}
                        variant="primary"
                        size="sm"
                        className="flex-shrink-0"
                      />
                    </Tooltip>
                  </div>
                  <ul className="list-disc list-inside flex flex-col gap-2">
                    {demoNotes?.map((note) => (
                      <NoteChip key={note.id} note={note} />
                    ))}
                  </ul>
                </Card>
              ),
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
