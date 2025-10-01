import Header from "components/Header";
import tw from "lib/tailwind";
import { View, ScrollView } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={tw`flex flex-1 bg-white dark:bg-gray-950`}>
      <Header title="Settings" subtitle="Configuration" showBackButton={true} />
      <ScrollView
        style={tw`flex-1 bg-white dark:bg-gray-950`}
        contentContainerStyle={tw`pt-6 pb-8`}
      ></ScrollView>
    </View>
  );
}
