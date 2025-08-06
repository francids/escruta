import { Link } from "react-router";
import Logo from "../../shared/Logo";
import { useAuth } from "../../hooks/useAuth";
import { useScroll } from "../../hooks/useScroll";
import { motion } from "motion/react";
import { justLanding, repoUrl } from "../../config";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const isScrolled = useScroll(50);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isScrolled ? 0.95 : 1,
        padding: isScrolled ? "12px 24px" : "16px 32px",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-6 left-6 right-6 md:left-20 md:right-20 xl:left-32 xl:right-32 z-50 bg-gray-900/80 border border-gray-800 rounded-xs flex items-center justify-between backdrop-blur-lg transition-all duration-300 ease-out ${
        isScrolled ? "bg-gray-900/95 border-gray-700" : "bg-gray-900/80"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        <Link to="/" className="flex items-center group">
          <Logo
            className={`w-auto fill-white transition-all duration-300 group-hover:fill-blue-400 ${
              isScrolled ? "h-3" : "h-4"
            }`}
          />
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
              className={`text-sm font-medium rounded-xs bg-gray-900/80 text-white hover:bg-gray-800 group relative border border-gray-800 transition-all duration-300 select-none focus:outline-none ${
                isScrolled ? "px-3 py-1.5" : "px-4 py-2"
              }`}
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
              to="/blog"
              className={`text-sm font-medium rounded-xs bg-gray-900/80 text-white hover:bg-gray-800 group relative border border-gray-800 transition-all duration-300 select-none focus:outline-none ${
                isScrolled ? "px-3 py-1.5" : "px-4 py-2"
              }`}
            >
              Blog
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <Link
              to="/pricing"
              className={`text-sm font-medium rounded-xs bg-gray-900/80 text-white hover:bg-gray-800 group relative border border-gray-800 transition-all duration-300 select-none focus:outline-none ${
                isScrolled ? "px-3 py-1.5" : "px-4 py-2"
              }`}
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
              to={justLanding ? repoUrl : "/app"}
              className={`text-sm font-medium rounded-xs bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300 select-none ${
                isScrolled ? "px-3 py-1.5" : "px-4 py-2"
              }`}
            >
              {isAuthenticated() ? "Go to app" : "Get started"}
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
            className="p-2 rounded-xs bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 transition-colors"
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
