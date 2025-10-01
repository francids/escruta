import { Text, View, Pressable } from "react-native";
import tw from "lib/tailwind";

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
  const baseStyles = tw`
                relative flex-row items-center justify-center
                h-12 px-4 rounded-sm
        `;

  const variantStyles = {
    primary: tw`bg-blue-500 border border-blue-600`,
    secondary: tw`bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700`,
    danger: tw`bg-red-500 border border-red-600`,
  };

  const textVariantStyles = {
    primary: tw`text-white font-medium text-lg`,
    secondary: tw`text-black dark:text-gray-100 font-medium text-lg`,
    danger: tw`text-white font-medium text-lg`,
  };

  const disabledStyles = tw`opacity-50`;
  const fullWidthStyles = tw`w-full`;

  const pressedStyles = {
    primary: tw`bg-blue-600`,
    secondary: tw`bg-gray-200 dark:bg-gray-800/80`,
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
