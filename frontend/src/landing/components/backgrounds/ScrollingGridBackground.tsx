interface ScrollingGridBackgroundProps {
  speed?: number;
}

export default function ScrollingGridBackground({
  speed = 1.5,
}: ScrollingGridBackgroundProps) {
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      <style>{`
        @keyframes scrolling-grid {
          0% {
            background-position: 0 0, 0 0;
          }
          100% {
            background-position: 50px 50px, 50px 50px;
          }
        }
        
        .animate-scrolling-grid {
          animation: scrolling-grid ${speed}s linear infinite;
        }
      `}</style>

      <div
        className={`
          absolute inset-0
          bg-[linear-gradient(rgba(3,136,252,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(3,136,252,0.12)_1px,transparent_1px)]
          bg-[length:50px_50px]
          animate-scrolling-grid
        `}
      />
    </div>
  );
}
