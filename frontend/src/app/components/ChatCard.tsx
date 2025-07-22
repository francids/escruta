import useFetch from "../../hooks/useFetch";
import { FireIcon, SendIcon } from "./icons";
import { Card, Divider, TextField, IconButton, Tooltip } from "./ui";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
    data: chatSummary,
    loading: isSummaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useFetch<string>(
    `notebooks/${notebookId}/chat/summary`,
    undefined,
    false
  );

  useEffect(() => {
    refetchSummary(true);
  }, [refreshTrigger]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setIsLoading(true);
    await fetchChatResponse(true);
  };

  const { refetch: fetchChatResponse } = useFetch<string>(
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
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
        console.error("Error fetching chat response:", error);
      },
    },
    false
  );

  return (
    <Card className="col-span-6 flex flex-col h-full">
      <h2 className="text-lg font-sans font-normal mb-2">Chat</h2>
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
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium mr-12"
                  }`}
                >
                  <p className="text-base leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-start"
            >
              <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-xs bg-muted select-text">
                Thinking...
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex-grow flex items-center justify-start p-8 overflow-y-auto"
          style={{ minHeight: 0, maxHeight: "100%" }}
        >
          <div className="text-muted-foreground select-text max-w-full overflow-x-auto">
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Summary of the notebook
            </h3>
            <p className="mt-1 mb-1 text-base font-medium leading-6">
              {isSummaryLoading
                ? "Loading summary..."
                : summaryError
                ? `Error: ${summaryError.message}`
                : chatSummary || "No summary available."}
            </p>
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
                disabled={messages.length === 0 && !isLoading}
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
              if (e.key === "Enter" && !isLoading && input.trim()) {
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-grow"
            disabled={isLoading}
            autoFocus
          />
          <IconButton
            icon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          />
        </div>
      </div>
    </Card>
  );
}
