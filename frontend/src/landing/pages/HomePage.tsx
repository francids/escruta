import { useLocation } from "react-router";
import SimpleBackground from "../components/backgrounds/SimpleBackground";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import OpenSourceSection from "../components/OpenSourceSection";
import SEOMetadata from "@/shared/SEOMetadata";
import { getRouteMetadata } from "@/config/seo";

export default function HomePage() {
  const location = useLocation();
  const metadata = getRouteMetadata(location.pathname);

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <SEOMetadata
        title={metadata.title}
        description={metadata.description}
        url={metadata.url}
        image={metadata.image}
        keywords={metadata.keywords}
        twitterCard={metadata.twitterCard}
      />
      <SimpleBackground className="z-10" />
      <HeroSection />
      <FeaturesSection />
      <OpenSourceSection />
    </div>
  );
}
