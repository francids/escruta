import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../lib/tailwind";

interface HeaderProps {
  title: string | React.ReactNode;
  action?: React.ReactNode;
}

export default function Header({ title, action }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={tw`bg-neutral-900 px-4 pt-[${insets.top + 16}px] pb-6 flex-row items-center justify-between border-b border-neutral-700`}
    >
      <Text style={tw`text-white text-xl font-medium`}>{title}</Text>
      <StatusBar style="light" />
      {action}
    </View>
  );
}
