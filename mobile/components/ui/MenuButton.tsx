import { useRef, useState } from "react";
import { View } from "react-native";
import Menu, { type MenuItem, type MenuPosition } from "./Menu";

interface MenuButtonProps {
  menuItems: MenuItem[];
  position: MenuPosition;
  button: ({ onPress }: { onPress: () => void }) => React.ReactNode;
}

export default function MenuButton({
  menuItems,
  position = "bottom-right",
  button,
}: MenuButtonProps) {
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const btnRef = useRef<View>(null);

  const openMenu = () => {
    if (btnRef.current) {
      btnRef.current.measureInWindow((x, y, width, height) => {
        setAnchor({ x, y, width, height });
        setVisible(true);
      });
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <View ref={btnRef} collapsable={false}>
        {button({ onPress: openMenu })}
      </View>
      <Menu
        visible={visible}
        onClose={() => setVisible(false)}
        items={menuItems}
        position={position}
        anchor={anchor}
      />
    </>
  );
}
