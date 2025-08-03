import { useLocalSearchParams } from "expo-router";
import tw from "lib/tailwind";
import { View } from "react-native";

export default function ChatScreen() {
  const { notebookId } = useLocalSearchParams();

  return <View style={tw`flex flex-1 bg-neutral-950`}></View>;
}
