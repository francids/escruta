import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import IconButton from "./IconButton";
import { CloseIcon } from "../icons";

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

  const typeStyles = {
    success:
      "bg-green-50 border-green-500 text-green-800 dark:bg-green-900/60 dark:border-green-600 dark:text-green-200",
    error:
      "bg-red-50 border-red-500 text-red-800 dark:bg-red-900/60 dark:border-red-600 dark:text-red-200",
    warning:
      "bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-900/60 dark:border-yellow-600 dark:text-yellow-200",
    info: "bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/60 dark:border-blue-600 dark:text-blue-200",
  };

  const positionClasses = {
    "top-right": "top-8 right-8",
    "top-left": "top-8 left-8",
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "top-center": "top-8 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-8 left-1/2 -translate-x-1/2",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`fixed z-50 ${positionClasses[position]} max-w-sm w-full px-4`}
        >
          <div
            className={`flex items-center justify-between p-4 rounded-xs border shadow-md ${typeStyles[type]}`}
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
