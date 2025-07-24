import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "lib/tailwind";
import { IconButton } from "./ui";
import { BackIcon } from "./icons";
import { router } from "expo-router";

interface HeaderProps {
  title: string | React.ReactNode;
  centerTitle?: boolean;
  action?: React.ReactNode;
  showBackButton?: boolean;
}

export default function Header({
  title,
  centerTitle,
  action,
  showBackButton,
}: HeaderProps) {
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
      <View style={tw`${centerTitle ? "flex-1 items-center" : "flex-1"}`}>
        <Text
          style={tw`text-white text-xl font-medium ${centerTitle ? "text-center" : ""}`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>
      {action}
    </View>
  );
}
