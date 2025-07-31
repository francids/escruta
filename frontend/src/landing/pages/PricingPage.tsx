import { Link } from "react-router";
import { motion } from "motion/react";
import SimpleBackground from "../components/SimpleBackground";

interface PricingOption {
  title: string;
  description: string;
  features: string[];
  buttonText?: string;
  buttonLink?: string;
  isComingSoon?: boolean;
}

function PricingOption({
  title,
  description,
  features,
  buttonText,
  buttonLink,
  isComingSoon,
}: PricingOption) {
  return (
    <div className="relative p-8 md:p-10 rounded-xs bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 flex flex-col items-start transition">
      <div className="flex items-center mb-4 w-full">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight flex items-center gap-2">
          {title}
          {isComingSoon && (
            <span className="ml-2 px-2 py-0.5 rounded-xs text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-700 select-none">
              Coming soon
            </span>
          )}
        </h2>
      </div>
      <p className="text-gray-700 dark:text-gray-200 mb-5 text-base md:text-lg font-normal">
        {description}
      </p>
      <ul className="mb-8 list-disc list-inside text-blue-900 dark:text-blue-100 space-y-1 pl-2">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      {buttonLink && buttonText ? (
        <Link
          to={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-xs bg-blue-500 px-6 font-medium text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-900 select-none"
        >
          {buttonText}
        </Link>
      ) : null}
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <SimpleBackground />
      <div className="min-h-screen text-gray-900 dark:text-white bg-white dark:bg-gray-900 flex flex-col pt-20">
        <section className="py-16 md:py-24 relative flex-1">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">
                Pricing
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Escruta is available in two editions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-2 md:mx-12 items-start"
            >
              <PricingOption
                title="Open Source"
                description="Free and open source, self-hosted version."
                features={[
                  "Self-hosted",
                  "Community support",
                  "Regular updates",
                  "No subscription fees",
                ]}
                buttonText="Get started"
                buttonLink="https://github.com/francids/escruta"
              />
              <PricingOption
                title="Cloud"
                description="Same features as Open Source, just hosted for you."
                features={[
                  "Managed hosting",
                  "Same features as Open Source",
                  "No server maintenance",
                  "Scalability",
                ]}
                isComingSoon={true}
              />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
