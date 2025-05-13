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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
