import { Link } from "react-router";
import { motion } from "motion/react";
import { repoUrl } from "../../config";
import GradientBackgroundImage from "../assets/Gradient.png";

export default function OpenSourceSection() {
  return (
    <section className="relative py-24 md:py-32 bg-gray-900 border-t border-gray-800 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden ">
        <img
          src={GradientBackgroundImage}
          alt="Background"
          className="select-none pointer-events-none object-cover w-full h-full"
        />
      </div>
      GradientBackgroundImage
      <div className="container mx-auto mt-8 px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="px-3 py-1 rounded-xs text-sm font-semibold bg-blue-900 text-blue-200 border border-blue-700 select-none">
              Open source
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Built for the <span className="text-blue-400">community</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Escruta is completely open source, ensuring transparency. Contribute
            to the project, customize it to your needs, or simply explore its
            inner workings. Your research tools should be as open as your own
            research.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="group relative p-6 rounded-xs bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-600/20 rounded-xs group-hover:bg-blue-600/30 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 21V23.5L10 21.5L7 23.5V21H6.5C4.567 21 3 19.433 3 17.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V20C21 20.5523 20.5523 21 20 21H13ZM13 19H19V16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19H7V17H13V19ZM19 14V4H6V14.0354C6.1633 14.0121 6.33024 14 6.5 14H19ZM7 5H9V7H7V5ZM7 8H9V10H7V8ZM7 11H9V13H7V11Z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                  Transparent
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  Every line of code is open for inspection. No hidden
                  algorithms or mysterious processes.
                </p>
              </div>
            </div>

            <div className="group relative p-6 rounded-xs bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-600/20 rounded-xs group-hover:bg-blue-600/30 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11 6H7V20H17V6H13V4H11V6ZM9 4V3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4H18C18.5523 4 19 4.44772 19 5V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V5C5 4.44772 5.44772 4 6 4H9Z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                  Customizable
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  Fork, modify, and adapt Escruta to fit your specific research
                  workflow and requirements.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
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
        </div>
      </div>
    </section>
  );
}
