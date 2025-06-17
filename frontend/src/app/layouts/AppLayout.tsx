import { useAuth } from "../../hooks/useAuth";
import SideMenu from "../components/SideMenu";
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import useCookie from "../../hooks/useCookie";
import type User from "../../auth/interfaces/User";
import { AnimatePresence } from "motion/react";
import PageTransition from "../../shared/PageTransition";
import { ModalProvider } from "../contexts/ModalContext";

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
    <ModalProvider>
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
    </ModalProvider>
  );
}
