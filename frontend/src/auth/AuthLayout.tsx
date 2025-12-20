import { Outlet, Link, Navigate } from "react-router";
import { motion } from "motion/react";
import Logotype from "@/shared/Logotype";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { websiteUrl } from "@/config";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsKeyboardOpen(window.innerHeight < window.screen.height * 0.75);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isAuthenticated()) {
    return <Navigate to="/app" />;
  }

  return (
    <main>
      <div className="flex h-dvh sm:h-screen justify-center">
        <div className="z-10 flex flex-1 sm:items-center justify-center p-8 pt-12 sm:pt-8 bg-white dark:bg-gray-900">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>

      {isKeyboardOpen ? null : (
        <div className="absolute lg:top-8 bottom-8 z-20 lg:left-8 left-1/2 transform lg:transform-none -translate-x-1/2 lg:translate-x-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <Link to={websiteUrl} className="flex items-center p-4">
              <Logotype className="h-4 w-auto fill-black dark:fill-white" />
            </Link>
          </motion.div>
        </div>
      )}
    </main>
  );
}
