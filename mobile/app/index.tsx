import { View, Text, ImageBackground } from "react-native";
import { router } from "expo-router";
import tw from "lib/tailwind";
import Logo from "components/Logo";
import { Button } from "components/ui";
import { ArrowRightIcon } from "components/icons";
import { useTheme } from "hooks";

export default function LandingScreen() {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  return (
    <ImageBackground
      source={
        isDark
          ? require("../assets/DarkPatternBackground.png")
          : require("../assets/LightPatternBackground.png")
      }
      style={tw`flex-1 justify-end`}
      resizeMode="stretch"
    >
      <View
        style={[
          tw`w-full max-w-md bg-white dark:bg-gray-900 pt-12 px-4 rounded-sm`,
          {
            paddingBottom: 64,
          },
        ]}
      >
        <Text
          style={tw`text-3xl font-bold text-black dark:text-white mb-8 flex`}
        >
          Welcome to <Logo style="w-24 h-5 text-black dark:text-white" />
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
