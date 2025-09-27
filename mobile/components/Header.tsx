import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "lib/tailwind";
import { IconButton, MenuButton } from "./ui";
import { BackIcon, DotsVerticalIcon } from "./icons";
import { router } from "expo-router";

type HeaderTitleType =
  | string
  | React.ReactNode
  | ((props?: { children?: string; tintColor?: string }) => React.ReactNode);

interface HeaderProps {
  title: HeaderTitleType;
  subtitle?: string;
  action?: React.ReactNode;
  showBackButton?: boolean;
  menuItems?: Array<{
    text: string;
    onPress: () => void;
  }>;
}

export default function Header({
  title,
  subtitle,
  action,
  showBackButton,
  menuItems,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`bg-gray-50 dark:bg-gray-950 border-b border-gray-200/60 dark:border-gray-700 px-4 pb-5`,
        { paddingTop: insets.top + 20 },
      ]}
    >
      <View style={tw`flex-row justify-between items-center gap-4`}>
        <View style={tw`flex-row items-center gap-4 min-w-0 flex-1`}>
          {showBackButton && (
            <IconButton
              icon={<BackIcon />}
              variant="ghost"
              onPress={() => router.back()}
            />
          )}
          <View
            style={tw`flex-col items-start ${showBackButton ? "gap-0.5" : "gap-1.5"} min-w-0 flex-1`}
          >
            {subtitle && (
              <Text
                style={tw`text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400`}
              >
                {subtitle}
              </Text>
            )}
            {typeof title === "string" ? (
              <Text
                style={tw`text-2xl font-bold text-gray-900 dark:text-white`}
                numberOfLines={1}
              >
                {title}
              </Text>
            ) : typeof title === "function" ? (
              title({})
            ) : (
              title
            )}
          </View>
        </View>
        {menuItems ? (
          <MenuButton
            menuItems={menuItems}
            position="bottom-right"
            button={({ onPress }) => (
              <IconButton
                icon={<DotsVerticalIcon />}
                variant="ghost"
                onPress={onPress}
              />
            )}
          />
        ) : action ? (
          action
        ) : null}
      </View>
    </View>
  );
}
