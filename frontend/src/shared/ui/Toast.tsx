import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import IconButton from "./IconButton";
import { CloseIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  icon?: React.ReactNode;
};

export default function Toast({
  message,
  type = "info",
  isVisible,
  onClose,
  duration = 5000,
  position = "bottom-right",
  icon,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn("fixed z-50 max-w-sm w-full px-4", {
            "top-8 right-8": position === "top-right",
            "top-8 left-8": position === "top-left",
            "bottom-8 right-8": position === "bottom-right",
            "bottom-8 left-8": position === "bottom-left",
            "top-8 left-1/2 -translate-x-1/2": position === "top-center",
            "bottom-8 left-1/2 -translate-x-1/2": position === "bottom-center",
          })}
        >
          <div
            className={cn(
              "flex items-center justify-between p-4 rounded-xs border shadow-md",
              {
                "bg-green-50 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-600 dark:text-green-200":
                  type === "success",
                "bg-red-50 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-600 dark:text-red-200":
                  type === "error",
                "bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200":
                  type === "warning",
                "bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200":
                  type === "info",
              }
            )}
            role="alert"
          >
            <div className="flex items-center">
              {icon && <span className="mr-3">{icon}</span>}
              <p className="text-sm font-medium">{message}</p>
            </div>
            <IconButton
              icon={<CloseIcon />}
              onClick={onClose}
              variant="ghost"
              size="xs"
              ariaLabel="Close toast"
              className="ml-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
