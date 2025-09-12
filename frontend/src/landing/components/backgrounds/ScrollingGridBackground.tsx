export default function ScrollingGridBackground() {
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      <div
        className={`
          absolute inset-0
          bg-[linear-gradient(rgba(3,136,252,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(3,136,252,0.12)_1px,transparent_1px)]
          bg-[length:35px_35px]
          animate-[scrolling-grid_1.5s_linear_infinite]
        `}
      />
    </div>
  );
}
