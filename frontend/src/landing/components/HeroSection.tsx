import { Link } from "react-router";
import { motion } from "motion/react";
import Logo from "../../shared/Logo";
import { useAuth } from "../../hooks/useAuth";

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
      {/* Grid background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full border border-gray-200 dark:border-gray-800 rounded-xs grid grid-cols-[repeat(8,1fr)] md:grid-cols-[repeat(14,1fr)] grid-rows-[repeat(6,1fr)] md:grid-rows-[repeat(8,1fr)]">
          {Array.from({ length: 14 * 8 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-200/50 dark:border-gray-800/50"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Logo className="h-8 md:h-10 w-auto fill-gray-900 dark:fill-white mx-auto" />
          </motion.div>

          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-blue-600 dark:text-blue-400">
              Think, ask, learn
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <Link
              to={"/app"}
              className="group relative inline-flex h-10 md:h-12 items-center justify-center overflow-hidden rounded-xs bg-blue-500 px-6 md:px-8 font-medium text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-900 select-none"
            >
              <span className="group-hover:pl-2 transition-all duration-200">
                {isAuthenticated() ? "Go to app" : "Get started"}
              </span>
              <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
