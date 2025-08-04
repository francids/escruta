import { Link } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../../hooks/useAuth";
import { justLanding, repoUrl } from "../../config";
import ScrollingGridBackground from "./backgrounds/ScrollingGridBackground";

export default function CTASection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 flex items-center justify-center">
      <ScrollingGridBackground />
      <div className="container h-full py-16 mx-auto relative z-20 max-w-screen-xl">
        <div className="w-full md:max-w-4xl h-full p-16 md:p-24 mx-auto backdrop-blur-sm rounded-xs border border-gray-200 dark:border-gray-800 text-center bg-white dark:bg-gray-900">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to revolutionize your research workflow?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Transform your research experience with Escruta—your intelligent,
            AI-powered research companion designed to help you explore,
            organize, and gain deeper insights as you dive into your areas of
            interest.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full flex justify-center"
          >
            <Link
              to={justLanding ? repoUrl : "/app"}
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
