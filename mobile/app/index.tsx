import { View, Text, ImageBackground } from "react-native";
import { router } from "expo-router";
import tw from "../lib/tailwind";
import Logo from "../components/Logo";
import { Button } from "../components/ui";
import { ArrowRightIcon } from "../components/icons";

export default function LandingPage() {
  return (
    <ImageBackground
      source={require("../assets/PatternBackground.webp")}
      style={tw`flex-1 justify-end`}
      resizeMode="cover"
    >
      <View
        style={[
          tw`w-full max-w-md bg-neutral-900 pt-12 px-4 rounded-sm`,
          {
            paddingBottom: 64,
          },
        ]}
      >
        <Text style={tw`text-3xl font-bold text-white mb-8 flex`}>
          Welcome to <Logo style="w-24 h-5 text-white" />
        </Text>

        <Button
          text="Get Started"
          onPress={() => router.replace("/login")}
          fullWidth
          icon={<ArrowRightIcon color="white" width={20} height={20} />}
        />
      </View>
    </ImageBackground>
  );
}
