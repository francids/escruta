import React from "react";
import Svg, { Path } from "react-native-svg";

interface SystemIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function SystemIcon({
  width = 24,
  height = 24,
  color = "currentColor",
}: SystemIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 3H22C22.5523 3 23 3.44772 23 4V16C23 16.5523 22.5523 17 22 17H2C1.44772 17 1 16.5523 1 16V4C1 3.44772 1.44772 3 2 3Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 21H16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 17V21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}