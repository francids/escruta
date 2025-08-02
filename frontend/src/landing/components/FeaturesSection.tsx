import { motion } from "motion/react";

const features = [
  {
    title: "Centralized Notebooks",
    description:
      "Organize your research into distinct projects or topics. Each notebook acts as a self-contained workspace for your sources, notes, and AI conversations.",
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
    title: "Source Management",
    description:
      "Upload and manage your documents. Web links are processed into clean, readable documents for analysis. Escruta uses these materials as the sole knowledge base for its AI.",
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
    title: "Integrated Note-Taking",
    description:
      "Capture your thoughts and summaries directly within your notebooks. Keep your insights connected to your source material.",
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
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 2 21l1.5-5L16.5 3.5z"></path>
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
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
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
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
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

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 mx-4 lg:mx-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-6 md:p-8 rounded-xs bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 ${
                index === 0
                  ? "md:col-span-2 lg:col-span-3"
                  : index === 1
                  ? "md:col-span-2 lg:col-span-3"
                  : index === 2
                  ? "md:col-span-2 lg:col-span-2"
                  : index === 3
                  ? "md:col-span-2 lg:col-span-2"
                  : index === 4
                  ? "md:col-span-2 lg:col-span-2"
                  : "md:col-span-2 lg:col-span-2"
              }`}
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
