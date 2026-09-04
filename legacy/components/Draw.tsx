"use client";

import React, { useRef, useEffect } from "react";

export default function Draw() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      ctx.lineWidth = 0.15;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#ffffff";
      ctx.globalAlpha = 0.1;

      const { pageX, pageY } = e;

      if (lastPositionRef.current) {
        const { x, y } = lastPositionRef.current;
        ctx.beginPath();
        ctx.moveTo(x - canvas.offsetLeft, y - canvas.offsetTop);
        ctx.lineTo(pageX - canvas.offsetLeft, pageY - canvas.offsetTop);
        ctx.stroke();
      }

      lastPositionRef.current = { x: pageX, y: pageY };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
