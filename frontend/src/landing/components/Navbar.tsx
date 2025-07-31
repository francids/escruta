import { Link } from "react-router";
import Logo from "../../shared/Logo";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "motion/react";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-6 left-6 right-6 md:left-20 md:right-20 xl:left-32 xl:right-32 z-50 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-xs px-8 py-4 flex items-center justify-between shadow-lg backdrop-blur-lg"
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        <Link to="/" className="flex items-center group">
          <Logo className="h-4 w-auto fill-gray-900 dark:fill-white transition-colors group-hover:fill-blue-600 dark:group-hover:fill-blue-400" />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="flex items-center gap-2"
      >
        <div className="hidden md:flex gap-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              to="/about"
              className="px-4 py-2 text-sm font-medium rounded-xs bg-white/80 text-gray-900 hover:bg-blue-100 focus:ring-blue-400 dark:bg-gray-900/80 dark:text-white dark:hover:bg-blue-950 group relative border border-gray-200 dark:border-gray-800 transition-colors select-none shadow focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              About
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to="/pricing"
              className="px-4 py-2 text-sm font-medium rounded-xs bg-white/80 text-gray-900 hover:bg-blue-100 focus:ring-blue-400 dark:bg-gray-900/80 dark:text-white dark:hover:bg-blue-950 group relative border border-gray-200 dark:border-gray-800 transition-colors select-none shadow focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Pricing
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link
              to="/app"
              className="px-4 py-2 text-sm font-medium rounded-xs bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors select-none border border-transparent shadow"
            >
              {isAuthenticated() ? "Webapp" : "Get started"}
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="md:hidden"
        >
          <button
            className="p-2 rounded-xs bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Open menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
