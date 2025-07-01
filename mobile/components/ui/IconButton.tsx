import { TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";
import React from "react";

interface IconButtonProps {
  icon: React.JSX.Element | React.ReactNode;
  onPress?: () => void;
  style?: object;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function IconButton({
  icon,
  onPress,
  style = {},
  variant = "primary",
  disabled = false,
  size = "md",
}: IconButtonProps) {
  const baseStyles = tw`relative items-center justify-center rounded-sm`;

  const sizeStyles = {
    sm: tw`w-8 h-8`,
    md: tw`w-10 h-10`,
    lg: tw`w-12 h-12`,
  };

  const variantStyles = {
    primary: tw`bg-blue-500`,
    secondary: tw`bg-gray-200`,
    danger: tw`bg-red-500`,
  };

  const iconColors = {
    primary: "white",
    secondary: "black",
    danger: "white",
  };

  const disabledStyles = tw`opacity-50`;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        disabled && disabledStyles,
        style,
      ]}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={tw`items-center justify-center`}>
        {React.isValidElement(icon)
          ? React.cloneElement(icon, {
              color: iconColors[variant],
              width: size === "sm" ? 16 : size === "md" ? 20 : 24,
              height: size === "sm" ? 16 : size === "md" ? 20 : 24,
            } as any)
          : icon}
      </View>
    </TouchableOpacity>
  );
}
