import { Outlet, useLocation } from "react-router";
import PageTransition from "../shared/PageTransition";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function LandingLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-black dark:text-white bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-100 dark:from-gray-900 via-gray-100/60 dark:via-gray-900/60 to-transparent pointer-events-none z-40 opacity-30" />
      <PageTransition key={location.pathname}>
        <Outlet />
      </PageTransition>
      <Footer />
    </div>
  );
}
