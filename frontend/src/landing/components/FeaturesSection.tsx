import { motion } from "motion/react";

const features = [
  {
    title: "Interactive Notebooks",
    description: "Create notebooks to organize your thoughts and learnings.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 md:h-10 md:w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
  },
  {
    title: "Idea Exploration",
    description: "Ask complex questions and get detailed answers.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 md:h-10 md:w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    ),
  },
  {
    title: "Intuitive Visualization",
    description:
      "Visualize the connection between ideas with a clean and elegant design.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 md:h-10 md:w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M9 9h.01M15 15h.01M9 15h6M15 9h-6"></path>
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 md:py-20 relative bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-light mb-3 md:mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Features
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Powerful tools to enhance your critical thinking and learning.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mx-4 lg:mx-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 md:p-8 rounded-xs bg-white dark:bg-gray-900/50 shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div className="text-blue-600 dark:text-blue-500 mb-4 md:mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
