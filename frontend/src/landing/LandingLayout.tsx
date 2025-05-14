import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import PageTransition from "../shared/PageTransition";

export default function LandingLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-black dark:text-white bg-gray-100 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}
