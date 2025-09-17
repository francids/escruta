import { motion } from "motion/react";
import SimpleBackground from "../components/backgrounds/SimpleBackground";

export default function BlogPage() {
  return (
    <>
      <SimpleBackground />
      <div className="md:h-min-[calc(100vh-80px)] md:h-[calc(100vh-80px)] text-white flex flex-col relative z-10">
        <section className="py-16 md:py-24 relative flex-1">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
                Blog
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                Welcome to our blog! Here, we share insights, updates, and
                stories about our journey, the technology behind our platform,
                and tips for making the most of your knowledge management
                experience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-center"
            >
              <div className="relative p-8 md:p-10 rounded-xs bg-gray-900/80 backdrop-blur-sm border border-gray-800 mx-2 md:mx-12">
                <p className="text-gray-200 text-base md:text-lg font-normal">
                  Stay tuned for upcoming articles and insights about knowledge
                  management, research techniques, and platform updates.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
