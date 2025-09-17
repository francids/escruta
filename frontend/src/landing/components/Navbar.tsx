import { Link, useLocation } from "react-router";
import Logo from "@/shared/Logo";
import { useAuth } from "@/hooks";
import { motion, AnimatePresence } from "motion/react";
import { justLanding, repoUrl } from "@/config";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`px-16 py-4 bg-gray-900/85 border-b rounded-xs flex items-center justify-between backdrop-blur-md transition-all duration-300 ease-out relative z-50 ${
          location.pathname === "/" ? "border-blue-700" : "border-gray-800"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-6"
        >
          <Link to="/" className="flex items-center group">
            <Logo className="w-auto h-12 py-2 fill-white transition-all duration-300 group-hover:fill-blue-400" />
          </Link>
          <div className="hidden lg:flex gap-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                to="/features"
                className="text-sm font-medium rounded-xs bg-gray-900 text-white hover:bg-gray-800 group relative border border-gray-800 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center gap-2 px-4 py-2"
              >
                Features
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                to="/blog"
                className="text-sm font-medium rounded-xs bg-gray-900 text-white hover:bg-gray-800 group relative border border-gray-800 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center gap-2 px-4 py-2"
              >
                Blog
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                to="/pricing"
                className="text-sm font-medium rounded-xs bg-gray-900 text-white hover:bg-gray-800 group relative border border-gray-800 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center gap-2 px-4 py-2"
              >
                Pricing
              </Link>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <div className="hidden lg:flex gap-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link
                to={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium rounded-xs bg-gray-900 text-white hover:bg-gray-800 group relative border border-gray-800 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center gap-2 px-4 py-2"
              >
                <svg
                  className="size-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path>
                </svg>
                Star on GitHub
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                to={justLanding ? repoUrl : "/app"}
                className="text-sm font-medium rounded-xs bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-gray-900 transition-all duration-300 select-none flex items-center px-4 py-2"
              >
                {isAuthenticated() ? "Go to app" : "Get started"}
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="lg:hidden relative"
          >
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xs bg-gray-800/90 text-gray-100 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-gray-900 transition-all duration-300"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                ) : (
                  <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
                )}
              </motion.svg>
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-gray-600 rounded-xs overflow-hidden shadow-lg z-50"
                >
                  <div className="py-1">
                    <Link
                      to="/about"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800/80 active:bg-gray-700 transition-all duration-200 border-b border-gray-700/30"
                    >
                      <svg
                        className="size-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM4 5V19H20V5H4ZM6 7H8V9H6V7ZM8 11H6V13H8V11ZM6 15H8V17H6V15ZM18 7H10V9H18V7ZM10 15H18V17H10V15ZM18 11H10V13H18V11Z"></path>
                      </svg>
                      Features
                    </Link>
                    <Link
                      to="/blog"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800/80 active:bg-gray-700 transition-all duration-200 border-b border-gray-700/30"
                    >
                      <svg
                        className="size-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM4 5V19H20V5H4ZM6 7H12V13H6V7ZM8 9V11H10V9H8ZM14 9H18V7H14V9ZM18 13H14V11H18V13ZM6 15V17L18 17V15L6 15Z"></path>
                      </svg>
                      Blog
                    </Link>
                    <Link
                      to="/pricing"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800/80 active:bg-gray-700 transition-all duration-200 border-b border-gray-700/30"
                    >
                      <svg
                        className="size-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M10.9042 2.10025L20.8037 3.51446L22.2179 13.414L13.0255 22.6063C12.635 22.9969 12.0019 22.9969 11.6113 22.6063L1.71184 12.7069C1.32131 12.3163 1.32131 11.6832 1.71184 11.2926L10.9042 2.10025ZM11.6113 4.22157L3.83316 11.9997L12.3184 20.485L20.0966 12.7069L19.036 5.28223L11.6113 4.22157ZM13.7327 10.5855C12.9516 9.80448 12.9516 8.53815 13.7327 7.7571C14.5137 6.97606 15.78 6.97606 16.5611 7.7571C17.3421 8.53815 17.3421 9.80448 16.5611 10.5855C15.78 11.3666 14.5137 11.3666 13.7327 10.5855Z"></path>
                      </svg>
                      Pricing
                    </Link>
                    <Link
                      to={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800/80 active:bg-gray-700 transition-all duration-200 border-b border-gray-700/30"
                    >
                      <svg
                        className="size-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path>
                      </svg>
                      Star on GitHub
                    </Link>
                    <div className="px-3 py-2">
                      <Link
                        to={justLanding ? repoUrl : "/app"}
                        onClick={closeMobileMenu}
                        className="block w-full px-4 py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 rounded-xs text-center"
                      >
                        {isAuthenticated() ? "Go to app" : "Get started"}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
