import { motion } from "motion/react";
import { useState } from "react";
import { useMediaQuery } from "@/hooks";
import AppDesktopImage from "../assets/AppDesktop.webp";
import InteractiveCard from "./InteractiveCard";

export default function ShowcaseSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInArea, setIsMouseInArea] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDesktop) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsMouseInArea(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setIsMouseInArea(false);
    }
  };

  return (
    <section
      id="showcase"
      className="pt-8 md:pt-16 relative bg-gray-900 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto px-6 md:px-24">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xs text-sm font-semibold bg-blue-900 text-blue-200 border border-blue-700 select-none">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 17V20H18V22H6V20H11V17H4C3.44772 17 3 16.5523 3 16V4H2V2H22V4H21V16C21 16.5523 20.5523 17 20 17H13ZM5 15H19V4H5V15ZM10 6L15 9.5L10 13V6Z"></path>
              </svg>
              Showcase
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Intuitive and <span className="text-blue-400">powerful</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Experience a clean, modern interface for researchers and learners.
            Organize knowledge effortlessly.
          </motion.p>
        </div>

        <motion.div
          className="relative max-w-6xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 blur-3xl rounded-xs"></div>

          {/* Image container */}
          <InteractiveCard
            mousePosition={mousePosition}
            isMouseInArea={isMouseInArea}
            className="p-1 md:p-4 mx-4 md:mx-0"
          >
            <div className="relative overflow-hidden rounded-xs">
              <img
                src={AppDesktopImage}
                alt="Escruta Desktop Application Interface"
                className="w-full h-auto select-none border border-gray-700/60"
                loading="lazy"
              />
            </div>
          </InteractiveCard>
        </motion.div>
      </div>
    </section>
  );
}
