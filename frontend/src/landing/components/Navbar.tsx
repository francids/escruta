import { Link } from "react-router";
import Logo from "../../shared/Logo";
import { useAuth } from "../../hooks/useAuth";
import { useScroll } from "../../hooks/useScroll";
import { motion, AnimatePresence } from "motion/react";
import { justLanding, repoUrl } from "../../config";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const isScrolled = useScroll(50);
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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
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
          isScrolled
            ? "bg-gray-900/95 border-gray-700 outline outline-blue-400/30"
            : "bg-gray-900/80 outline outline-blue-400/60"
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
            className="md:hidden relative"
          >
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-xs bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                isScrolled ? "p-1.5" : "p-2"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.svg
                className={isScrolled ? "w-4 h-4" : "w-5 h-5"}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
                  className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 border border-gray-700 rounded-xs backdrop-blur-lg overflow-hidden"
                >
                  <div className="py-2">
                    <Link
                      to="/about"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors border-b border-gray-800/50"
                    >
                      About
                    </Link>
                    <Link
                      to="/blog"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors border-b border-gray-800/50"
                    >
                      Blog
                    </Link>
                    <Link
                      to="/pricing"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors border-b border-gray-800/50"
                    >
                      Pricing
                    </Link>
                    <Link
                      to={justLanding ? repoUrl : "/app"}
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors mx-2 my-2 rounded-xs text-center"
                    >
                      {isAuthenticated() ? "Go to app" : "Get started"}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}
