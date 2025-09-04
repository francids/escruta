import { MindMapIcon, WaveIcon, StudyIcon } from "./icons";
import { Card, IconButton, Tooltip } from "./ui";

export default function ToolsCard() {
  return (
    <Card className="h-full flex flex-col gap-2">
      <h2 className="text-lg font-sans font-normal mb-2 text-center md:text-left">
        Tools
      </h2>
      <div className="flex flex-col gap-2">
        <Tooltip text="Audio Summary" position="left" disabled={true}>
          <IconButton
            icon={<WaveIcon />}
            ariaLabel="Audio Summary"
            variant="primary"
            size="lg"
            disabled={true}
          />
        </Tooltip>
        <Tooltip text="Mind Map" position="left">
          <IconButton
            icon={<MindMapIcon />}
            ariaLabel="Mind Map"
            variant="primary"
            size="lg"
          />
        </Tooltip>
        <Tooltip text="Study Guide" position="left">
          <IconButton
            icon={<StudyIcon />}
            ariaLabel="Study Guide"
            variant="primary"
            size="lg"
          />
        </Tooltip>
      </div>
    </Card>
  );
}
