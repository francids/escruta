import { View, Text, TouchableOpacity } from "react-native";
import tw from "../lib/tailwind";
import type Notebook from "../interfaces/Notebook";
import { formatDate } from "../utils";

interface NotebookCardProps {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  return (
    <TouchableOpacity
      style={tw`flex flex-row items-center bg-neutral-800 border border-neutral-700 rounded-xs p-4 h-16`}
      onPress={() => console.log(`Open notebook: ${notebook.title}`)}
      activeOpacity={0.8}
    >
      <View
        style={tw`w-8 h-8 bg-neutral-700 rounded-xs mr-3 items-center justify-center`}
      >
        <Text style={tw`text-white text-lg`}>{notebook.icon || "📓"}</Text>
      </View>

      <View style={tw`flex-1`}>
        <Text
          style={tw`text-white text-base font-medium mb-1`}
          numberOfLines={1}
        >
          {notebook.title}
        </Text>
        <Text style={tw`text-neutral-400 text-xs`}>
          {formatDate(notebook.updatedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
