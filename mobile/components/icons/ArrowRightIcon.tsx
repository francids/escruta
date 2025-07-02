import Svg, { Path } from "react-native-svg";

interface ArrowRightIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function ArrowRightIcon({
  width = 24,
  height = 24,
  color = "white",
}: ArrowRightIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
      <Path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></Path>
    </Svg>
  );
}
