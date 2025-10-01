import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Button, Divider, TextField } from "components/ui";
import tw from "lib/tailwind";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard } from "hooks";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const scrollViewRef = useRef<ScrollView>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("(app)");
  };

  const handleFieldFocus = (fieldIndex: number) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: fieldIndex * 80,
        animated: true,
      });
    }, 100);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[
        tw`w-full h-full max-w-md bg-white dark:bg-gray-900 pt-12 px-4 rounded-sm`,
        {
          paddingTop: insets.top + 32,
        },
      ]}
      contentContainerStyle={{
        paddingBottom: isKeyboardVisible
          ? keyboardHeight + 128
          : insets.bottom + 64,
        minHeight: "100%",
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={tw`text-3xl font-bold text-black dark:text-white mb-8`}>
        Login
      </Text>

      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        style={tw`mb-5`}
        onFocus={() => handleFieldFocus(0)}
      />

      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={tw`mb-5`}
        onFocus={() => handleFieldFocus(1)}
      />

      <Button text="Login" onPress={handleLogin} fullWidth />

      <Divider />

      <View style={tw`flex-row justify-center items-center w-full`}>
        <Text style={tw`text-gray-600 dark:text-gray-400 text-base`}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={tw`text-blue-500 text-base`}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
