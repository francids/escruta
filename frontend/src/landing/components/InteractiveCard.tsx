import { useCardMouseEffect } from "@/hooks";
import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  mousePosition: { x: number; y: number };
  isMouseInArea: boolean;
}

export default function InteractiveCard({
  children,
  className = "",
  mousePosition,
  isMouseInArea,
}: InteractiveCardProps) {
  const {
    cardRef,
    isDesktop,
    isPressed,
    isTouched,
    getCardEffects,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
  } = useCardMouseEffect();

  const { relativeMouseX, relativeMouseY, showDesktopEffect } = getCardEffects(
    mousePosition,
    isMouseInArea
  );

  return (
    <div
      ref={cardRef}
      className={twMerge(
        "group relative p-6 md:p-8 rounded-xs bg-gray-900/50 border border-gray-800 transition-all duration-300 cursor-pointer overflow-hidden",
        !isDesktop
          ? "active:ring-2 active:ring-offset-2 active:ring-offset-transparent active:outline-0 active:ring-blue-500"
          : "",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {isDesktop && (
        <>
          <div
            className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
              showDesktopEffect ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: `radial-gradient(300px circle at ${relativeMouseX}px ${relativeMouseY}px, rgba(59, 130, 246, 0.1), transparent 60%)`,
            }}
          />

          <div
            className={`absolute inset-0 rounded-xs transition-opacity duration-300 pointer-events-none ${
              showDesktopEffect ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: `radial-gradient(300px circle at ${relativeMouseX}px ${relativeMouseY}px, rgba(59, 130, 246, 0.6), transparent 60%)`,
              padding: "1px",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "exclude",
            }}
          />

          <div
            className={`absolute inset-0 rounded-xs transition-opacity duration-200 pointer-events-none ${
              isPressed ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: `linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(30, 64, 175, 0.6))`,
              padding: "1px",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "exclude",
            }}
          />
        </>
      )}

      {!isDesktop && (
        <div
          className={`absolute inset-0 rounded-xs transition-opacity duration-150 pointer-events-none ${
            isTouched ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(30, 64, 175, 0.2))`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
