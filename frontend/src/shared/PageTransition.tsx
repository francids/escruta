import { motion } from "motion/react";
import { useLocation } from "react-router";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ y: 4 }}
      animate={{ y: 0 }}
      exit={{ y: -4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
