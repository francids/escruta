import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../lib/tailwind";
import { IconButton } from "./ui";
import { BackIcon } from "./icons";
import { router } from "expo-router";

interface HeaderProps {
  title: string | React.ReactNode;
  action?: React.ReactNode;
  showBackButton?: boolean;
}

export default function Header({ title, action, showBackButton }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={tw`bg-neutral-900 px-4 pt-[${insets.top + 16}px] pb-4 flex-row gap-4 items-center justify-between border-b border-neutral-700`}
    >
      {showBackButton ? (
        <IconButton
          icon={<BackIcon />}
          variant="ghost"
          onPress={() => router.back()}
        />
      ) : null}
      <Text
        style={tw`text-white text-xl font-medium flex-1 ${showBackButton ? "text-center" : ""}`}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      {action}
    </View>
  );
}
