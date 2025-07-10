import { Button, Divider, TextField } from "components/ui";
import { router } from "expo-router";
import { useKeyboard } from "hooks/useKeyboard";
import tw from "lib/tailwind";
import { useState, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RegisterPage() {
  const insets = useSafeAreaInsets();
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const scrollViewRef = useRef<ScrollView>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    router.back();
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
        tw`w-full h-full max-w-md bg-neutral-900 pt-12 px-4 rounded-sm`,
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
      <Text style={tw`text-3xl font-bold text-white mb-8`}>Register</Text>

      <TextField
        label="Full Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoComplete="name"
        autoCorrect={false}
        style={tw`mb-5`}
        onFocus={() => handleFieldFocus(0)}
      />

      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        style={tw`mb-5`}
        onFocus={() => handleFieldFocus(1)}
      />

      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={tw`mb-5`}
        onFocus={() => handleFieldFocus(2)}
      />

      <TextField
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        style={tw`mb-5`}
        onFocus={() => handleFieldFocus(3)}
      />

      <Button text="Register" onPress={handleRegister} fullWidth />

      <Divider />

      <View style={tw`flex-row justify-center items-center w-full`}>
        <Text style={tw`text-gray-400 text-base`}>
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={tw`text-blue-500 text-base`}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
