export default function SimpleBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0 -z-10 h-full w-full"
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
