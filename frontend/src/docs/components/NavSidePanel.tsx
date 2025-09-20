import { Link, useLocation } from "react-router";
import { useContext } from "react";
import { DocsContext } from "@/contexts";

interface NavItem {
  title: string;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Get started",
    items: [{ title: "Welcome", path: "/docs" }],
  },
  {
    title: "Features",
    items: [
      { title: "Notebooks", path: "/docs/features/notebooks" },
      { title: "Notes", path: "/docs/features/notes" },
      { title: "Sources", path: "/docs/features/sources" },
      { title: "Audio Summary", path: "/docs/features/audio-summary" },
      { title: "Mind Map", path: "/docs/features/mind-map" },
      { title: "Study Guide", path: "/docs/features/study-guide" },
      { title: "Flashcards", path: "/docs/features/flashcards" },
    ],
  },
];

export default function NavSidePanel() {
  const location = useLocation();
  const context = useContext(DocsContext);
  if (!context) throw new Error("DocsContext not found");
  const { sidebarOpen, setSidebarOpen } = context;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-60 min-w-60 max-w-60 bg-gray-50 dark:bg-gray-800/60 border-r border-gray-100 dark:border-gray-700 overflow-auto">
        <nav className="p-4">
          <ul className="space-y-6">
            {navSections.map((section) => (
              <li key={section.title}>
                <h3 className="px-3 py-2 text-sm font-bold text-gray-600/60 dark:text-gray-200/60">
                  {section.title}
                </h3>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`block px-3 py-1 rounded-xs text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100/30 dark:hover:bg-gray-800/60 ${
                          location.pathname === item.path
                            ? "bg-gray-100/60 dark:bg-gray-800 font-semibold text-gray-700 dark:text-white"
                            : ""
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="md:hidden fixed inset-y-0 left-0 z-50 w-52 bg-gray-50 dark:bg-gray-800/60 border-r border-gray-100 dark:border-gray-700 overflow-auto">
            <div className="flex items-center justify-end p-3 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close sidebar"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                </svg>
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-6">
                {navSections.map((section) => (
                  <li key={section.title}>
                    <h3 className="px-3 py-2 text-sm font-bold text-gray-600/60 dark:text-gray-200/60">
                      {section.title}
                    </h3>
                    <ul className="space-y-0.5">
                      {section.items.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`block px-3 py-1 rounded-xs text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100/30 dark:hover:bg-gray-800/60 ${
                              location.pathname === item.path
                                ? "bg-gray-100/60 dark:bg-gray-800 font-semibold text-gray-700 dark:text-white"
                                : ""
                            }`}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
