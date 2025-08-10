import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { motion, AnimatePresence } from "motion/react";

interface FloatingToolbarProps {
  quillInstance: Quill | null;
}

export default function FloatingToolbar({
  quillInstance,
}: FloatingToolbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quillInstance) return;

    const handleSelectionChange = () => {
      const selection = quillInstance.getSelection();

      if (selection && selection.length > 0 && quillInstance.hasFocus()) {
        const bounds = quillInstance.getBounds(
          selection.index,
          selection.length
        );
        if (bounds) {
          const editorRect = quillInstance.root.getBoundingClientRect();

          let top = editorRect.top + bounds.top - 50;
          let left = editorRect.left + bounds.left + bounds.width / 2;

          const toolbarWidth = 200;
          const windowWidth = window.innerWidth;

          if (left - toolbarWidth / 2 < 10) {
            left = toolbarWidth / 2 + 10;
          } else if (left + toolbarWidth / 2 > windowWidth - 10) {
            left = windowWidth - toolbarWidth / 2 - 10;
          }

          if (top < 10) {
            top = editorRect.top + bounds.top + bounds.height + 10;
          }

          setPosition({ top, left });
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        if (!quillInstance.root.contains(event.target as Node)) {
          setIsVisible(false);
        }
      }
    };

    const handleBlur = () => {
      setTimeout(() => {
        const selection = quillInstance.getSelection();
        if (!selection || selection.length === 0 || !quillInstance.hasFocus()) {
          setIsVisible(false);
        }
      }, 100);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["Escape", "Tab"].includes(event.key)) {
        setIsVisible(false);
      }
    };

    quillInstance.on("selection-change", handleSelectionChange);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    quillInstance.root.addEventListener("blur", handleBlur);

    return () => {
      quillInstance.off("selection-change", handleSelectionChange);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      quillInstance.root.removeEventListener("blur", handleBlur);
    };
  }, [quillInstance]);

  const applyFormat = (format: string) => {
    if (!quillInstance) return;

    const selection = quillInstance.getSelection();
    if (!selection) return;

    const currentFormat = quillInstance.getFormat(selection);

    if (format === "list") {
      const isBullet = currentFormat.list === "bullet";
      const isOrdered = currentFormat.list === "ordered";

      if (!isBullet && !isOrdered) {
        quillInstance.format("list", "bullet");
      } else if (isBullet) {
        quillInstance.format("list", "ordered");
      } else {
        quillInstance.format("list", false);
      }
    } else if (format === "code-block") {
      quillInstance.format("code-block", !currentFormat["code-block"]);
    } else {
      quillInstance.format(format, !currentFormat[format]);
    }

    setTimeout(() => {
      const newSelection = quillInstance.getSelection();
      if (!newSelection || newSelection.length === 0) {
        setIsVisible(false);
      }
    }, 50);
  };

  const getFormatState = (format: string) => {
    if (!quillInstance) return false;

    const selection = quillInstance.getSelection();
    if (!selection || selection.length === 0) return false;

    const currentFormat = quillInstance.getFormat(selection);

    if (format === "list") {
      return (
        currentFormat.list === "bullet" || currentFormat.list === "ordered"
      );
    }

    return !!currentFormat[format];
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={toolbarRef}
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="fixed z-50 flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xs py-1 px-2 -translate-x-1/2"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <button
            onClick={() => applyFormat("bold")}
            className={`p-2 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              getFormatState("bold")
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            title="Bold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
            </svg>
          </button>

          <button
            onClick={() => applyFormat("italic")}
            className={`p-2 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              getFormatState("italic")
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            title="Italic"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
            </svg>
          </button>

          <button
            onClick={() => applyFormat("underline")}
            className={`p-2 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              getFormatState("underline")
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            title="Underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
            </svg>
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          <button
            onClick={() => applyFormat("list")}
            className={`p-2 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              getFormatState("list")
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            title="List"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
            </svg>
          </button>

          <button
            onClick={() => applyFormat("code-block")}
            className={`p-2 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              getFormatState("code-block")
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            title="Code Block"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
