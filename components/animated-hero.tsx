"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface Cursor {
  x: number;
  y: number;
  color: string;
  text: string;
  progress: number;
}

interface AIBubble {
  x: number;
  y: number;
  text: string;
  opacity: number;
}

export default function AnimatedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: container.clientHeight,
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas DPI for sharp text
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Animation variables
    let frame = 0;
    const cursors: Cursor[] = [
      {
        x: 50,
        y: 50,
        color: "#3b82f6",
        text: "Taking notes in real-time...",
        progress: 0,
      },
      {
        x: 50,
        y: 100,
        color: "#10b981",
        text: "Collaborating with team members...",
        progress: 0,
      },
    ];

    const aiBubbles: AIBubble[] = [
      {
        x: 300,
        y: 75,
        text: "✨ AI Suggestion: Add key takeaways section",
        opacity: 0,
      },
    ];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw semi-transparent overlay
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Animate cursors and text
      cursors.forEach((cursor, i) => {
        // Draw cursor
        const cursorBlink = Math.sin(frame * 0.1) > 0;
        if (cursorBlink) {
          ctx.fillStyle = cursor.color;
          ctx.fillRect(cursor.x + cursor.progress * 7, cursor.y - 15, 2, 20);
        }

        // Draw text
        ctx.font = "16px system-ui";
        ctx.fillStyle = "currentColor";
        const visibleText = cursor.text.slice(0, Math.floor(cursor.progress));
        ctx.fillText(visibleText, cursor.x, cursor.y);

        // Update progress
        if (cursor.progress < cursor.text.length) {
          cursor.progress += 0.2;
        }
      });

      // Animate AI bubbles
      aiBubbles.forEach((bubble) => {
        if (frame > 60) {
          // Delay bubble appearance
          bubble.opacity = Math.min(bubble.opacity + 0.02, 1);

          ctx.save();
          ctx.globalAlpha = bubble.opacity;

          // Draw bubble background
          ctx.fillStyle = "#f0f9ff";
          ctx.strokeStyle = "#93c5fd";
          ctx.lineWidth = 2;

          const padding = 12;
          const textWidth = ctx.measureText(bubble.text).width;
          const bubbleWidth = textWidth + padding * 2;
          const bubbleHeight = 36;

          ctx.beginPath();
          ctx.roundRect(
            bubble.x,
            bubble.y - bubbleHeight / 2,
            bubbleWidth,
            bubbleHeight,
            8
          );
          ctx.fill();
          ctx.stroke();

          // Draw bubble text
          ctx.fillStyle = "#1e40af";
          ctx.fillText(bubble.text, bubble.x + padding, bubble.y + 6);

          ctx.restore();
        }
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, [dimensions]);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-gray-50 md:h-[500px] dark:bg-gray-900">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
        className="absolute inset-0"
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
        <h1 className="mb-6 max-w-4xl text-4xl font-semibold md:text-5xl lg:text-6xl">
          Take Notes in Real Time with AI Assistance
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-gray-600 md:text-2xl dark:text-gray-300">
          Collaborate seamlessly with your team while AI helps you capture and
          organize your thoughts
        </p>
        <Button size="lg" className="gap-2">
          Try it Free <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
