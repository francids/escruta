import { useEffect, useRef } from "react";
import hljs from "highlight.js";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
}

export default function CodeBlock({
  children,
  className,
  inline,
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && !inline) {
      hljs.highlightElement(codeRef.current);
    }
  }, [children, inline]);

  if (inline) {
    return (
      <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded-xs text-sm font-mono">
        {children}
      </code>
    );
  }

  return (
    <code
      ref={codeRef}
      className={`block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xs p-6 overflow-x-auto font-mono text-sm leading-relaxed whitespace-pre ${
        className || ""
      }`}
    >
      {children}
    </code>
  );
}
