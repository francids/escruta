import { Text, View, Pressable } from "react-native";
import tw, { themed } from "lib/tailwind";
import useTheme from "../../hooks/useTheme";

interface ButtonProps {
  text: string;
  onPress?: () => void;
  style?: object;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  text,
  onPress,
  style = {},
  variant = "primary",
  disabled = false,
  icon,
  fullWidth = false,
}: ButtonProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  const baseStyles = tw`
                relative flex-row items-center justify-center
                h-12 px-4 rounded-sm
        `;

  const variantStyles = {
    primary: tw`bg-blue-500 border border-blue-600`,
    secondary: tw`${themed(
      "bg-neutral-100 border border-neutral-200",
      "bg-gray-800 border border-gray-700",
      isDark
    )}`,
    danger: tw`bg-red-500 border border-red-600`,
  };

  const textVariantStyles = {
    primary: tw`text-white font-medium text-lg`,
    secondary: tw`${themed(
      "text-black font-medium text-lg",
      "text-gray-100 font-medium text-lg",
      isDark
    )}`,
    danger: tw`text-white font-medium text-lg`,
  };

  const disabledStyles = tw`opacity-50`;
  const fullWidthStyles = tw`w-full`;

  const pressedStyles = {
    primary: tw`bg-blue-600`,
    secondary: tw`${themed("bg-neutral-200", "bg-gray-800/80", isDark)}`,
    danger: tw`bg-red-600`,
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        baseStyles,
        variantStyles[variant],
        disabled && disabledStyles,
        fullWidth && fullWidthStyles,
        style,
        pressed && pressedStyles[variant],
      ]}
      disabled={disabled}
    >
      <Text style={textVariantStyles[variant]}>{text}</Text>
      {icon && (
        <View style={tw`ml-2 w-4 h-4 items-center justify-center`}>{icon}</View>
      )}
    </Pressable>
  );
}
