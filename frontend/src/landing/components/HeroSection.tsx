import { Link } from "react-router";
import { motion } from "motion/react";

import ScrollingGridBackground from "./backgrounds/ScrollingGridBackground";
import GradientAnimationBackground from "./backgrounds/GradientAnimationBackground";
import { justLanding, repoUrl } from "@/config";

export default function HeroSection() {
  return (
    <section className="relative pb-6 md:pb-0 w-full md:min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] overflow-hidden bg-gray-900">
      <ScrollingGridBackground />
      <GradientAnimationBackground />

      {/* Background Overlay */}
      <div className="absolute inset-0 z-[9] overflow-hidden pointer-events-none">
        <div className="h-full w-full bg-linear-to-t from-gray-900 via-gray-900/60 via-15% to-gray-900/5" />
      </div>

      {/* Content */}
      <div className="mx-auto z-10 relative flex flex-col justify-center items-center size-full px-6 md:px-12 lg:px-24 pb-16 md:pb-24 pt-16 md:pt-0">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xs text-sm font-semibold bg-blue-900 text-blue-200 border border-blue-700 select-none">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.9999 12L3.92886 19.0711L2.51465 17.6569L8.1715 12L2.51465 6.34317L3.92886 4.92896L10.9999 12ZM10.9999 19H20.9999V21H10.9999V19Z"></path>
              </svg>
              Under development
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-[42px] sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white text-center leading-12 sm:leading-16">
              Think, ask, <span className="text-blue-400">learn</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative mb-8"
          >
            <p className="max-w-2xl text-lg sm:text-xl text-gray-400 text-center font-medium tracking-normal leading-8">
              Organize, analyze, and learn from your own knowledge. Ask
              questions, take notes, and gain valuable insights, all in one
              platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-start items-start gap-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="w-full md:w-auto"
            >
              <Link
                to={justLanding ? repoUrl : "/app"}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xs bg-blue-600 px-6 md:px-8 font-semibold text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 select-none w-full md:w-auto"
              >
                Start exploring
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="w-full md:w-auto"
            >
              <Link
                to={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 text-white hover:bg-gray-800 group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xs border border-gray-800 px-6 md:px-8 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 select-none w-full md:w-auto"
              >
                Source code
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        onClick={() => {
          document
            .getElementById("showcase")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="animate-[var(--animate-slow-bounce)] rounded-xs absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-900/30 backdrop-blur-md border border-blue-800 hidden md:flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer z-10 text-blue-400"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
        </svg>
      </div>
    </section>
  );
}
