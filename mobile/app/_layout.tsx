import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import tw from "lib/tailwind";
import { useDeviceContext } from "twrnc";
import ThemeProvider from "../providers/ThemeProvider";
import useTheme from "../hooks/useTheme";

function RootLayoutContent() {
  const { effectiveTheme } = useTheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: effectiveTheme === "dark" ? "#121212" : "#ffffff",
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
      <StatusBar style={effectiveTheme === "dark" ? "light" : "dark"} />
    </>
  );
}

export default function RootLayout() {
  useDeviceContext(tw);

  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
