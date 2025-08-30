import useFetch from "../../hooks/useFetch";
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
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import CodeBlock from "./CodeBlock";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

interface ChatCardProps {
  notebookId: string;
  refreshTrigger?: number;
}

export default function ChatCard({
  notebookId,
  refreshTrigger,
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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    await fetchChatResponse(true);
  };

  const { loading: isChatLoading, refetch: fetchChatResponse } =
    useFetch<string>(
      `notebooks/${notebookId}/chat`,
      {
        method: "POST",
        data: {
          userInput: input,
          // messages,
        },
        onSuccess: (response) => {
          const aiResponse: Message = {
            id: Date.now().toString(),
            text: response,
            sender: "ai",
          };
          setMessages((prevMessages) => [...prevMessages, aiResponse]);
        },
        onError: (error) => {
          console.error("Error fetching chat response:", error);
        },
      },
      false
    );

  return (
    <Card className="col-span-6 flex flex-col h-full">
      <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0">
        <h2 className="text-lg font-sans font-normal">Chat</h2>
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
        <div className="flex-grow overflow-y-auto p-4 space-y-2">
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
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xs select-text shadow-sm transition-all duration-200 ${
                    msg.sender === "user"
                      ? "bg-blue-500 dark:bg-blue-600 text-white font-medium ml-12"
                      : "bg-gray-100/60 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium mr-12"
                  }`}
                >
                  <p className="text-base leading-relaxed">{msg.text}</p>
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
                <Markdown
                  components={{
                    code: ({ className, children }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      const inline = !match;
                      return (
                        <CodeBlock inline={inline} className={className}>
                          {String(children).replace(/\n$/, "")}
                        </CodeBlock>
                      );
                    },
                  }}
                >
                  {notebookSummary}
                </Markdown>
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
      <div className="py-4">
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
