import { TouchableOpacity, Text, View } from "react-native";
import tw from "twrnc";

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
                h-10 px-4 rounded-sm
                transition-colors select-none
        `;

  const variantStyles = {
    primary: tw`bg-blue-500`,
    secondary: tw`bg-gray-200`,
    danger: tw`bg-red-500`,
  };

  const textVariantStyles = {
    primary: tw`text-white font-medium`,
    secondary: tw`text-gray-800 font-medium`,
    danger: tw`text-white font-medium`,
  };

  const disabledStyles = tw`opacity-50`;
  const fullWidthStyles = tw`w-full`;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        baseStyles,
        variantStyles[variant],
        disabled && disabledStyles,
        fullWidth && fullWidthStyles,
        style,
      ]}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textVariantStyles[variant]}>{text}</Text>
      {icon && (
        <View style={tw`ml-2 w-4 h-4 items-center justify-center`}>{icon}</View>
      )}
    </TouchableOpacity>
  );
}
