import { useRef, useEffect, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GridLetterBackgroundProps {
  className?: string;
  characters?: string;
  gridSize?: number;
  glitchFrequency?: "low" | "medium" | "high";
}

export default function GridLetterBackground({
  className,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  gridSize = 60,
  glitchFrequency = "low",
}: GridLetterBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glitchesRef = useRef<
    Array<{ row: number; col: number; char: string; startTime: number }>
  >([]);

  const frequencyMap = {
    low: 8,
    medium: 4,
    high: 2,
  };

  const animationSpeed = frequencyMap[glitchFrequency];

  const cols = useMemo(
    () => Math.ceil((window?.innerWidth || 1920) / gridSize),
    [gridSize]
  );
  const rows = useMemo(
    () => Math.ceil((window?.innerHeight || 1080) / gridSize),
    [gridSize]
  );

  const gridItems = useMemo(() => {
    return Array.from({ length: cols * rows }, (_, i) => ({
      char: characters[Math.floor(Math.random() * characters.length)],
      row: Math.floor(i / cols),
      col: i % cols,
    }));
  }, [cols, rows, characters]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#4b5563";
    ctx.globalAlpha = 0.4;
    gridItems.forEach((item) => {
      const x = item.col * gridSize + gridSize / 2;
      const y = item.row * gridSize + gridSize / 2;
      ctx.fillText(item.char, x, y);
    });

    glitchesRef.current.forEach((glitch, index) => {
      const progress = (Date.now() - glitch.startTime) / 1000;
      if (progress > animationSpeed) {
        glitchesRef.current.splice(index, 1);
        return;
      }
      const phase = progress / animationSpeed;
      let opacity, color, scale;
      if (phase < 0.8) {
        opacity = 0.4;
        color = "#4b5563";
        scale = 1;
      } else if (phase < 0.85) {
        opacity = 0.9;
        color = "#06b6d4";
        scale = 1.05;
      } else if (phase < 0.9) {
        opacity = 0.7;
        color = "#3b82f6";
        scale = 0.95;
      } else {
        opacity = 0.4;
        color = "#4b5563";
        scale = 1;
      }
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      const x = glitch.col * gridSize + gridSize / 2;
      const y = glitch.row * gridSize + gridSize / 2;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillText(glitch.char, 0, 0);
      ctx.restore();
    });

    const glitchChance = 1 / (animationSpeed * 60);
    if (Math.random() < glitchChance) {
      const randomIndex = Math.floor(Math.random() * gridItems.length);
      const item = gridItems[randomIndex];
      glitchesRef.current.push({ ...item, startTime: Date.now() });
    }

    requestAnimationFrame(animate);
  }, [gridItems, gridSize, animationSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    />
  );
}
