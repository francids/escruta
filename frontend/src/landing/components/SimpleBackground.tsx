export default function SimpleBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 -z-10 h-full w-full dark:hidden"
        style={{
          background:
            "linear-gradient(180deg, var(--color-blue-50) 0%, var(--color-white) 70%, var(--color-white) 100%)",
          filter: "blur(2px)",
          opacity: 0.35,
        }}
      />
      <div
        className="absolute inset-0 -z-10 h-full w-full hidden dark:block"
        style={{
          background:
            "linear-gradient(180deg, var(--color-blue-900) 0%, var(--color-gray-900) 70%, var(--color-gray-900) 100%)",
          filter: "blur(0.5px)",
          opacity: 0.08,
        }}
      />
    </div>
  );
}
