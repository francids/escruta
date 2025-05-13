import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import PageTransition from "../shared/PageTransition";
import Navbar from "./components/Navbar";

export default function LandingLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}
