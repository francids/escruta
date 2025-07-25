import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import tw from "lib/tailwind";
import { useDeviceContext } from "twrnc";

export default function RootLayout() {
  useDeviceContext(tw);

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
