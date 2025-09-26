import { Pressable, View } from "react-native";
import tw from "../../lib/tailwind";
import React from "react";
import useTheme from "../../hooks/useTheme";

interface IconButtonProps {
  icon: React.JSX.Element | React.ReactNode;
  onPress?: () => void;
  style?: object;
  variant?: "primary" | "secondary" | "danger" | "ghost";
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
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  const baseStyles = tw`relative items-center justify-center rounded-sm`;

  const sizeStyles = {
    sm: tw`w-8 h-8`,
    md: tw`w-10 h-10`,
    lg: tw`w-12 h-12`,
  };

  const variantStyles = {
    primary: tw`bg-blue-500 border border-blue-600`,
    secondary: tw`bg-neutral-100 dark:bg-gray-800 border border-neutral-200 dark:border-gray-700`,
    danger: tw`bg-red-500 border border-red-600`,
    ghost: tw``,
  };

  const pressedVariantStyles = {
    primary: tw`bg-blue-600`,
    secondary: tw`bg-neutral-200 dark:bg-gray-800/80`,
    danger: tw`bg-red-600`,
    ghost: tw`bg-gray-500/10`,
  };

  const iconColors = {
    primary: "white",
    secondary: isDark ? "white" : "black",
    danger: "white",
    ghost: isDark ? "white" : "black",
  };

  const disabledStyles = tw`opacity-50`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        pressed && pressedVariantStyles[variant],
        disabled && disabledStyles,
        style,
      ]}
      disabled={disabled}
    >
      <View style={tw`items-center justify-center`}>
        {React.isValidElement(icon)
          ? React.cloneElement(icon, {
              color: iconColors[variant],
              width: size === "sm" ? 20 : size === "md" ? 24 : 28,
              height: size === "sm" ? 20 : size === "md" ? 24 : 28,
            } as any)
          : icon}
      </View>
    </Pressable>
  );
}
