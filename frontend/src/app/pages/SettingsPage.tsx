import { AccountSection, AppearanceSection } from "../components/settings";
import { motion } from "motion/react";
import SEOMetadata from "@/shared/SEOMetadata";

export default function SettingsPage() {
  return (
    <div className="flex h-screen max-h-full w-full flex-col">
      <SEOMetadata
        title="Settings - Escruta"
        description="Configure your Escruta account settings, appearance preferences, and application behavior."
        url="https://escruta.com/app/settings"
        image="https://escruta.com/OpenGraphImage.webp"
        twitterCard="summary_large_image"
      />
      <motion.div
        className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-6 py-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center gap-4">
          <h1 className="flex flex-col items-start gap-1.5 min-w-0">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Configuration
            </span>
            <span className="text-2xl font-bold truncate w-full text-gray-900 dark:text-white select-text">
              Settings
            </span>
          </h1>
        </div>
      </motion.div>

      <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-950 overflow-auto">
        <AppearanceSection />
        <AccountSection />
      </div>
    </div>
  );
}
