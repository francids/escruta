export default function GradientAnimationBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden w-full h-full">
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
                        opacity: 0.6;
                    }
                    50% {
                        opacity: 0.9;
                    }
                }

                @keyframes gradient-float {
                    0%, 100% {
                        opacity: 0.6;
                    }
                    33% {
                        opacity: 0.9;
                    }
                    66% {
                        opacity: 0.6;
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

      <div className="absolute inset-0 w-full h-full opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 animate-gradient-shift" />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-blue-900/20 to-blue-800/30 animate-gradient-pulse" />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-bl from-gray-900/80 via-transparent to-blue-900/40 animate-gradient-float" />
      </div>
    </div>
  );
}
