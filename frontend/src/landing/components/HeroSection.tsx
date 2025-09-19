import { Link } from "react-router";
import { motion } from "motion/react";

import AppDesktopImage from "../assets/AppDesktop.png";
import ScrollingGridBackground from "./backgrounds/ScrollingGridBackground";
import GradientAnimationBackground from "./backgrounds/GradientAnimationBackground";
import { justLanding, repoUrl } from "@/config";

export default function HeroSection() {
  return (
    <section className="relative pb-6 md:pb-0 w-full md:min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] overflow-hidden bg-gray-900">
      <ScrollingGridBackground />
      <GradientAnimationBackground />

      {/* App Image */}
      <motion.div
        className="absolute w-full h-full inset-0 z-[8] overflow-hidden hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute -right-16 top-24 w-4xl h-auto rounded-xs shadow-2xl shadow-blue-500/10">
          <div className="relative p-1 rounded-xs">
            <img
              src={AppDesktopImage}
              alt="App Desktop"
              className="relative z-10 w-full h-auto select-none pointer-events-none rounded-xs bg-gray-900 border border-blue-700"
            />
            <span className="animate-[var(--animate-slow-pulse)] blur-2xl absolute inset-2 rounded-lg bg-blue-500 opacity-10"></span>
          </div>
        </div>
      </motion.div>

      {/* Background Overlay */}
      <div className="absolute inset-0 z-[9] overflow-hidden pointer-events-none">
        <div className="h-full w-full bg-linear-to-t from-gray-900 via-gray-900 via-15% to-gray-900/5" />
      </div>

      {/* Content */}
      <div className="mx-auto z-10 relative flex flex-col justify-end size-full px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="w-full text-left flex flex-col items-start justify-start">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
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
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Think, ask, <span className="text-blue-400">learn</span>
            </h1>
          </motion.div>

          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <p className="max-w-2xl text-lg md:text-xl text-gray-400 text-left font-medium">
              Organize, analyze, and learn from your own knowledge. Ask
              questions, take notes, and get insights—all in a open-source
              platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row w-full justify-start items-start gap-4"
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
            .getElementById("features")
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
