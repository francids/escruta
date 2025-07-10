import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import Header from "components/Header";
import tw from "lib/tailwind";
import { IconButton } from "components/ui";
import { DotsVerticalIcon } from "components/icons";

export default function NotebookPage() {
  const { id } = useLocalSearchParams();

  return (
    <View style={tw`flex flex-1 bg-neutral-950`}>
      <Header
        title={`Notebook`}
        action={<IconButton icon={<DotsVerticalIcon />} variant="ghost" />}
        showBackButton
      />
      <View style={tw`flex-1 p-4`}>
        <Text style={tw`text-white text-xl`}>Notebook ID: {id}</Text>
      </View>
    </View>
  );
}
