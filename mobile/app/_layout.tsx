import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import tw from "lib/tailwind";
import { ThemeProvider } from "providers";
import { useTheme } from "hooks";
import { View } from "react-native";

function RootLayoutContent() {
  const { colorScheme } = useTheme();

  return (
    <View style={tw`flex-1 bg-white dark:bg-gray-900`}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
          animation: "fade_from_bottom",
          animationDuration: 300,
        }}
      >
        {/* Landing/Auth Routes */}
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />

        {/* App Routes - Nested */}
        <Stack.Screen name="(app)" />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
