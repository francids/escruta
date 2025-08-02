import { Link } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../../hooks/useAuth";

export default function CTASection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-12 md:py-20 relative bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(180,180,180,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,180,180,0.3)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,rgba(144,144,144,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(144,144,144,0.1)_1px,transparent_1px)]"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-20 max-w-screen-xl">
        <div className="max-w-2xl mx-auto backdrop-blur-sm p-8 md:p-14 rounded-xs border border-gray-200 dark:border-gray-800 text-center bg-white/80 dark:bg-gray-900/80">
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
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xs bg-blue-600 px-6 md:px-8 font-semibold text-white hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-offset-gray-900 select-none"
            >
              {isAuthenticated() ? "Go to app" : "Get started"}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
