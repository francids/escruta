import { Card } from "@/shared/ui";
import { cn } from "@/lib/utils";

export default function CommonBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Card className={cn("flex mb-4", className)}>{children}</Card>;
}
