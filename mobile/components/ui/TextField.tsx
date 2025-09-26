import { View, Text, TextInput, TextInputProps } from "react-native";
import tw, { themed } from "../../lib/tailwind";
import useTheme from "../../hooks/useTheme";

type TextFieldProps = {
  id?: string;
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  onKeyPress?: (e: any) => void;
  style?: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  autoFocus?: boolean;
} & Omit<TextInputProps, "value" | "onChangeText" | "style">;

export default function TextField({
  id,
  label,
  value,
  onChangeText,
  onKeyPress,
  style,
  placeholder,
  secureTextEntry = false,
  editable = true,
  autoFocus = false,
  ...rest
}: TextFieldProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  return (
    <View style={[tw`w-full`, style]}>
      {label && (
        <Text style={tw`${themed("text-neutral-700", "text-gray-300", isDark)} mb-2 text-lg`}>
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        style={tw`w-full ${themed(
          "text-black bg-white border-neutral-300",
          "text-neutral-200 bg-neutral-800 border-gray-600",
          isDark
        )} text-lg p-3 border font-sans rounded-sm focus:outline-none focus:ring focus:ring-blue-400`}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        editable={editable}
        numberOfLines={1}
        autoFocus={autoFocus}
        placeholderTextColor={isDark ? tw.color("text-gray-400") : tw.color("text-neutral-500")}
        selectionColor={tw.color("text-blue-400")}
        {...rest}
      />
    </View>
  );
}
