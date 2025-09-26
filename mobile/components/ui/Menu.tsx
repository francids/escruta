import { View, Text, Modal, Pressable } from "react-native";
import Divider from "./Divider";
import tw, { themed } from "lib/tailwind";
import useTheme from "../../hooks/useTheme";

export interface MenuItem {
  text: string;
  onPress: () => void;
  icon?: React.ReactNode;
}

export type MenuPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface MenuProps {
  items: MenuItem[];
  position?: MenuPosition;
  visible: boolean;
  onClose: () => void;
  anchor: { x: number; y: number; width: number; height: number } | null;
}

export default function Menu({
  items,
  position = "bottom-right",
  visible,
  onClose,
  anchor,
}: MenuProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";

  if (!anchor) return null;

  let menuPosition = {};

  switch (position) {
    case "top-left":
      menuPosition = { position: "absolute", left: anchor.x, top: anchor.y };
      break;
    case "top-right":
      menuPosition = {
        position: "absolute",
        left: anchor.x + anchor.width,
        top: anchor.y,
        transform: [{ translateX: -180 }],
      };
      break;
    case "bottom-left":
      menuPosition = {
        position: "absolute",
        left: anchor.x,
        top: anchor.y + anchor.height,
      };
      break;
    case "bottom-right":
      menuPosition = {
        position: "absolute",
        left: anchor.x + anchor.width,
        top: anchor.y + anchor.height,
        transform: [{ translateX: -180 }],
      };
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={tw`flex-1`} onPress={onClose}>
        <View
          style={[
            tw`absolute min-w-[180px] ${themed(
              "bg-white border-neutral-200",
              "bg-gray-900 border-gray-700",
              isDark
            )} rounded-sm border py-2 shadow-2xl z-50`,
            { elevation: 12 },
            menuPosition,
          ]}
        >
          {items.map((item, idx) => (
            <View key={idx}>
              {idx > 0 && <Divider style={tw`my-0 opacity-30`} />}
              <Pressable
                style={({ pressed }) => [
                  tw`flex-row items-center p-4`,
                  pressed && tw`${themed("bg-neutral-100", "bg-gray-800", isDark)}`,
                ]}
                onPress={() => {
                  onClose();
                  item.onPress();
                }}
              >
                {item.icon && <View style={tw`mr-4`}>{item.icon}</View>}
                <Text style={tw`${themed("text-black", "text-gray-100", isDark)} text-base font-medium`}>
                  {item.text}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}
