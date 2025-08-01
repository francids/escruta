import { motion } from "motion/react";
import { useState, type JSX } from "react";

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: "Centralized Notebooks",
    description:
      "Organize your research into distinct projects or topics. Each notebook acts as a self-contained workspace for your sources, notes, and AI conversations.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 md:h-10 md:w-10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.0049 2C21.1068 2 22 2.89821 22 3.9908V20.0092C22 21.1087 21.1074 22 20.0049 22H4V18H2V16H4V13H2V11H4V8H2V6H4V2H20.0049ZM8 4H6V20H8V4ZM20 4H10V20H20V4Z"></path>{" "}
      </svg>
    ),
  },
  {
    title: "Source Management",
    description:
      "Upload and manage your documents. Web links are processed into clean, readable documents for analysis. Escruta uses these materials as the sole knowledge base for its AI.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 md:h-10 md:w-10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
      </svg>
    ),
  },
  {
    title: "Integrated Note-Taking",
    description:
      "Capture your thoughts and summaries directly within your notebooks. Keep your insights connected to your source material.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 md:h-10 md:w-10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
      </svg>
    ),
  },
  {
    title: "Audio Summaries",
    description:
      "Generate and play audio summaries from your notebook's sources, perfect for on-the-go learning and revision.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 md:h-10 md:w-10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.7134 8.12811L19.4668 8.69379C19.2864 9.10792 18.7136 9.10792 18.5331 8.69379L18.2866 8.12811C17.8471 7.11947 17.0555 6.31641 16.0677 5.87708L15.308 5.53922C14.8973 5.35653 14.8973 4.75881 15.308 4.57612L16.0252 4.25714C17.0384 3.80651 17.8442 2.97373 18.2761 1.93083L18.5293 1.31953C18.7058 0.893489 19.2942 0.893489 19.4706 1.31953L19.7238 1.93083C20.1558 2.97373 20.9616 3.80651 21.9748 4.25714L22.6919 4.57612C23.1027 4.75881 23.1027 5.35653 22.6919 5.53922L21.9323 5.87708C20.9445 6.31641 20.1529 7.11947 19.7134 8.12811ZM15 21.5386L9 7.53861L6.6594 13H1V11H5.3406L9 2.46143L15 16.4614L17.3406 11H23V13H18.6594L15 21.5386Z"></path>
      </svg>
    ),
  },
  {
    title: "Mind Maps",
    description:
      "Automatically generate mind maps that illustrate the connections and hierarchies between topics in your sources.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 md:h-10 md:w-10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9H15C13.6941 9 12.5831 8.16562 12.171 7.0009L11 7C9.9 7 9 7.9 9 9L9.0009 9.17102C10.1656 9.58312 11 10.6941 11 12C11 13.3059 10.1656 14.4169 9.0009 14.829L9 15C9 16.1 9.9 17 11 17L12.1707 17.0001C12.5825 15.8349 13.6937 15 15 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21H15C13.6941 21 12.5831 20.1656 12.171 19.0009L11 19C8.79 19 7 17.21 7 15H5C3.34315 15 2 13.6569 2 12C2 10.3431 3.34315 9 5 9H7C7 6.79086 8.79086 5 11 5L12.1707 5.00009C12.5825 3.83485 13.6937 3 15 3H18ZM18 17H15C14.4477 17 14 17.4477 14 18C14 18.5523 14.4477 19 15 19H18C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17ZM8 11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H8C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11ZM18 5H15C14.4477 5 14 5.44772 14 6C14 6.55228 14.4477 7 15 7H18C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"></path>
      </svg>
    ),
  },
];

function FeatureCard({
  feature,
  className,
}: {
  feature: Feature;
  className: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`group relative p-6 md:p-8 rounded-xs bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 transition-all duration-300 cursor-pointer overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Background glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 60%)`,
        }}
      />

      {/* Glowing border effect */}
      <div
        className="absolute inset-0 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.6), transparent 60%)`,
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="text-blue-600 dark:text-blue-500 mb-4 md:mb-6">
          {feature.icon}
        </div>
        <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3 text-gray-900 dark:text-white">
          {feature.title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-12 md:py-20 relative bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Features
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Powerful tools to enhance your critical thinking and learning.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 mx-4 lg:mx-32 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const getClassName = (index: number) => {
              if (index === 0) return "md:col-span-2 lg:col-span-3";
              if (index === 1) return "md:col-span-2 lg:col-span-3";
              if (index === 2) return "md:col-span-2 lg:col-span-2";
              if (index === 3) return "md:col-span-2 lg:col-span-2";
              if (index === 4) return "md:col-span-2 lg:col-span-2";
              return "md:col-span-2 lg:col-span-2";
            };

            return (
              <FeatureCard
                key={index}
                feature={feature}
                className={getClassName(index)}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
