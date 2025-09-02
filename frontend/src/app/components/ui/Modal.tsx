import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import IconButton from "./IconButton";
import { CloseIcon } from "../icons";
import { useModal } from "@/hooks";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
  closeOnOutsideClick?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  width = "md",
  closeOnOutsideClick = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { openModal, closeModal, getModalZIndex, isTopModal, modalCount } =
    useModal();
  const modalId = useRef<string>(`modal-${Date.now()}-${Math.random()}`);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      openModal(modalId.current);
    }

    return () => {
      if (isOpen) {
        document.body.style.overflow = "";
        // eslint-disable-next-line react-hooks/exhaustive-deps
        closeModal(modalId.current);
      }
    };
  }, [isOpen, openModal, closeModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && isTopModal(modalId.current)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, isTopModal]);

  const widthClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-xl",
    xl: "max-w-2xl",
  };

  const modalZIndex = getModalZIndex(modalId.current);
  const shouldShowOverlay = isTopModal(modalId.current);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/75 dark:bg-black/50"
            style={{ zIndex: modalZIndex - 1 }}
            initial={{ opacity: modalCount > 1 ? 1 : 0 }}
            animate={{ opacity: shouldShowOverlay ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldShowOverlay ? 0.15 : 0.1,
              ease: "easeInOut",
            }}
            onClick={
              shouldShowOverlay && closeOnOutsideClick ? onClose : undefined
            }
            aria-hidden="true"
          />

          <div
            className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
            style={{ zIndex: modalZIndex }}
          >
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
                <div className="flex items-center justify-between gap-4">
                  <h2
                    id="modal-title"
                    className="text-xl font-medium text-gray-900 dark:text-white flex-1 min-w-0 line-clamp-3"
                  >
                    {title}
                  </h2>
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    ariaLabel="Close modal"
                    className="flex-shrink-0"
                  />
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">{children}</div>

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
