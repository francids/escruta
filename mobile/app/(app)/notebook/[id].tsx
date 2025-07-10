// import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import Header from "components/Header";
import tw from "lib/tailwind";
import { Divider, IconButton } from "components/ui";
import { DotsVerticalIcon } from "components/icons";

export default function NotebookPage() {
  // const { id } = useLocalSearchParams();

  return (
    <View style={tw`flex flex-1 bg-neutral-950`}>
      <Header
        title={`Notebook`}
        action={<IconButton icon={<DotsVerticalIcon />} variant="ghost" />}
        showBackButton
      />
      <ScrollView style={tw`flex-1 px-4`} contentContainerStyle={tw`py-6`}>
        {/* Notebook Title */}
        <Text style={tw`text-white text-2xl font-bold`}>
          How traffic lights work?
        </Text>

        {/* Notebook Summary */}
        <Text style={tw`text-white font-bold text-lg mt-4`}>Summary:</Text>
        <Text style={tw`text-gray-400 text-lg mt-2`}>
          Traffic lights use timed cycles to control vehicle and pedestrian flow
          at intersections. Red stops traffic, green allows movement, and yellow
          warns of upcoming changes. Modern systems use sensors to adjust timing
          based on real-time conditions.
        </Text>

        <Divider style={tw`opacity-30`} />
      </ScrollView>
    </View>
  );
}
