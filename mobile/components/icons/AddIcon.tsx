import Svg, { Path } from "react-native-svg";

interface AddIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function AddIcon({
  width = 24,
  height = 24,
  color = "white",
}: AddIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
      <Path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></Path>
    </Svg>
  );
}
