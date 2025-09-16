import { Outlet, useLocation } from "react-router";
import PageTransition from "../shared/PageTransition";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function LandingLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Navbar />
      <PageTransition key={location.pathname}>
        <Outlet />
      </PageTransition>
      <Footer />
    </div>
  );
}
