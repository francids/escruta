import React from "react";
import { View, Text, ScrollView } from "react-native";
import tw, { themed } from "../lib/tailwind";
import useTheme from "../hooks/useTheme";
import { Button, IconButton, TextField, Divider } from "./ui";
import { AddIcon, FireIcon, ToolIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";

export default function ThemeDemo() {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";
  const [textValue, setTextValue] = React.useState("Sample text");

  return (
    <ScrollView
      style={tw`flex-1 ${themed("bg-white", "bg-neutral-950", isDark)}`}
      contentContainerStyle={tw`p-4 gap-6`}
    >
      {/* Theme Toggle */}
      <View style={tw`${themed("bg-neutral-50", "bg-neutral-900", isDark)} rounded-lg p-4`}>
        <Text style={tw`${themed("text-black", "text-white", isDark)} text-xl font-bold mb-4 text-center`}>
          Theme Settings
        </Text>
        <ThemeToggle />
      </View>

      {/* Colors Demonstration */}
      <View style={tw`${themed("bg-white border border-neutral-200", "bg-neutral-800 border border-neutral-700", isDark)} rounded-lg p-4`}>
        <Text style={tw`${themed("text-black", "text-white", isDark)} text-lg font-bold mb-4`}>
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
          <View style={tw`${themed("bg-neutral-300", "bg-neutral-600", isDark)} w-16 h-16 rounded-lg items-center justify-center`}>
            <Text style={tw`${themed("text-black", "text-white", isDark)} text-xs font-medium`}>
              Neutral
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={tw`${themed("bg-white border border-neutral-200", "bg-neutral-800 border border-neutral-700", isDark)} rounded-lg p-4`}>
        <Text style={tw`${themed("text-black", "text-white", isDark)} text-lg font-bold mb-4`}>
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
      <View style={tw`${themed("bg-white border border-neutral-200", "bg-neutral-800 border border-neutral-700", isDark)} rounded-lg p-4`}>
        <Text style={tw`${themed("text-black", "text-white", isDark)} text-lg font-bold mb-4`}>
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
      <View style={tw`${themed("bg-white border border-neutral-200", "bg-neutral-800 border border-neutral-700", isDark)} rounded-lg p-4`}>
        <Text style={tw`${themed("text-black", "text-white", isDark)} text-lg font-bold mb-4`}>
          Typography
        </Text>
        <Text style={tw`${themed("text-black", "text-white", isDark)} text-2xl font-bold mb-2`}>
          Heading 1
        </Text>
        <Text style={tw`${themed("text-black", "text-white", isDark)} text-xl font-semibold mb-2`}>
          Heading 2
        </Text>
        <Text style={tw`${themed("text-black", "text-white", isDark)} text-lg font-medium mb-2`}>
          Heading 3
        </Text>
        <Text style={tw`${themed("text-neutral-700", "text-neutral-300", isDark)} text-base mb-2`}>
          Body text in the {effectiveTheme} theme. This demonstrates how text adapts to the current theme setting.
        </Text>
        <Text style={tw`${themed("text-neutral-500", "text-neutral-400", isDark)} text-sm`}>
          Secondary text that's slightly muted.
        </Text>
      </View>

      {/* Current Theme Info */}
      <View style={tw`${themed("bg-blue-50 border border-blue-200", "bg-blue-900/20 border border-blue-800", isDark)} rounded-lg p-4`}>
        <Text style={tw`${themed("text-blue-800", "text-blue-200", isDark)} text-lg font-bold mb-2`}>
          Current Theme
        </Text>
        <Text style={tw`${themed("text-blue-700", "text-blue-300", isDark)} text-base`}>
          Effective Theme: <Text style={tw`font-bold`}>{effectiveTheme}</Text>
        </Text>
      </View>
    </ScrollView>
  );
}