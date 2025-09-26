import { View, Text, TouchableOpacity } from "react-native";
import tw, { themed } from "lib/tailwind";
import type Notebook from "interfaces/Notebook";
import { formatDate } from "utils";
import { router } from "expo-router";
import useTheme from "../hooks/useTheme";

interface NotebookCardProps {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <TouchableOpacity
      style={tw`flex flex-row items-center ${themed(
        "bg-white border border-neutral-200",
        "bg-neutral-800 border border-neutral-700",
        isDark
      )} rounded-sm p-4 h-16`}
      onPress={() => router.push(`/notebook/${notebook.id}`)}
      activeOpacity={0.8}
    >
      <View
        style={tw`w-8 h-8 ${themed(
          "bg-neutral-100",
          "bg-neutral-700",
          isDark
        )} rounded-sm mr-3 items-center justify-center`}
      >
        <Text style={tw`${themed("text-black", "text-white", isDark)} text-lg`}>
          {notebook.icon || "📓"}
        </Text>
      </View>

      <View style={tw`flex-1`}>
        <Text
          style={tw`${themed("text-black", "text-white", isDark)} text-base font-medium mb-1`}
          numberOfLines={1}
        >
          {notebook.title}
        </Text>
        <Text style={tw`${themed("text-neutral-600", "text-neutral-400", isDark)} text-sm`}>
          {formatDate(notebook.updatedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
