import { Card } from "./ui";
import { twMerge } from "tailwind-merge";

export default function CommonBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`${twMerge("flex mb-4", className)}`}>{children}</Card>
  );
}
