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
        tw`bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-sm p-4 border`,
        pressed && tw`bg-gray-50 dark:bg-gray-800/60`,
      ]}
    >
      <Text
        style={tw`text-gray-900 dark:text-white text-base font-semibold mb-2`}
        numberOfLines={2}
      >
        {source.title}
      </Text>
      {source.content && (
        <Text
          style={tw`text-gray-600 dark:text-gray-400 text-sm mb-2 leading-5`}
          numberOfLines={2}
        >
          {source.content}
        </Text>
      )}
      <Text
        style={tw`text-blue-500 dark:text-blue-400 text-xs`}
        numberOfLines={1}
      >
        {source.link}
      </Text>
    </Pressable>
  );
}
