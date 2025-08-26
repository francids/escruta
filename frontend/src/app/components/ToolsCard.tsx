import { MindMapIcon, WaveIcon } from "./icons";
import { Card, IconButton, Tooltip } from "./ui";

export default function ToolsCard() {
  return (
    <Card className="col-span-1 h-full flex flex-col gap-2">
      <h2 className="text-lg font-sans font-normal mb-2">Tools</h2>
      <Tooltip text="Audio Summary" position="left">
        <IconButton icon={<WaveIcon />} size="lg" />
      </Tooltip>
      <Tooltip text="Mind Map" position="left">
        <IconButton icon={<MindMapIcon />} size="lg" className="mt-2" />
      </Tooltip>
    </Card>
  );
}
