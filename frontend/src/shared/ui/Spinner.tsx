import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LoadingIcon } from "@/shared/icons";

type SpinnerProps = {
  size?: number;
  className?: string;
  "aria-label"?: string;
};

export default function Spinner({
  size = 24,
  className = "",
  "aria-label": ariaLabel = "Loading",
}: SpinnerProps) {
  return (
    <motion.div
      className={cn("inline-flex items-center justify-center", className)}
      aria-label={ariaLabel}
      role="status"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "linear",
      }}
      style={{ width: size, height: size }}
    >
      <LoadingIcon />
    </motion.div>
  );
}
