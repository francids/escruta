import { View, Text, TouchableOpacity } from "react-native";
import tw from "lib/tailwind";
import type { Notebook } from "interfaces";
import { formatDate } from "utils";
import { router } from "expo-router";

interface NotebookCardProps {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  return (
    <TouchableOpacity
      style={tw`flex flex-row items-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm p-4 h-16`}
      onPress={() => router.push(`/notebook/${notebook.id}`)}
      activeOpacity={0.8}
    >
      <View
        style={tw`w-8 h-8 bg-neutral-100 dark:bg-neutral-700 rounded-sm mr-3 items-center justify-center`}
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
        <Text style={tw`text-neutral-600 dark:text-neutral-400 text-sm`}>
          {formatDate(notebook.updatedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
