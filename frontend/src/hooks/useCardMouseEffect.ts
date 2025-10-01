import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@/hooks";

export default function useCardMouseEffect() {
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (cardRef.current && isDesktop) {
      const updatePosition = () => {
        const rect = cardRef.current!.getBoundingClientRect();
        const sectionElement = cardRef.current!.closest("section");
        const sectionRect = sectionElement?.getBoundingClientRect();
        if (sectionRect) {
          setCardPosition({
            x: rect.left - sectionRect.left,
            y: rect.top - sectionRect.top,
          });
        }
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);
      return () => window.removeEventListener("resize", updatePosition);
    }
  }, [isDesktop]);

  const isNearCard = (
    mouseX: number,
    mouseY: number,
    cardX: number,
    cardY: number,
    cardWidth: number,
    cardHeight: number,
    threshold: number = 100
  ) => {
    return (
      mouseX >= cardX - threshold &&
      mouseX <= cardX + cardWidth + threshold &&
      mouseY >= cardY - threshold &&
      mouseY <= cardY + cardHeight + threshold
    );
  };

  const getCardEffects = (
    mousePosition: { x: number; y: number },
    isMouseInArea: boolean
  ) => {
    const relativeMouseX = mousePosition.x - cardPosition.x;
    const relativeMouseY = mousePosition.y - cardPosition.y;

    const showDesktopEffect =
      isDesktop && isMouseInArea && cardRef.current
        ? isNearCard(
            mousePosition.x,
            mousePosition.y,
            cardPosition.x,
            cardPosition.y,
            cardRef.current.offsetWidth,
            cardRef.current.offsetHeight
          )
        : false;

    return {
      relativeMouseX,
      relativeMouseY,
      showDesktopEffect,
    };
  };

  const handleMouseDown = () => {
    if (isDesktop) setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (isDesktop) setIsPressed(false);
  };

  const handleMouseLeave = () => {
    if (isDesktop) setIsPressed(false);
  };

  const handleTouchStart = () => {
    if (!isDesktop) {
      setIsTouched(true);
      setTimeout(() => setIsTouched(false), 200);
    }
  };

  return {
    cardRef,
    isDesktop,
    isPressed,
    isTouched,
    getCardEffects,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
  };
}
