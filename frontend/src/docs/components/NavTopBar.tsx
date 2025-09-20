import { Link } from "react-router";
import { useContext } from "react";
import { DocsContext } from "@/contexts";
import Logotype from "@/shared/Logotype";
import { repoUrl } from "@/config";

export default function NavTopBar() {
  const context = useContext(DocsContext);
  if (!context) throw new Error("DocsContext not found");
  const { setSidebarOpen } = context;

  return (
    <nav className="px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open sidebar"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link to="/" className="flex items-center group">
          <Logotype className="md:mx-3.5 h-3.5 w-auto fill-gray-700 dark:fill-gray-200 group-hover:fill-blue-600 dark:group-hover:fill-blue-300 transition-all duration-300" />
        </Link>
        <Link
          to="/docs"
          className="hidden md:flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 group relative border border-gray-100 dark:border-gray-700 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
        >
          Docs
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 group relative border border-gray-100 dark:border-gray-700 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
        >
          <svg
            className="size-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path>
          </svg>
          Star
        </Link>
      </div>
    </nav>
  );
}
