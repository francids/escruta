import type Source from "../interfaces/Source";
import Card from "./ui/Card";
import { AddIcon } from "./icons";
import SourceChip from "./SourceChip";
import { Divider, IconButton, Tooltip } from "./ui";

export default function SourcesCard() {
  const notebookId = "123";
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

  return (
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
      <Divider className="my-4" />
      <div className="grid grid-cols-2 gap-2">
        {demoSources?.map((source) => (
          <SourceChip key={source.id} source={source} />
        ))}
      </div>
    </Card>
  );
}
