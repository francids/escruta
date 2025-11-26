import { cn } from "@/lib/utils";

export default function SimpleBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("fixed inset-0 z-0 pointer-events-none", className)}>
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
