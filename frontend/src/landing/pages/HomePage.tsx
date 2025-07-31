import CTASection from "../components/CTASection";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white bg-white dark:bg-gray-900">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
