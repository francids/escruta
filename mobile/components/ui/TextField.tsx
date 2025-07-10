import { View, Text, TextInput, TextInputProps } from "react-native";
import tw from "../../lib/tailwind";

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
  return (
    <View style={[tw`w-full`, style]}>
      {label && <Text style={tw`text-gray-300 mb-2 text-lg`}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        style={tw`w-full text-neutral-200 text-lg p-3 border font-sans border-gray-600 rounded-sm focus:outline-none focus:ring focus:ring-blue-400`}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        editable={editable}
        numberOfLines={1}
        autoFocus={autoFocus}
        placeholderTextColor={tw.color("text-gray-400")}
        selectionColor={tw.color("text-blue-400")}
        {...rest}
      />
    </View>
  );
}
