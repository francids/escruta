import React from "react";
import { View, Text, Pressable } from "react-native";
import tw, { themed } from "../lib/tailwind";
import useTheme from "../hooks/useTheme";
import { LightIcon, DarkIcon, SystemIcon } from "./icons";

export default function ThemeToggle() {
  const { themePreference, setTheme, ThemeOptions, effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  const themeOptions = [
    { key: ThemeOptions.Light, label: "Light", icon: LightIcon },
    { key: ThemeOptions.Dark, label: "Dark", icon: DarkIcon },
    { key: ThemeOptions.System, label: "System", icon: SystemIcon },
  ];

  return (
    <View style={tw`flex-row justify-center items-center gap-2 p-4`}>
      {themeOptions.map(({ key, label, icon: Icon }) => {
        const isSelected = themePreference === key;
        return (
          <Pressable
            key={key}
            onPress={() => setTheme(key)}
            style={tw`flex-col items-center gap-2 p-3 rounded-lg ${
              isSelected 
                ? themed("bg-blue-100 border border-blue-300", "bg-blue-900/30 border border-blue-600", isDark)
                : themed("bg-white border border-neutral-200", "bg-neutral-800 border border-neutral-700", isDark)
            }`}
          >
            <Icon
              width={24}
              height={24}
              color={
                isSelected 
                  ? "#0388fc" 
                  : isDark ? "#e6e6e6" : "#525252"
              }
            />
            <Text
              style={tw`text-sm font-medium ${
                isSelected
                  ? "text-blue-600"
                  : themed("text-neutral-700", "text-neutral-300", isDark)
              }`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}