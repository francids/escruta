import { Outlet, useLocation } from "react-router";
import Navbar from "./shared/Navbar";
import PageTransition from "./shared/PageTransition";
import Footer from "./shared/Footer";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Navbar />
      <PageTransition key={location.pathname}>
        <div className="md:min-h-[calc(100vh-80px)]">
          <Outlet />
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
}
