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
      variants={{
        hidden: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="enter"
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
