import { useFetch } from "@/hooks";
import { FireIcon, RestartIcon, SendIcon } from "./icons";
import {
  Card,
  Divider,
  TextField,
  IconButton,
  Tooltip,
  Button,
  Spinner,
} from "./ui";
import CodeBlock from "./CodeBlock";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  citedSources?: CitedSource[];
}

interface CitedSource {
  id: string;
  title: string;
}

interface ChatApiResponse {
  content: string;
  citedSources: CitedSource[];
}

interface ChatCardProps {
  notebookId: string;
  refreshTrigger?: number;
  onSourceSelect?: (sourceId: string) => void;
}

function processMarkdownText(
  text: string,
  isUserMessage: boolean = false
): ReactNode {
  if (!text) return [];

  const isSystemMessage = [
    "I don't have any relevant sources",
    "The available sources don't contain",
    "I couldn't generate a response",
    "No sources are available",
    "The sources in this notebook",
    "Unable to generate",
    "An error occurred",
  ].some((phrase) => text.startsWith(phrase));

  if (isSystemMessage && !isUserMessage) {
    return [
      <div
        key="system-message"
        className="italic text-gray-600 dark:text-gray-400"
      >
        {text}
      </div>,
    ];
  }

  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const beforeCode = text.slice(lastIndex, match.index);
      if (beforeCode.trim()) {
        parts.push({ type: "text", content: beforeCode });
      }
    }

    parts.push({
      type: "code",
      language: match[1] || "",
      content: match[2],
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    if (remaining.trim()) {
      parts.push({ type: "text", content: remaining });
    }
  }

  if (parts.length === 0) {
    parts.push({ type: "text", content: text });
  }

  return parts.map((part, index) => {
    if (part.type === "code") {
      return (
        <CodeBlock
          key={index}
          className={part.language ? `language-${part.language}` : ""}
        >
          {part.content}
        </CodeBlock>
      );
    }

    return (
      <div key={index}>{processTextContent(part.content, isUserMessage)}</div>
    );
  });
}

function processTextContent(text: string, isUserMessage: boolean) {
  const linkColorClass = isUserMessage
    ? "text-blue-300 hover:text-blue-200"
    : "text-blue-500 hover:text-blue-400";

  const processed = text
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded-xs text-sm font-mono">$1</code>'
    )
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(https?:\/\/[^)]+\)/g,
      `<a href="$2" target="_blank" rel="noopener noreferrer" class="${linkColorClass} underline">$1</a>`
    );

  const paragraphs = processed.split(/\n\s*\n/).filter((p) => p.trim());

  return paragraphs.map((paragraph, idx) => {
    if (paragraph.match(/^\s*[-*]\s/m)) {
      const items = paragraph
        .split(/\n(?=\s*[-*]\s)/)
        .map((item) => item.replace(/^\s*[-*]\s/, "").trim())
        .filter((item) => item);

      return (
        <ul key={idx} className="list-disc pl-5 my-2 space-y-1">
          {items.map((item, itemIdx) => (
            <li key={itemIdx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    }

    if (paragraph.match(/^\s*\d+\.\s/m)) {
      const items = paragraph
        .split(/\n(?=\s*\d+\.\s)/)
        .map((item) => item.replace(/^\s*\d+\.\s/, "").trim())
        .filter((item) => item);

      return (
        <ol key={idx} className="list-decimal pl-5 my-2 space-y-1">
          {items.map((item, itemIdx) => (
            <li key={itemIdx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      );
    }

    return (
      <p
        key={idx}
        className="my-2"
        dangerouslySetInnerHTML={{ __html: paragraph.trim() }}
      />
    );
  });
}

export default function ChatCard({
  notebookId,
  refreshTrigger,
  onSourceSelect,
}: ChatCardProps) {
  const {
    data: notebookSummary,
    loading: isSummaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useFetch<string>(
    `notebooks/${notebookId}/summary`,
    {
      method: "GET",
      onError: (error) => {
        console.error("Error fetching summary:", error);
      },
    },
    false
  );

  const { loading: isRegenerating, refetch: regenerateSummary } =
    useFetch<string>(
      `notebooks/${notebookId}/summary`,
      {
        method: "POST",
        onSuccess: () => {
          refetchSummary(true);
        },
        onError: (error) => {
          console.error("Error refreshing summary:", error);
        },
      },
      false
    );

  useEffect(() => {
    refetchSummary(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSourceClick = (sourceId: string) => {
    if (
      !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(
        sourceId
      )
    ) {
      console.warn("Invalid source ID format:", sourceId);
      return;
    }
    onSourceSelect?.(sourceId);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userInput,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    try {
      await fetchChatResponse(true);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const { loading: isChatLoading, refetch: fetchChatResponse } =
    useFetch<ChatApiResponse>(
      `notebooks/${notebookId}/chat`,
      {
        method: "POST",
        data: {
          userInput: input.trim(),
        },
        onSuccess: (response) => {
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: response.content,
            sender: "ai",
            citedSources: response.citedSources,
          };
          setMessages((prevMessages) => [...prevMessages, aiResponse]);
        },
        onError: (error) => {
          console.error("Error fetching chat response:", error);
          const errorResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I encountered an error while processing your request. Please try again.",
            sender: "ai",
          };
          setMessages((prevMessages) => [...prevMessages, errorResponse]);
        },
      },
      false
    );

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0">
        <h2 className="text-lg font-sans font-semibold">Chat</h2>
        <div className="flex gap-3">
          {messages.length == 0 &&
          !isChatLoading &&
          !isSummaryLoading &&
          notebookSummary ? (
            <Tooltip
              text={
                isRegenerating
                  ? "Regenerating summary..."
                  : "Regenerate summary"
              }
              position="bottom"
            >
              <IconButton
                icon={isRegenerating ? <Spinner /> : <RestartIcon />}
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
                onClick={regenerateSummary}
                disabled={isRegenerating}
              />
            </Tooltip>
          ) : null}
        </div>
      </div>
      <Divider className="mb-0" />
      {messages.length > 0 ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex mb-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md flex flex-col gap-3 px-4 py-1 rounded-xs select-text shadow-sm transition-all duration-200 ${
                    msg.sender === "user"
                      ? "bg-blue-500 dark:bg-blue-600 text-white font-medium ml-12"
                      : "bg-gray-100/60 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium mr-12"
                  }`}
                >
                  {processMarkdownText(msg.text, msg.sender === "user")}
                  {msg.sender === "ai" &&
                    msg.citedSources &&
                    msg.citedSources.length > 0 && (
                      <div className="py-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex flex-wrap gap-2">
                          {msg.citedSources.map((source, index) => (
                            <button
                              key={source.id}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSourceClick(source.id);
                              }}
                              className="text-xs bg-gray-200/50 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-xs hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors cursor-pointer"
                              title={source.title}
                            >
                              {source.title || `Source ${index + 1}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isChatLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-start"
            >
              <Spinner />
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col flex-grow min-h-0 max-h-full overflow-y-auto"
        >
          <div className="text-muted-foreground w-full max-w-lg mx-auto my-auto py-8">
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Summary of the notebook
            </h3>
            {isSummaryLoading ? (
              <p className="mt-1 mb-1 text-base font-medium leading-6">
                Loading summary...
              </p>
            ) : summaryError ? (
              <p className="mt-1 mb-1 text-base font-medium leading-6">
                Error: {summaryError.message}
              </p>
            ) : notebookSummary ? (
              <div className="prose dark:prose-invert prose-sm max-w-none select-text">
                {processMarkdownText(notebookSummary, false)}
              </div>
            ) : (
              <Button
                onClick={regenerateSummary}
                icon={isRegenerating ? <Spinner /> : null}
                disabled={isRegenerating}
              >
                {isRegenerating ? "Generating summary..." : "Generate summary"}
              </Button>
            )}
          </div>
        </motion.div>
      )}
      <Divider className="mt-0" />
      <div className="py-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          {messages.length > 0 ? (
            <Tooltip text="Clear chat" position="top">
              <IconButton
                icon={<FireIcon />}
                ariaLabel="Clear chat"
                onClick={() => {
                  setMessages([]);
                  setInput("");
                }}
                disabled={messages.length === 0 && !isChatLoading}
                variant="ghost"
              />
            </Tooltip>
          ) : null}
          <TextField
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && !isChatLoading && input.trim()) {
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-grow"
            disabled={isChatLoading}
            autoFocus
          />
          <IconButton
            icon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={isChatLoading || !input.trim()}
            aria-label="Send message"
          />
        </div>
      </div>
    </Card>
  );
}
