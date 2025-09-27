import { View, Text } from "react-native";
import tw from "lib/tailwind";

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
  if (orientation === "vertical") {
    return (
      <View
        style={[tw`h-full w-px bg-neutral-300 dark:bg-neutral-600`, style]}
      />
    );
  }

  if (label) {
    return (
      <View style={[tw`flex-row items-center py-4`, style]}>
        <View style={tw`flex-1 h-px bg-neutral-300 dark:bg-neutral-600`} />
        <Text
          style={tw`mx-4 text-sm text-neutral-600 dark:text-neutral-300 font-sans`}
        >
          {label}
        </Text>
        <View style={tw`flex-1 h-px bg-neutral-300 dark:bg-neutral-600`} />
      </View>
    );
  }

  return (
    <View
      style={[tw`h-px bg-neutral-300 dark:bg-neutral-600 my-6 w-full`, style]}
    />
  );
}
