import { Stack } from "expo-router";
import { View } from "react-native";
import tw from "lib/tailwind";

export default function AppLayout() {
  return (
    <View style={tw`flex-1`}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}
