import {
  MindMapIcon,
  WaveIcon,
  StudyIcon,
  CardIcon,
  QuestionnaireIcon,
  FileIcon,
} from "@/shared/icons";
import { Card, Divider } from "@/shared/ui";
import ToolCard from "./ToolCard";

interface Tool {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ToolsCard() {
  const tools: Tool[] = [
    {
      icon: <WaveIcon />,
      title: "Audio Summary",
      description:
        "Generate an audio summary of your notes for hands-free review.",
    },
    {
      icon: <MindMapIcon />,
      title: "Mind Map",
      description:
        "Create a visual mind map to explore connections between concepts.",
    },
    {
      icon: <StudyIcon />,
      title: "Study Guide",
      description:
        "Generate a comprehensive study guide with key points and questions.",
    },
    {
      icon: <CardIcon />,
      title: "Flashcards",
      description:
        "Create flashcards from your notes for effective spaced repetition learning.",
    },
    {
      icon: <QuestionnaireIcon />,
      title: "Questionnaire",
      description:
        "Generate a questionnaire to test your understanding of the material.",
    },
    {
      icon: <FileIcon />,
      title: "Sources Report",
      description:
        "Generate a consolidated report listing all sources from the notebook.",
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
