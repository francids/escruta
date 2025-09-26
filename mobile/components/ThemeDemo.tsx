import React from "react";
import { View, Text, ScrollView } from "react-native";
import tw from "../lib/tailwind";
import useTheme from "../hooks/useTheme";
import { Button, IconButton, TextField, Divider } from "./ui";
import { AddIcon, FireIcon, ToolIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";

export default function ThemeDemo() {
  const { effectiveTheme } = useTheme();
  const [textValue, setTextValue] = React.useState("Sample text");

  return (
    <ScrollView
      style={tw`flex-1 bg-white dark:bg-neutral-950`}
      contentContainerStyle={tw`p-4 gap-6`}
    >
      {/* Theme Toggle */}
      <View style={tw`bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4`}>
        <Text style={tw`text-black dark:text-white text-xl font-bold mb-4 text-center`}>
          Theme Settings
        </Text>
        <ThemeToggle />
      </View>

      {/* Colors Demonstration */}
      <View style={tw`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4`}>
        <Text style={tw`text-black dark:text-white text-lg font-bold mb-4`}>
          Color Palette
        </Text>
        <View style={tw`flex-row flex-wrap gap-3`}>
          <View style={tw`bg-blue-500 w-16 h-16 rounded-lg items-center justify-center`}>
            <Text style={tw`text-white text-xs font-medium`}>Blue</Text>
          </View>
          <View style={tw`bg-red-500 w-16 h-16 rounded-lg items-center justify-center`}>
            <Text style={tw`text-white text-xs font-medium`}>Red</Text>
          </View>
          <View style={tw`bg-green-500 w-16 h-16 rounded-lg items-center justify-center`}>
            <Text style={tw`text-white text-xs font-medium`}>Green</Text>
          </View>
          <View style={tw`bg-neutral-300 dark:bg-neutral-600 w-16 h-16 rounded-lg items-center justify-center`}>
            <Text style={tw`text-black dark:text-white text-xs font-medium`}>
              Neutral
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={tw`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4`}>
        <Text style={tw`text-black dark:text-white text-lg font-bold mb-4`}>
          Buttons
        </Text>
        <View style={tw`gap-3`}>
          <Button text="Primary Button" variant="primary" />
          <Button text="Secondary Button" variant="secondary" />
          <Button text="Danger Button" variant="danger" />
        </View>
        
        <Divider label="Icon Buttons" />
        
        <View style={tw`flex-row gap-3`}>
          <IconButton icon={<AddIcon />} variant="primary" />
          <IconButton icon={<FireIcon />} variant="secondary" />
          <IconButton icon={<ToolIcon />} variant="danger" />
          <IconButton icon={<AddIcon />} variant="ghost" />
        </View>
      </View>

      {/* Text Input */}
      <View style={tw`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4`}>
        <Text style={tw`text-black dark:text-white text-lg font-bold mb-4`}>
          Text Input
        </Text>
        <TextField
          label="Sample Field"
          value={textValue}
          onChangeText={setTextValue}
          placeholder="Enter some text..."
        />
      </View>

      {/* Typography */}
      <View style={tw`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4`}>
        <Text style={tw`text-black dark:text-white text-lg font-bold mb-4`}>
          Typography
        </Text>
        <Text style={tw`text-black dark:text-white text-2xl font-bold mb-2`}>
          Heading 1
        </Text>
        <Text style={tw`text-black dark:text-white text-xl font-semibold mb-2`}>
          Heading 2
        </Text>
        <Text style={tw`text-black dark:text-white text-lg font-medium mb-2`}>
          Heading 3
        </Text>
        <Text style={tw`text-neutral-700 dark:text-neutral-300 text-base mb-2`}>
          Body text in the {effectiveTheme} theme. This demonstrates how text adapts to the current theme setting.
        </Text>
        <Text style={tw`text-neutral-500 dark:text-neutral-400 text-sm`}>
          Secondary text that's slightly muted.
        </Text>
      </View>

      {/* Current Theme Info */}
      <View style={tw`bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4`}>
        <Text style={tw`text-blue-800 dark:text-blue-200 text-lg font-bold mb-2`}>
          Current Theme
        </Text>
        <Text style={tw`text-blue-700 dark:text-blue-300 text-base`}>
          Effective Theme: <Text style={tw`font-bold`}>{effectiveTheme}</Text>
        </Text>
      </View>
    </ScrollView>
  );
}