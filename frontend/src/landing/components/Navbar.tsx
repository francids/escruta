import { Link } from "react-router";
import Logo from "../../shared/Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-24 right-24 z-50 bg-white dark:bg-gray-900 border rounded-xs border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <Logo className="h-3.5 w-auto fill-gray-900 dark:fill-white" />
      </Link>
      <div className="hidden md:flex space-x-4">
        <Link
          to="/app"
          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors select-none"
        >
          App
        </Link>
        <Link
          to="/about"
          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors select-none"
        >
          About
        </Link>
      </div>
    </nav>
  );
}
