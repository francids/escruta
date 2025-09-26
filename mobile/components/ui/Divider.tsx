import { View, Text } from "react-native";
import tw, { themed } from "../../lib/tailwind";
import useTheme from "../../hooks/useTheme";

type DividerProps = {
  style?: any;
  orientation?: "horizontal" | "vertical";
  label?: string;
};

export default function Divider({
  style,
  orientation = "horizontal",
  label,
}: DividerProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  if (orientation === "vertical") {
    return (
      <View
        style={[
          tw`h-full w-px ${themed("bg-neutral-300", "bg-neutral-600", isDark)}`,
          style,
        ]}
      />
    );
  }

  if (label) {
    return (
      <View style={[tw`flex-row items-center py-4`, style]}>
        <View style={tw`flex-1 h-px ${themed("bg-neutral-300", "bg-neutral-600", isDark)}`} />
        <Text style={tw`mx-4 text-sm ${themed("text-neutral-600", "text-neutral-300", isDark)} font-sans`}>
          {label}
        </Text>
        <View style={tw`flex-1 h-px ${themed("bg-neutral-300", "bg-neutral-600", isDark)}`} />
      </View>
    );
  }

  return (
    <View
      style={[
        tw`h-px ${themed("bg-neutral-300", "bg-neutral-600", isDark)} my-6 w-full`,
        style,
      ]}
    />
  );
}
