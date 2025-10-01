import { motion } from "motion/react";
import { useState } from "react";
import { useMediaQuery } from "@/hooks";
import AppDesktopImage from "../assets/AppDesktop.png";
import InteractiveCard from "./InteractiveCard";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

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
  const features: Feature[] = [
    {
      title: "Smart Organization",
      description:
        "Automatically organize your research materials with intelligent categorization and tagging",
      icon: (
        <svg
          className="h-8 w-8 md:h-10 md:w-10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15 3C15.5523 3 16 3.44772 16 4V8C16 8.55228 15.5523 9 15 9H13V11H17C17.5523 11 18 11.4477 18 12V15H20C20.5523 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H14C13.4477 21 13 20.5523 13 20V16C13 15.4477 13.4477 15 14 15H16V13H8V15H10C10.5523 15 11 15.4477 11 16V20C11 20.5523 10.5523 21 10 21H4C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H6V12C6 11.4477 6.44772 11 7 11H11V9H9C8.44772 9 8 8.55228 8 8V4C8 3.44772 8.44772 3 9 3H15ZM9 17H5V19H9V17ZM19 17H15V19H19V17ZM14 5H10V7H14V5Z"></path>
        </svg>
      ),
    },
    {
      title: "AI-Powered Insights",
      description:
        "Get intelligent answers and insights from your personal knowledge base using advanced AI",
      icon: (
        <svg
          className="h-8 w-8 md:h-10 md:w-10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9 4C10.1046 4 11 4.89543 11 6V12.8271C10.1058 12.1373 8.96602 11.7305 7.6644 11.5136L7.3356 13.4864C8.71622 13.7165 9.59743 14.1528 10.1402 14.7408C10.67 15.3147 11 16.167 11 17.5C11 18.8807 9.88071 20 8.5 20C7.11929 20 6 18.8807 6 17.5V17.1493C6.43007 17.2926 6.87634 17.4099 7.3356 17.4864L7.6644 15.5136C6.92149 15.3898 6.1752 15.1144 5.42909 14.7599C4.58157 14.3573 4 13.499 4 12.5C4 11.6653 4.20761 11.0085 4.55874 10.5257C4.90441 10.0504 5.4419 9.6703 6.24254 9.47014L7 9.28078V6C7 4.89543 7.89543 4 9 4ZM12 3.35418C11.2671 2.52376 10.1947 2 9 2C6.79086 2 5 3.79086 5 6V7.77422C4.14895 8.11644 3.45143 8.64785 2.94126 9.34933C2.29239 10.2415 2 11.3347 2 12.5C2 14.0652 2.79565 15.4367 4 16.2422V17.5C4 19.9853 6.01472 22 8.5 22C9.91363 22 11.175 21.3482 12 20.3287C12.825 21.3482 14.0864 22 15.5 22C17.9853 22 20 19.9853 20 17.5V16.2422C21.2044 15.4367 22 14.0652 22 12.5C22 11.3347 21.7076 10.2415 21.0587 9.34933C20.5486 8.64785 19.8511 8.11644 19 7.77422V6C19 3.79086 17.2091 2 15 2C13.8053 2 12.7329 2.52376 12 3.35418ZM18 17.1493V17.5C18 18.8807 16.8807 20 15.5 20C14.1193 20 13 18.8807 13 17.5C13 16.167 13.33 15.3147 13.8598 14.7408C14.4026 14.1528 15.2838 13.7165 16.6644 13.4864L16.3356 11.5136C15.034 11.7305 13.8942 12.1373 13 12.8271V6C13 4.89543 13.8954 4 15 4C16.1046 4 17 4.89543 17 6V9.28078L17.7575 9.47014C18.5581 9.6703 19.0956 10.0504 19.4413 10.5257C19.7924 11.0085 20 11.6653 20 12.5C20 13.499 19.4184 14.3573 18.5709 14.7599C17.8248 15.1144 17.0785 15.3898 16.3356 15.5136L16.6644 17.4864C17.1237 17.4099 17.5699 17.2926 18 17.1493Z"></path>
        </svg>
      ),
    },
    {
      title: "Seamless Experience",
      description:
        "Enjoy a fluid, responsive interface designed for productivity and seamless workflow",
      icon: (
        <svg
          className="h-8 w-8 md:h-10 md:w-10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="showcase"
      className="py-16 md:py-24 relative bg-gray-900 overflow-hidden"
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

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <InteractiveCard
                mousePosition={mousePosition}
                isMouseInArea={isMouseInArea}
                className="text-center"
              >
                <div className="text-blue-500 mb-4 md:mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400">
                  {feature.description}
                </p>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
