import { Link } from "react-router";
import Logo from "@/shared/Logo";
import { useAuth } from "@/hooks";
import { motion, AnimatePresence } from "motion/react";
import { justLanding, repoUrl } from "@/config";
import { useState, useEffect } from "react";

interface NavbarOption {
  name: string;
  href: string;
  icon: (className: string) => React.ReactNode;
}

export default function Navbar() {
  const navbarOptions: NavbarOption[] = [
    {
      name: "Docs",
      href: "/docs",
      icon: (className) => (
        <svg
          className={className}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"></path>
        </svg>
      ),
    },
  ];

  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        className="px-16 py-4 bg-gray-900/85 border-b border-blue-700 rounded-xs flex items-center justify-between backdrop-blur-md transition-all duration-300 ease-out relative z-50"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-6"
        >
          <Link to="/" className="flex items-center group">
            <Logo className="size-12 py-2 fill-white transition-all duration-300 group-hover:fill-blue-400" />
          </Link>
          <div className="hidden lg:flex gap-2">
            {navbarOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Link
                  to={option.href}
                  className="text-sm font-medium rounded-xs bg-gray-900 text-white hover:bg-gray-800 group relative border border-gray-800 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center gap-2 px-4 py-2"
                >
                  {option.name}
                </Link>
              </motion.div>
            ))}
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
                  className="size-3 flex-shrink-0"
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
                className="text-sm font-semibold rounded-xs bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-gray-900 transition-all duration-300 select-none flex items-center px-4 py-2"
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
                    {navbarOptions.map((option) => (
                      <Link
                        key={option.name}
                        to={option.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800/80 active:bg-gray-700 transition-all duration-200 border-b border-gray-700/30"
                      >
                        {option.icon("size-4 flex-shrink-0")}
                        {option.name}
                      </Link>
                    ))}
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
                        className="block w-full px-4 py-3 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 rounded-xs text-center"
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
