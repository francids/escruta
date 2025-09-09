import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useLayoutEffect } from "react";
import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";

interface UseModalResult {
  isAnyModalOpen: boolean;
}
const useModal = (): UseModalResult => ({ isAnyModalOpen: false });

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
  className?: string;
}

export default function Tooltip({
  children,
  text,
  position = "top",
  disabled = false,
  className = "",
}: TooltipProps) {
  const { isAnyModalOpen } = useModal();
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isVisible && triggerRef.current) {
      const updatePosition = () => {
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        let x = 0;
        let y = 0;

        switch (position) {
          case "top":
            x = rect.left + rect.width / 2;
            y = rect.top - 8;
            break;
          case "bottom":
            x = rect.left + rect.width / 2;
            y = rect.bottom + 8;
            break;
          case "left":
            x = rect.left - 8;
            y = rect.top + rect.height / 2;
            break;
          case "right":
            x = rect.right + 8;
            y = rect.top + rect.height / 2;
            break;
        }

        setCoords({ x, y });
      };

      updatePosition();

      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isVisible, position]);

  if (isAnyModalOpen || disabled) {
    return <>{children}</>;
  }

  const getTransformProps = () => {
    switch (position) {
      case "top":
        return { translateX: "-50%", translateY: "-100%" };
      case "bottom":
        return { translateX: "-50%", translateY: "0%" };
      case "left":
        return { translateX: "-100%", translateY: "-50%" };
      case "right":
        return { translateX: "0%", translateY: "-50%" };
      default:
        return { translateX: "-50%", translateY: "-100%" };
    }
  };

  const transformProps = getTransformProps();

  return (
    <>
      <div
        ref={triggerRef}
        className={twMerge("relative", className)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, scale: 0.9, ...transformProps }}
              animate={{ opacity: 1, scale: 1, ...transformProps }}
              exit={{ opacity: 0, scale: 0.9, ...transformProps }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                position: "fixed",
                left: coords.x,
                top: coords.y,
                zIndex: 99999,
              }}
              className="select-text whitespace-nowrap rounded-xs bg-black/95 dark:bg-white/95 py-1.5 px-3 text-center text-sm font-medium text-white dark:text-black pointer-events-none"
            >
              {text}
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
