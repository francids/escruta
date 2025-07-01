import { View } from "react-native";
import tw from "twrnc";
import Header from "../components/Header";
import Logo from "../components/Logo";

export default function HomePage() {
  return (
    <View style={tw`flex flex-1`}>
      <Header title={<Logo style="w-28 h-8 text-white" />} />
      <View style={tw`flex flex-1 flex-col p-4 bg-neutral-950`}></View>
    </View>
  );
}
