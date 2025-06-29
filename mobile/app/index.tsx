import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "twrnc";
import { Button } from "../components/ui";

export default function HomePage() {
  return (
    <View style={tw`flex-1 bg-neutral-950 items-center justify-center p-4`}>
      <Text style={tw`text-white mb-4`}>Welcome to Escruta</Text>
      <Button
        text="Click Me"
        onPress={() => alert("Button clicked!")}
        fullWidth
      />
      <StatusBar style="auto" />
    </View>
  );
}
