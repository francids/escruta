import Svg, { Path } from "react-native-svg";

interface DotsVerticalIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function DotsVerticalIcon({
  width = 24,
  height = 24,
  color = "currentColor",
}: DotsVerticalIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM12 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </Svg>
  );
}
