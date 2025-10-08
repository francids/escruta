import { Outlet, Link, useLocation } from "react-router";
import { motion } from "motion/react";
import Logo from "@/shared/Logotype";
import ScrollingGridBackground from "@/landing/components/backgrounds/ScrollingGridBackground";
import GradientAnimationBackground from "@/landing/components/backgrounds/GradientAnimationBackground";

const loginPhrases = [
  "Welcome back to your research journey",
  "Continue exploring knowledge with AI",
  "Your notebooks are waiting for you",
  "Dive back into intelligent research",
  "Resume your AI-powered studies",
  "Your knowledge workspace awaits",
  "Continue building your research empire",
  "Welcome back, knowledge seeker",
  "Your AI research assistant is ready",
  "Step back into smart learning",
];

const registerPhrases = [
  "Start your AI-powered research journey",
  "Transform how you organize knowledge",
  "Join thousands of smart researchers",
  "Build your intelligent note-taking system",
  "Create, connect, and discover with AI",
  "Your personal research assistant awaits",
  "Unlock the future of knowledge management",
  "Where research meets artificial intelligence",
  "Begin your smart study revolution",
  "Experience research without limits",
];

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="relative h-screen w-full">
      <div className="flex h-screen">
        {/* Left side - Background */}
        <div className="hidden lg:flex lg:flex-1 relative">
          <ScrollingGridBackground speed={2.5} />
          <GradientAnimationBackground />

          <div className="absolute inset-0 z-[9] overflow-hidden pointer-events-none opacity-35">
            <div className="h-full w-full bg-linear-to-t from-blue-900 via-blue-900/60 via-15% to-blue-900/5" />
          </div>
        </div>

        {/* Right side - Form */}
        <div className="z-10 flex-1 lg:flex-none lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 lg:border-l lg:border-blue-200 lg:dark:border-blue-800">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Logo at top-left on desktop, center bottom on mobile */}
      <div className="absolute lg:top-8 bottom-8 z-20 lg:left-8 left-1/2 transform lg:transform-none -translate-x-1/2 lg:translate-x-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center lg:text-left"
        >
          <Link
            to="/home"
            className="flex items-center p-4 bg-[#f9f9f9] dark:bg-[#131313] lg:bg-transparent dark:lg:bg-transparent rounded-xs"
          >
            <Logo className="h-4 lg:h-5 w-auto fill-black lg:fill-white dark:fill-white" />
          </Link>
          <motion.p
            className="hidden lg:block px-4 font-medium text-pretty text-blue-200/80 w-full max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {location.pathname === "/login"
              ? loginPhrases[Math.floor(Math.random() * loginPhrases.length)]
              : location.pathname === "/register"
              ? registerPhrases[
                  Math.floor(Math.random() * registerPhrases.length)
                ]
              : "Welcome to Escruta"}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
