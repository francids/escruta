import React from "react";
import { View, Text, Pressable } from "react-native";
import tw from "lib/tailwind";
import { useTheme } from "hooks";
import { LightIcon, DarkIcon, SystemIcon } from "./icons";

export default function ThemeToggle() {
  const { colorScheme, userPreference, setTheme } = useTheme();
  const isDark = colorScheme === "dark";

  const themeOptions = [
    { key: "light", label: "Light", icon: LightIcon },
    { key: "dark", label: "Dark", icon: DarkIcon },
    { key: "device", label: "Device", icon: SystemIcon },
  ];

  return (
    <View style={tw`flex-row justify-center items-center gap-2 p-4`}>
      {themeOptions.map(({ key, label, icon: Icon }) => {
        const isSelected = userPreference === key;
        return (
          <Pressable
            key={key}
            onPress={() => setTheme(key as "light" | "dark" | "device")}
            style={tw`flex-col items-center gap-2 p-3 rounded-lg ${
              isSelected
                ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600"
                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            }`}
          >
            <Icon
              width={24}
              height={24}
              color={isSelected ? "#0388fc" : isDark ? "#e6e6e6" : "#525252"}
            />
            <Text
              style={tw`text-sm font-medium ${
                isSelected
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-300"
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
