import { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Divider, TextField } from "../components/ui";
import tw from "../lib/tailwind";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginPage() {
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("(app)");
  };

  return (
    <ImageBackground
      source={require("../assets/PatternBackground.webp")}
      style={tw`flex-1 justify-end`}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "flex-end" }}
        keyboardVerticalOffset={64}
      >
        <View
          style={[
            tw`w-full max-w-md bg-neutral-900 pt-12 px-4 rounded-sm`,
            {
              paddingBottom: insets.bottom + 64,
            },
          ]}
        >
          <Text style={tw`text-3xl font-bold text-white mb-8`}>Login</Text>

          <TextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={tw`mb-5`}
          />

          <TextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={tw`mb-5`}
          />

          <Button text="Login" onPress={handleLogin} fullWidth />

          <Divider />

          <View style={tw`flex-row justify-center items-center w-full`}>
            <Text style={tw`text-gray-400 text-base`}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={tw`text-blue-500 text-base`}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
