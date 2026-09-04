"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Track mouse coordinate values
    const mouse = { x: 0, y: 0 };
    const cursorCoords = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth lerp follow loop using GSAP quickTo for high performance (60fps+)
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    const updatePosition = () => {
      // Lerp logic
      cursorCoords.x += (mouse.x - cursorCoords.x) * 0.25;
      cursorCoords.y += (mouse.y - cursorCoords.y) * 0.25;
      
      xTo(cursorCoords.x);
      yTo(cursorCoords.y);

      requestAnimationFrame(updatePosition);
    };

    const animFrame = requestAnimationFrame(updatePosition);

    // Custom data-cursor listeners for interactive resizing/hiding
    const setupCursorInteractions = () => {
      document.querySelectorAll("[data-cursor]").forEach((el) => {
        const type = el.getAttribute("data-cursor");

        const onMouseEnter = () => {
          if (type === "icons") {
            cursor.classList.add("cursor-icons");
          } else if (type === "disable") {
            cursor.classList.add("cursor-disable");
          }
        };

        const onMouseLeave = () => {
          cursor.classList.remove("cursor-icons", "cursor-disable");
        };

        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    // Initialize interactive handlers
    setupCursorInteractions();

    // Re-bind interactions when DOM changes (important for Next.js routing/lazy components)
    const observer = new MutationObserver(setupCursorInteractions);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="cursor-main hidden md:block" />;
}
