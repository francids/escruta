import { useEffect, useRef } from "react";
import Quill from "quill";
import FloatingToolbar from "./FloatingToolbar";
import "./Editor.css";

interface EditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function Editor({
  initialContent = "",
  onContentChange,
  placeholder,
  autoFocus,
}: EditorProps) {
  const editorRef = useRef(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        placeholder: placeholder || "Start writing...",
        modules: {
          toolbar: false,
        },
        formats: ["bold", "italic", "underline", "list", "code-block"],
      });

      if (onContentChange) {
        quillInstance.current.on("text-change", () => {
          const content = quillInstance.current?.root.innerHTML || "";
          onContentChange(content);
        });
      }

      if (autoFocus) {
        quillInstance.current.focus();
      }
    }
  }, [onContentChange, placeholder, autoFocus]);

  useEffect(() => {
    if (quillInstance.current) {
      const currentContent = quillInstance.current.root.innerHTML;
      if (currentContent !== initialContent) {
        quillInstance.current.root.innerHTML = initialContent || "";
      }
    }
  }, [initialContent]);

  return (
    <>
      <div className="h-auto min-h-[80%] w-full pb-4 resize-none border-none outline-none bg-transparent text-gray-700 dark:text-gray-300 overflow-hidden">
        <div ref={editorRef}></div>
      </div>
      <FloatingToolbar quillInstance={quillInstance.current} />
    </>
  );
}
