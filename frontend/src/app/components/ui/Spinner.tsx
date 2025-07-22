import { motion } from "motion/react";
import RestartIcon from "../icons/RestartIcon";

type SpinnerProps = {
  size?: number;
  className?: string;
  "aria-label"?: string;
};

export default function Spinner({
  size = 24,
  className = "",
  "aria-label": ariaLabel = "Loading...",
}: SpinnerProps) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      aria-label={ariaLabel}
      role="status"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 0.8,
        ease: "linear",
      }}
      style={{ width: size, height: size }}
    >
      <RestartIcon />
    </motion.div>
  );
}
