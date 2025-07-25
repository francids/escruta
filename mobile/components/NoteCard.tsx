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
        tw`bg-gray-900 rounded-sm p-4 mb-3 border border-gray-800`,
        pressed && tw`bg-gray-800/60`,
      ]}
    >
      <Text style={tw`text-white text-lg font-medium mb-1`} numberOfLines={1}>
        {note.title}
      </Text>
      <Text style={tw`text-gray-400 text-sm`} numberOfLines={2}>
        {note.content}
      </Text>
    </Pressable>
  );
}
