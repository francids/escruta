import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
    </div>
  );
}
