import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import IconButton from "./IconButton";
import { CloseIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  width = "md",
  closeOnOutsideClick = true,
  closeOnEscape = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 bg-black/80 z-[99]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeOnOutsideClick ? onClose : undefined}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 z-[100] pointer-events-none">
        <motion.div
          className={cn(
            "w-full bg-white dark:bg-gray-800 rounded-xs border border-gray-200 dark:border-gray-600 pointer-events-auto",
            {
              "max-w-md": width === "sm",
              "max-w-lg": width === "md",
              "max-w-xl": width === "lg",
              "max-w-2xl": width === "xl",
            }
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between gap-4 p-6 border-b border-gray-200 dark:border-gray-600">
            <h2
              id="modal-title"
              className="text-xl font-medium text-gray-900 dark:text-white"
            >
              {title}
            </h2>
            <IconButton
              icon={<CloseIcon />}
              onClick={onClose}
              variant="ghost"
              size="sm"
              ariaLabel="Close modal"
            />
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">{children}</div>

          {actions && (
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-600">
              {actions}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
