import { useLocalSearchParams } from "expo-router";
import tw from "lib/tailwind";
import { View, Text, FlatList, TextInput, Alert } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard } from "hooks/useKeyboard";
import { IconButton } from "components/ui";
import { SendIcon, FireIcon } from "components/icons";
import useTheme from "../../../hooks/useTheme";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function ChatScreen() {
  const { notebookId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const flatListRef = useRef<FlatList>(null);
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [isKeyboardVisible]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thanks for your message: "${currentInput}". Based on the notebook content about traffic management systems, I can help you understand how modern cities optimize traffic flow using adaptive algorithms and sensor networks. What specific aspect would you like to explore further?`,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      Alert.alert("Error", "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    Alert.alert("Clear Chat", "Are you sure you want to clear all messages?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {
          setMessages([]);
          setInput("");
        },
      },
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View style={tw`flex flex-1 bg-white dark:bg-neutral-950`}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        style={tw`flex-1`}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item: message, index }) => (
          <View style={tw`mb-4`}>
            <View
              style={tw`flex ${
                message.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <View
                style={tw`max-w-[280px] px-4 py-3 rounded-sm ${
                  message.sender === "user"
                    ? "bg-blue-600 ml-12"
                    : "bg-neutral-200 dark:bg-neutral-800 mr-12"
                }`}
              >
                <Text
                  style={tw`${message.sender === "user" ? "text-white" : "text-black dark:text-white"} text-base leading-relaxed ${
                    message.sender === "user" ? "font-medium" : "font-normal"
                  }`}
                >
                  {message.text}
                </Text>
              </View>
              <Text
                style={tw`text-neutral-500 text-xs mt-1 ${
                  message.sender === "user" ? "mr-2" : "ml-2"
                }`}
              >
                {formatTime(message.timestamp)}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          isLoading ? (
            <View style={tw`flex items-start mb-4`}>
              <View
                style={tw`max-w-[280px] px-4 py-3 rounded-sm bg-neutral-200 dark:bg-neutral-800 mr-12`}
              >
                <Text style={tw`text-black dark:text-white text-base`}>AI is thinking...</Text>
              </View>
            </View>
          ) : null
        }
      />

      <View
        style={[
          tw`border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-3`,
          {
            paddingBottom: isKeyboardVisible
              ? keyboardHeight + 36
              : insets.bottom + 16,
          },
        ]}
      >
        <View style={tw`flex-row items-center gap-3`}>
          {messages.length > 0 && (
            <IconButton
              icon={<FireIcon width={20} height={20} color="#ef4444" />}
              variant="ghost"
              onPress={clearChat}
              disabled={isLoading}
            />
          )}

          <TextInput
            style={tw`flex-1 bg-white dark:bg-neutral-800 text-black dark:text-white text-base px-4 py-3 rounded-sm border border-neutral-300 dark:border-neutral-700 font-sans`}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            placeholderTextColor={isDark ? tw.color("text-neutral-500") : tw.color("text-neutral-400")}
            multiline
            maxLength={500}
            editable={!isLoading}
            onSubmitEditing={() => {
              if (input.trim() && !isLoading) {
                sendMessage();
              }
            }}
            selectionColor={tw.color("text-blue-400")}
          />

          <IconButton
            icon={<SendIcon width={20} height={20} color="white" />}
            variant="primary"
            onPress={sendMessage}
            disabled={!input.trim() || isLoading}
            style={tw`${
              !input.trim() || isLoading ? "opacity-50" : "opacity-100"
            }`}
          />
        </View>
      </View>
    </View>
  );
}
