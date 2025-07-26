import { Link } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../../hooks/useAuth";

export default function CTASection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-12 md:py-20 relative bg-transparent border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-2xl mx-auto backdrop-blur-sm p-6 md:p-12 rounded-xs border border-gray-200 dark:border-gray-800 text-center bg-white/80 dark:bg-gray-900/80">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to streamline your research?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Start exploring, organizing, and learning with Escruta—your
            AI-powered research assistant.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full flex justify-center"
          >
            <Link
              to="/app"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xs bg-blue-500 px-6 md:px-8 font-medium text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-900 select-none"
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
