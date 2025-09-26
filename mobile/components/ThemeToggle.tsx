import React from "react";
import { View, Text, Pressable } from "react-native";
import tw from "../lib/tailwind";
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
                ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600"
                : "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
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
                  : "text-neutral-700 dark:text-neutral-300"
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