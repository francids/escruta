import { Text, Pressable } from "react-native";
import tw, { themed } from "lib/tailwind";
import type { Note } from "interfaces";
import useTheme from "../hooks/useTheme";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <Pressable
      style={({ pressed }) => [
        tw`${themed(
          "bg-white border-neutral-200",
          "bg-gray-900 border-gray-800",
          isDark
        )} rounded-sm p-4 mb-3 border`,
        pressed && tw`${themed("bg-neutral-50", "bg-gray-800/60", isDark)}`,
      ]}
    >
      <Text style={tw`${themed("text-black", "text-white", isDark)} text-lg font-medium mb-1`} numberOfLines={1}>
        {note.title}
      </Text>
      <Text style={tw`${themed("text-neutral-600", "text-gray-400", isDark)} text-sm`} numberOfLines={2}>
        {note.content}
      </Text>
    </Pressable>
  );
}
