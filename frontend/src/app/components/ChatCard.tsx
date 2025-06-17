import { SendIcon } from "./icons";
import { Card, Divider, TextField, IconButton } from "./ui";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function ChatCard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

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

    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        text: `AI response to: "${newMessage.text}"`,
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && input.trim()) {
      handleSendMessage();
    }
  };

  return (
    <Card className="col-span-6 flex flex-col h-full">
      <h2 className="text-lg font-sans font-normal mb-2">Chat</h2>
      <Divider className="mb-0" />
      {messages.length > 0 ? (
        <div className="flex-grow overflow-y-auto p-0 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg select-text ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-muted select-text">
                Thinking...
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-start p-8">
          <div className="text-muted-foreground select-text">
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Summary of the notebook
            </h3>
            <p className="text-sm leading-relaxed">
              This notebook contains analysis of customer behavior patterns
              across different product categories. Key findings include a 23%
              increase in mobile purchases, seasonal trends in electronics
              sales, and correlation between user demographics and purchasing
              preferences. The data spans Q1-Q3 2024 with over 50,000
              transaction records analyzed using machine learning algorithms.
            </p>
          </div>
        </div>
      )}
      <Divider className="mt-0" />
      <div className="py-4">
        <div className="flex items-center gap-2">
          <TextField
            id="chat-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
