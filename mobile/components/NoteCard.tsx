import { Text, Pressable } from "react-native";
import tw from "lib/tailwind";
import type { Note } from "interfaces";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        tw`bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-sm p-4 border`,
        pressed && tw`bg-gray-50 dark:bg-gray-800/60`,
      ]}
    >
      <Text
        style={tw`text-gray-900 dark:text-white text-base font-semibold mb-2`}
        numberOfLines={1}
      >
        {note.title}
      </Text>
      <Text
        style={tw`text-gray-600 dark:text-gray-400 text-sm leading-5`}
        numberOfLines={3}
      >
        {note.content}
      </Text>
    </Pressable>
  );
}
