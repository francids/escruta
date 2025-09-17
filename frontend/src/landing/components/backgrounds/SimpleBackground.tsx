import { twMerge } from "tailwind-merge";

export default function SimpleBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={twMerge("fixed inset-0 z-0", className)}>
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background:
            "linear-gradient(180deg, #3b82f6 0%, #1e40af 50%, #1f2937 100%)",
          opacity: 0.05,
        }}
      />
    </div>
  );
}
