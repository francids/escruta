import { TouchableOpacity, View, Text } from "react-native";
import tw from "lib/tailwind";
import { cloneElement, isValidElement } from "react";
import { useTheme } from "hooks";

interface FABProps {
  icon: React.ReactNode;
  onPress?: () => void;
  style?: object;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export default function FAB({
  icon,
  onPress,
  style = {},
  variant = "primary",
  disabled = false,
}: FABProps) {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  const baseStyles = tw`
    absolute bottom-12 right-8
    flex-row justify-center items-center
    size-14
    rounded-sm
    shadow-lg
    elevation-6
    z-50
    border border-blue-400
  `;

  const variantStyles = {
    primary: tw`bg-blue-600`,
    secondary: tw`bg-neutral-100 dark:bg-gray-800`,
    danger: tw`bg-red-600`,
  };

  const disabledStyles = tw`opacity-40`;

  const iconColors = {
    primary: "white",
    secondary: isDark ? "white" : "black",
    danger: "white",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        baseStyles,
        variantStyles[variant],
        disabled && disabledStyles,
        style,
      ]}
      disabled={disabled}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={"Floating Action Button"}
    >
      <View style={tw`items-center justify-center`}>
        {isValidElement(icon)
          ? cloneElement(icon, {
              color: iconColors[variant],
              width: 28,
              height: 28,
              style: { marginRight: 6 },
            } as any)
          : icon}
      </View>
    </TouchableOpacity>
  );
}
