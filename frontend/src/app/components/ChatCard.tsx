import { lazy } from "react";
import { useFetch } from "@/hooks";
import { FireIcon, RestartIcon, SendIcon } from "@/shared/icons";
import {
  Card,
  Divider,
  TextField,
  IconButton,
  Tooltip,
  Button,
  Spinner,
  Chip,
} from "@/shared/ui";
const CodeBlock = lazy(() => import("./CodeBlock"));
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type Sender = "user" | "ai";

interface Message {
  id: string;
  text: string;
  sender: Sender;
  citedSources?: CitedSource[];
  error?: true;
}

interface CitedSource {
  id: string;
  title: string;
}

interface ChatResponse {
  content: string;
  conversationId: string | null;
  citedSources: CitedSource[];
}

interface ChatCardProps {
  notebookId: string;
  sourcesCount: number;
  refreshTrigger?: number;
  onSourceSelect?: (sourceId: string) => void;
}

function processMessage(message: Message): ReactNode {
  if (message.error) {
    return [
      <div
        key="system-message"
        className="italic text-gray-600 dark:text-gray-400 my-2"
      >
        {message.text}
      </div>,
    ];
  }

  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(message.text)) !== null) {
    if (match.index > lastIndex) {
      const beforeCode = message.text.slice(lastIndex, match.index);
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

  if (lastIndex < message.text.length) {
    const remaining = message.text.slice(lastIndex);
    if (remaining.trim()) {
      parts.push({ type: "text", content: remaining });
    }
  }

  if (parts.length === 0) {
    parts.push({ type: "text", content: message.text });
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
      <div key={index}>{processTextContent(part.content, message.sender)}</div>
    );
  });
}

function processTextContent(text: string, sender: Sender) {
  const linkColorClass = {
    user: "text-blue-300 hover:text-blue-200",
    ai: "text-blue-500 hover:text-blue-400",
  }[sender];

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
  sourcesCount,
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

  const { loading: isSummaryRegenerating, refetch: regenerateSummary } =
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
  }, [refreshTrigger]);

  const {
    data: exampleQuestions,
    loading: isExampleQuestionsLoading,
    error: exampleQuestionsError,
    refetch: refetchExampleQuestions,
  } = useFetch<{
    questions: string[];
  }>(
    `notebooks/${notebookId}/example-questions`,
    {
      method: "GET",
      onError: (error) => {
        console.error("Error fetching example questions:", error);
      },
    },
    sourcesCount > 0
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [conversationId, setConversationId] = useState<string | null>(null);

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

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    await fetchChatResponse(true);
  };

  const { loading: isChatLoading, refetch: fetchChatResponse } =
    useFetch<ChatResponse>(
      `notebooks/${notebookId}/chat`,
      {
        method: "POST",
        data: {
          userInput: input.trim(),
          conversationId,
        },
        onSuccess: (response) => {
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: response.content,
            sender: "ai",
            citedSources: response.citedSources,
          };
          setMessages((prevMessages) => [...prevMessages, aiResponse]);
          setConversationId(response.conversationId);
        },
        onError: (error) => {
          console.error("Error sending message:", error);
          const errorResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I encountered an error while processing your request. Please try again.",
            sender: "ai",
            error: true,
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
                isSummaryRegenerating
                  ? "Regenerating summary"
                  : "Regenerate summary"
              }
              position="bottom"
            >
              <IconButton
                icon={isSummaryRegenerating ? <Spinner /> : <RestartIcon />}
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
                onClick={regenerateSummary}
                disabled={isSummaryRegenerating}
              />
            </Tooltip>
          ) : null}
        </div>
      </div>
      <Divider className="mb-0" />
      {messages.length > 0 ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn("flex mb-3", {
                  "justify-end": message.sender === "user",
                  "justify-start": message.sender === "ai",
                })}
              >
                <div
                  className={cn(
                    "max-w-xl flex flex-col gap-3 px-4 py-1 rounded-xs select-text shadow-sm transition-all duration-200",
                    {
                      "bg-blue-500 dark:bg-blue-600 text-white font-medium ml-12":
                        message.sender === "user",
                      "bg-gray-100/60 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium mr-12":
                        message.sender === "ai",
                    }
                  )}
                >
                  {processMessage(message)}
                  {message.sender === "ai" &&
                    message.citedSources &&
                    message.citedSources.length > 0 && (
                      <div className="py-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex flex-wrap gap-2">
                          {message.citedSources.map((source, index) => (
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
          {sourcesCount > 0 ? (
            <div className="text-muted-foreground w-full max-w-lg mx-auto my-auto py-8">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Summary of the notebook
              </h3>
              {isSummaryLoading ? (
                <p className="mt-1 mb-1 text-base font-medium leading-6">
                  <Spinner />
                </p>
              ) : summaryError ? (
                <p className="mt-1 mb-1 text-base font-medium leading-6">
                  Error: {summaryError.message}
                </p>
              ) : notebookSummary ? (
                <div className="prose dark:prose-invert prose-sm max-w-none select-text">
                  {processTextContent(notebookSummary, "ai")}
                </div>
              ) : (
                <Button
                  onClick={regenerateSummary}
                  icon={isSummaryRegenerating ? <Spinner /> : null}
                  disabled={isSummaryRegenerating}
                >
                  {isSummaryRegenerating
                    ? "Generating summary"
                    : "Generate summary"}
                </Button>
              )}

              {/* Example questions */}
              {messages.length === 0 && !isChatLoading && (
                <div className="mt-6">
                  {isExampleQuestionsLoading ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <Spinner />
                    </p>
                  ) : exampleQuestionsError ? (
                    <p className="text-sm text-red-500">
                      Error: {exampleQuestionsError.message}
                    </p>
                  ) : exampleQuestions &&
                    exampleQuestions.questions &&
                    exampleQuestions.questions.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-foreground">
                          Example questions
                        </h4>
                        <IconButton
                          icon={<RestartIcon />}
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            refetchExampleQuestions(true);
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        {exampleQuestions.questions.map((question, index) => (
                          <Chip
                            key={index}
                            onClick={() => {
                              setInput(question);
                            }}
                            multiline
                            className="w-full justify-start text-left"
                          >
                            {question}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground w-full max-w-lg mx-auto my-auto py-8">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                This notebook is empty
              </h3>
              <p className="mt-1 mb-1 text-base font-medium leading-6">
                Add some sources to start chatting with your documents.
              </p>
            </div>
          )}
        </motion.div>
      )}
      <Divider className="mt-0" />
      <div className="pb-4 flex-shrink-0">
        {/* Chat input */}
        <div className="flex items-center gap-2 pt-1">
          {messages.length > 0 ? (
            <Tooltip text="Clear chat" position="top">
              <IconButton
                icon={<FireIcon />}
                ariaLabel="Clear chat"
                onClick={() => {
                  setMessages([]);
                  setInput("");
                  setConversationId(null);
                }}
                disabled={messages.length === 0 && !isChatLoading}
                variant="ghost"
              />
            </Tooltip>
          ) : null}
          <TextField
            id="chat-input"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !isChatLoading &&
                input.trim()
              ) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask a question..."
            className="flex-grow"
            disabled={isChatLoading}
            autoFocus
            multiline
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
