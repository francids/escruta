import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#121212",
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
      <StatusBar style="light" />
    </>
  );
}
