import { Link } from "react-router";
import { motion } from "motion/react";

import AppDesktopImage from "../assets/AppDesktop.png";
import SimpleBackground from "./SimpleBackground";
import GradientAnimationBackground from "./GradientAnimationBackground";
import { justLanding, repoUrl } from "../../config";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-gray-900 py-12">
      <SimpleBackground />
      <GradientAnimationBackground />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center justify-center">
        <div className="mt-36 w-full max-w-4xl text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Think, ask,{" "}
              <span className="text-blue-700 dark:text-blue-400">learn</span>
            </h1>
          </motion.div>

          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Organize, analyze, and learn from your own knowledge. Ask
              questions, take notes, and get insights—all in a private,
              open-source platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="flex gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <Link
                  to={
                    justLanding ? repoUrl : "/app"
                  }
                  className="group relative inline-flex h-10 md:h-12 items-center justify-center overflow-hidden rounded-xs bg-blue-500 px-6 md:px-8 font-medium text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-900 select-none"
                >
                  Start exploring
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <Link
                  to={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/80 text-gray-900 hover:bg-gray-100 focus:ring-gray-400 dark:bg-gray-900/80 dark:text-white dark:hover:bg-gray-800 group relative inline-flex h-10 md:h-12 items-center justify-center overflow-hidden rounded-xs border border-gray-200 dark:border-gray-800 px-6 md:px-8 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 select-none"
                >
                  Source code
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <motion.img
          src={AppDesktopImage}
          alt="App screenshot"
          className="mt-16 w-full max-w-5xl rounded-xs border border-gray-200 dark:border-gray-700"
          style={{ objectFit: "contain" }}
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
