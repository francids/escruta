import { motion } from "motion/react";
import SimpleBackground from "../components/backgrounds/SimpleBackground";

export default function AboutPage() {
  return (
    <>
      <SimpleBackground />
      <div className="min-h-screen text-white bg-gray-900 flex flex-col pt-20">
        <section className="py-16 md:py-24 relative flex-1">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
                About Us
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                There's nothing here yet, but soon there will be.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
