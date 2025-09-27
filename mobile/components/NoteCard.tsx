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
        tw`bg-white dark:bg-gray-900 border-neutral-200 dark:border-gray-800 rounded-sm p-4 mb-3 border`,
        pressed && tw`bg-neutral-50 dark:bg-gray-800/60`,
      ]}
    >
      <Text style={tw`text-black dark:text-white text-lg font-medium mb-1`} numberOfLines={1}>
        {note.title}
      </Text>
      <Text style={tw`text-neutral-600 dark:text-gray-400 text-sm`} numberOfLines={2}>
        {note.content}
      </Text>
    </Pressable>
  );
}
