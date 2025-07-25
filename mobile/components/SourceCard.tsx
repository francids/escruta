import { Text, Pressable } from "react-native";
import tw from "lib/tailwind";
import type { Source } from "interfaces";

interface SourceCardProps {
  source: Source;
}

export default function SourceCard({ source }: SourceCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        tw`bg-gray-900 rounded-sm p-4 mb-3 border border-gray-800`,
        pressed && tw`bg-gray-800/60`,
      ]}
    >
      <Text style={tw`text-white text-lg font-medium mb-1`} numberOfLines={2}>
        {source.title}
      </Text>
      <Text style={tw`text-blue-400 text-sm`} numberOfLines={1}>
        {source.link}
      </Text>
    </Pressable>
  );
}
