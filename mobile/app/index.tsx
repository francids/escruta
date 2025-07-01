import { View, Text, ScrollView } from "react-native";
import tw from "../lib/tailwind";
import Header from "../components/Header";
import Logo from "../components/Logo";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomePage() {
  const insets = useSafeAreaInsets();

  return (
    <View style={tw`flex flex-1`}>
      <Header title={<Logo style="w-28 h-8 text-white" />} />
      <ScrollView
        style={tw`flex flex-1 flex-col p-4 bg-neutral-950`}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        <Text style={tw`text-white text-xl font-medium`}>Notebooks</Text>
      </ScrollView>
    </View>
  );
}
