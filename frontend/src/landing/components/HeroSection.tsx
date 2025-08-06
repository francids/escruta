import { Link } from "react-router";
import { motion } from "motion/react";

import AppDesktopImage from "../assets/AppDesktop.png";
import AppMobileImage from "../assets/AppMobile.png";
import ScrollingGridBackground from "./backgrounds/ScrollingGridBackground";
import GradientAnimationBackground from "./backgrounds/GradientAnimationBackground";
import { justLanding, repoUrl } from "../../config";

export default function HeroSection() {
  return (
    <section className="relative pt-40 pb-16 md:pt-8 md:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-900">
      <ScrollingGridBackground />
      <GradientAnimationBackground />

      <div className="absolute inset-0 z-[9] overflow-hidden">
        <div className="h-full w-full bg-linear-0 from-gray-900 via-transparent via-80% to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center justify-center">
        <div className="md:mt-36 w-full max-w-4xl text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="px-3 py-1 rounded-xs text-sm font-semibold bg-blue-900 text-blue-200 border border-blue-700 select-none">
              Under development
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
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
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl text-gray-400">
              Organize, analyze, and learn from your own knowledge. Ask
              questions, take notes, and get insights—all in a open-source
              platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="flex gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                <Link
                  to={justLanding ? repoUrl : "/app"}
                  className="group relative inline-flex h-10 md:h-12 items-center justify-center overflow-hidden rounded-xs bg-blue-600 px-6 md:px-8 font-medium text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 select-none"
                >
                  Start exploring
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
              >
                <Link
                  to={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900/80 text-white hover:bg-gray-800 group relative inline-flex h-10 md:h-12 items-center justify-center overflow-hidden rounded-xs border border-gray-800 px-6 md:px-8 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 select-none"
                >
                  Source code
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center mt-16 w-full max-w-5xl">
          <motion.img
            src={AppDesktopImage}
            alt="App screenshot"
            className="hidden md:block w-full rounded-xs outline outline-blue-400/60 select-none pointer-events-none"
            style={{ objectFit: "contain" }}
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          />
          <motion.img
            src={AppMobileImage}
            alt="App screenshot"
            className="block md:hidden w-5/6 rounded-xs outline outline-blue-400/60 select-none pointer-events-none"
            style={{ objectFit: "contain" }}
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </section>
  );
}
