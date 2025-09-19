import { DocsContext } from "@/contexts";
import { useState } from "react";
import { Outlet } from "react-router";

export default function DocsLayout() {
  const [title, setTitle] = useState("");

  return (
    <DocsContext.Provider value={{ title, setTitle }}>
      <div className="flex h-screen select-none">
        <article className="flex-grow overflow-hidden docs-prose docs-prose-invert max-w-none">
          <div className="h-full mx-8 md:mx-16 lg:mx-32 overflow-auto py-8 select-text">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xs text-sm font-semibold bg-blue-900 text-blue-200 border border-blue-700 select-none">
              <svg
                className="size-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"></path>
              </svg>
              {title}
            </span>
            <Outlet />
          </div>
        </article>
      </div>
    </DocsContext.Provider>
  );
}
