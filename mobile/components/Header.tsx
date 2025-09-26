import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw, { themed } from "lib/tailwind";
import { IconButton } from "./ui";
import { BackIcon } from "./icons";
import { router } from "expo-router";
import useTheme from "../hooks/useTheme";

type HeaderTitleType =
  | string
  | React.ReactNode
  | ((props?: { children?: string; tintColor?: string }) => React.ReactNode);

interface HeaderProps {
  title: HeaderTitleType;
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
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <View
      style={tw`${themed(
        "bg-white border-neutral-200",
        "bg-neutral-900 border-neutral-700",
        isDark
      )} px-4 pt-[${insets.top + 16}px] pb-4 flex-row gap-4 items-center justify-between border-b`}
    >
      {showBackButton ? (
        <IconButton
          icon={<BackIcon />}
          variant="ghost"
          onPress={() => router.back()}
        />
      ) : centerTitle && action && !showBackButton ? (
        <View style={tw`w-10`} />
      ) : null}

      <View style={tw`${centerTitle ? "flex-1 items-center" : "flex-1"}`}>
        {typeof title === "string" ? (
          <Text
            style={tw`${themed("text-black", "text-white", isDark)} text-xl font-medium ${centerTitle ? "text-center" : ""}`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        ) : typeof title === "function" ? (
          title({})
        ) : (
          title
        )}
      </View>

      {action ? (
        action
      ) : centerTitle && showBackButton && !action ? (
        <View style={tw`w-10`} />
      ) : null}
    </View>
  );
}
