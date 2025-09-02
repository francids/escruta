import { motion, AnimatePresence } from "motion/react";
import { useModal } from "@/hooks";
import { useState } from "react";

export default function Tooltip({
  children,
  text,
  position = "top",
}: {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}) {
  const { isAnyModalOpen } = useModal();
  const [isVisible, setIsVisible] = useState(false);

  if (isAnyModalOpen) {
    return <>{children}</>;
  }

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            className={`absolute ${positionClasses[position]} select-text whitespace-normal break-words rounded-xs bg-black dark:bg-white py-1.5 px-3 text-center text-sm text-white dark:text-black z-30`}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
