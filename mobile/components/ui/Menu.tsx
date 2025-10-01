import { View, Text, Modal, Pressable, Animated, Easing } from "react-native";
import { useRef, useEffect } from "react";
import Divider from "./Divider";
import tw from "lib/tailwind";

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
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: visible ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!anchor) return null;

  let menuStyle = { left: anchor.x, top: anchor.y };
  let menuTransform: any[] = [];

  switch (position) {
    case "top-left":
      break;
    case "top-right":
      menuStyle.left = anchor.x + anchor.width;
      menuTransform.push({ translateX: -180 });
      break;
    case "bottom-left":
      menuStyle.top = anchor.y + anchor.height;
      break;
    case "bottom-right":
      menuStyle.left = anchor.x + anchor.width;
      menuStyle.top = anchor.y + anchor.height;
      menuTransform.push({ translateX: -180 });
      break;
  }

  const animatedStyle = {
    opacity: animValue,
    transform: [
      ...menuTransform,
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <Pressable style={tw`flex-1`} onPress={onClose}>
        <Animated.View
          style={[
            tw`absolute min-w-[180px] bg-white dark:bg-gray-900 border-neutral-200 dark:border-gray-700 rounded-sm border py-2 shadow-2xl z-50`,
            { elevation: 12 },
            menuStyle,
            animatedStyle,
          ]}
        >
          {items.map((item, idx) => (
            <View key={idx}>
              {idx > 0 && <Divider style={tw`my-0 opacity-30`} />}
              <Pressable
                style={({ pressed }) => [
                  tw`flex-row items-center p-4`,
                  pressed && tw`bg-neutral-100/35 dark:bg-gray-800`,
                ]}
                onPress={() => {
                  onClose();
                  item.onPress();
                }}
              >
                {item.icon && <View style={tw`mr-4`}>{item.icon}</View>}
                <Text
                  style={tw`text-black dark:text-gray-100 text-base font-medium`}
                >
                  {item.text}
                </Text>
              </Pressable>
            </View>
          ))}
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
