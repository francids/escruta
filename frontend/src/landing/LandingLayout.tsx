import { Outlet, useLocation } from "react-router";
import PageTransition from "../shared/PageTransition";
import Navbar from "./components/Navbar";

export default function LandingLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-black dark:text-white bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <PageTransition key={location.pathname}>
        <Outlet />
      </PageTransition>
    </div>
  );
}
