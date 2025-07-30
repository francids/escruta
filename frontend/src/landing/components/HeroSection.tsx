import { Link } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../../hooks/useAuth";

import AppDesktopImage from "../assets/AppDesktop.png";

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-gray-900 py-12">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 -z-10 h-full w-full dark:hidden"
          style={{
            background:
              "linear-gradient(180deg, var(--color-blue-50) 0%, var(--color-white) 70%, var(--color-white) 100%)",
            filter: "blur(2px)",
            opacity: 0.35,
          }}
        />
        <div
          className="absolute inset-0 -z-10 h-full w-full hidden dark:block"
          style={{
            background:
              "linear-gradient(180deg, var(--color-blue-900) 0%, var(--color-gray-900) 70%, var(--color-gray-900) 100%)",
            filter: "blur(0.5px)",
            opacity: 0.08,
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center justify-center">
        <div className="mt-32 w-full max-w-4xl text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Think, ask,{" "}
              <span className="text-blue-700 dark:text-blue-400">learn</span>
            </h1>
          </motion.div>

          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Organize, analyze, and learn from your own knowledge. Ask
              questions, take notes, and get insights—all in a private,
              open-source platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <div className="flex gap-4">
              <Link
                to={"/app"}
                className="group relative inline-flex h-10 md:h-12 items-center justify-center overflow-hidden rounded-xs bg-blue-500 px-6 md:px-8 font-medium text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-900 select-none"
              >
                {isAuthenticated() ? "Go to app" : "Get started"}
              </Link>
              <Link
                to="https://github.com/francids/escruta"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 group relative inline-flex h-10 md:h-12 items-center justify-center overflow-hidden rounded-xs border border-transparent px-6 md:px-8 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 select-none"
              >
                Source code
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.img
          src={AppDesktopImage}
          alt="App screenshot"
          className="mt-16 w-full max-w-5xl rounded-xs shadow-lg border border-gray-200 dark:border-gray-700"
          style={{ objectFit: "contain" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </div>
    </section>
  );
}
