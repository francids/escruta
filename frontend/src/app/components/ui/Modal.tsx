import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import IconButton from "./IconButton";
import { CloseIcon } from "../icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  width = "md",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const widthClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-xl",
    xl: "max-w-2xl",
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/75 dark:bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              className={`${widthClasses[width]} w-full bg-white dark:bg-gray-800 rounded-xs border border-gray-200 dark:border-gray-600 shadow-lg pointer-events-auto`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 400,
              }}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
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
              </div>

              <div className="p-6">{children}</div>

              {actions && (
                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-600">
                  {actions}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
