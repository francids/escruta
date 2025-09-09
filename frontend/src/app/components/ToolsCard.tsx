import { MindMapIcon, WaveIcon, StudyIcon, CardIcon } from "./icons";
import { Card, Divider } from "./ui";
import ToolCard from "./ToolCard";

export default function ToolsCard() {
  const tools = [
    {
      icon: <WaveIcon />,
      title: "Audio Summary",
      description:
        "Generate an audio summary of your notes for hands-free review",
    },
    {
      icon: <MindMapIcon />,
      title: "Mind Map",
      description:
        "Create a visual mind map to explore connections between concepts",
    },
    {
      icon: <StudyIcon />,
      title: "Study Guide",
      description:
        "Generate a comprehensive study guide with key points and questions",
    },
    {
      icon: <CardIcon />,
      title: "Flashcards",
      description:
        "Create flashcards from your notes for effective spaced repetition learning",
    },
  ];

  return (
    <Card className="h-full overflow-y-auto">
      <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0">
        <h2 className="text-lg font-sans font-semibold">Tools</h2>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 gap-4">
        {tools.map((tool) => (
          <ToolCard
            key={tool.title}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            onClick={() => {
              console.log(`${tool.title} clicked`);
            }}
          />
        ))}
      </div>
    </Card>
  );
}
