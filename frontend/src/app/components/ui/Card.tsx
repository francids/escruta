import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

interface ControlledProps extends BaseProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

interface UncontrolledProps extends BaseProps {
  isExpanded?: undefined;
  setIsExpanded?: undefined;
}

export default function Card({
  children,
  className,
  isExpanded,
  setIsExpanded,
}: ControlledProps | UncontrolledProps) {
  const baseClasses = cn(
    "bg-gray-50 dark:bg-gray-800/80 p-4 rounded-xs border border-gray-200 dark:border-gray-600",
    className
  );

  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isExpanded]);

  return (
    <AnimatePresence>
      {isExpanded ? (
        <motion.div
          key="card-expanded"
          className="fixed inset-0 z-50 px-8 py-6 bg-black/75 dark:bg-black/50"
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.div
            className="h-full w-full dark:bg-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <motion.div
              className={baseClasses}
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.14 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="card-regular"
          className={baseClasses}
          initial={{ opacity: 0, y: 6, scale: 0.998 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.998 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
