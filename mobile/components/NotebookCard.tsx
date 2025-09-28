import { View, Text, Pressable } from "react-native";
import tw from "lib/tailwind";
import type { Notebook } from "interfaces";
import { formatDate } from "utils";
import { router } from "expo-router";

interface NotebookCardProps {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        tw`flex flex-row items-center bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 rounded-sm p-3`,
        pressed && tw`bg-gray-50 dark:bg-gray-700/50`,
      ]}
      onPress={() => router.push(`/notebook/${notebook.id}`)}
    >
      <View
        style={tw`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-sm mr-3 items-center justify-center`}
      >
        <Text style={tw`text-black dark:text-white text-lg`}>
          {notebook.icon || "📓"}
        </Text>
      </View>

      <View style={tw`flex-1`}>
        <Text
          style={tw`text-black dark:text-white text-base font-medium mb-1`}
          numberOfLines={1}
        >
          {notebook.title}
        </Text>
        <Text style={tw`text-gray-600 dark:text-gray-400 text-sm`}>
          {formatDate(notebook.updatedAt)}
        </Text>
      </View>
    </Pressable>
  );
}
