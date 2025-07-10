import Svg, { Path } from "react-native-svg";

interface BackIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function BackIcon({
  width = 24,
  height = 24,
  color = "white",
}: BackIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
      <Path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></Path>
    </Svg>
  );
}
