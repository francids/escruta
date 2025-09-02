import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import { useAuth, useCookie } from "@/hooks";
import type { User } from "@/interfaces";
import PageTransition from "@/shared/PageTransition";
import SideMenu from "../components/SideMenu";

export default function AppLayout() {
  const { currentUser, fetchUserData } = useAuth();
  const [, setUserData] = useCookie<User | null>("user", null);
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser, setUserData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="flex h-screen bg-white text-black dark:bg-black dark:text-white select-none">
      <SideMenu />
      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </div>
    </div>
  );
}
