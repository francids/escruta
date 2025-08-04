export default function GradientAnimationBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <style>{`
                @keyframes gradient-shift {
                    0%, 100% {
                        background-position: 0% 50%;
                        background-size: 400% 400%;
                    }
                    50% {
                        background-position: 100% 50%;
                        background-size: 600% 600%;
                    }
                }

                @keyframes gradient-pulse {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.6;
                        transform: scale(1.05);
                    }
                }

                @keyframes gradient-float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.4;
                    }
                    33% {
                        transform: translateY(-10px) rotate(1deg);
                        opacity: 0.7;
                    }
                    66% {
                        transform: translateY(5px) rotate(-1deg);
                        opacity: 0.5;
                    }
                }

                .animate-gradient-shift {
                    animation: gradient-shift 15s ease-in-out infinite;
                }

                .animate-gradient-pulse {
                    animation: gradient-pulse 8s ease-in-out infinite;
                }

                .animate-gradient-float {
                    animation: gradient-float 12s ease-in-out infinite;
                }
            `}</style>

      {/* Light mode gradient */}
      <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-gradient-shift" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-200/30 to-blue-300/40 animate-gradient-pulse" />
        <div className="absolute inset-0 bg-gradient-to-bl from-neutral-50/80 via-transparent to-blue-100/60 animate-gradient-float" />
      </div>

      {/* Dark mode gradient */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 animate-gradient-shift" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/20 to-blue-800/30 animate-gradient-pulse" />
        <div className="absolute inset-0 bg-gradient-to-bl from-neutral-900/80 via-transparent to-blue-900/40 animate-gradient-float" />
      </div>
    </div>
  );
}
