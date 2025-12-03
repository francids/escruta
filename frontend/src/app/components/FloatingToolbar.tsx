import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  FormatListBulletedIcon,
  CodeIcon,
} from "@/shared/icons";

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
            className={cn(
              "p-2 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
              {
                "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400":
                  getFormatState("bold"),
                "text-gray-600 dark:text-gray-400": !getFormatState("bold"),
              }
            )}
            title="Bold"
          >
            <BoldIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => applyFormat("italic")}
            className={cn(
              "p-2 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
              {
                "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400":
                  getFormatState("italic"),
                "text-gray-600 dark:text-gray-400": !getFormatState("italic"),
              }
            )}
            title="Italic"
          >
            <ItalicIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => applyFormat("underline")}
            className={cn(
              "p-2 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
              {
                "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400":
                  getFormatState("underline"),
                "text-gray-600 dark:text-gray-400":
                  !getFormatState("underline"),
              }
            )}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          <button
            onClick={() => applyFormat("list")}
            className={cn(
              "p-2 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
              {
                "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400":
                  getFormatState("list"),
                "text-gray-600 dark:text-gray-400": !getFormatState("list"),
              }
            )}
            title="List"
          >
            <FormatListBulletedIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => applyFormat("code-block")}
            className={cn(
              "p-2 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
              {
                "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400":
                  getFormatState("code-block"),
                "text-gray-600 dark:text-gray-400":
                  !getFormatState("code-block"),
              }
            )}
            title="Code Block"
          >
            <CodeIcon className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
