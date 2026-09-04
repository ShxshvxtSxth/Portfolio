"use client";

import React, { useState } from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";

function Sparkle({ className }: { className: string }) {
  return (
    <svg className={`trophy-sparkle ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0l2.2 8.2L22 12l-7.8 2.2L12 24l-2.2-9.8L2 12l7.8-3.8z" />
    </svg>
  );
}

/** confetti pieces thrown out of the cup when it opens */
const CONFETTI = Array.from({ length: 18 }, (_, i) => {
  const angle = (-160 + i * 9) * (Math.PI / 180);
  const distance = 70 + ((i * 37) % 60);
  return {
    tx: `${Math.cos(angle) * distance}px`,
    ty: `${Math.sin(angle) * distance}px`,
    delay: `${(i % 6) * 40}ms`,
    color: ["#f59e0b", "#e11d48", "#8b5cf6", "#22c55e", "#38bdf8", "#fbbf24"][i % 6],
    rotate: `${(i * 47) % 360}deg`,
  };
});

/**
 * Highlights tile. Hovering — or tapping, which pins it open — lifts the lid:
 * the cup rises and tilts, confetti bursts out, the spotlights flare and the
 * achievement lines rise into place.
 */
export default function TrophyCard({ index }: { index?: number }) {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [burst, setBurst] = useState(0);
  const open = pinned || hovered;

  const fire = () => setBurst((b) => b + 1);

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      onMouseEnter={() => {
        setHovered(true);
        fire();
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setPinned((p) => !p);
        fire();
      }}
    >
      <Card card="trophy" variant="image" index={index}>
        <span className="trophy-bg" aria-hidden>
          <span className="trophy-blur trophy-blur-red" />
          <span className="trophy-blur trophy-blur-purple" />
          <span className="trophy-blur trophy-blur-amber" />
          <span className="trophy-spot trophy-spot-left" />
          <span className="trophy-spot trophy-spot-center" />
          <span className="trophy-spot trophy-spot-right" />
        </span>

        <span className="trophy-figure" data-open={open}>
          <Sparkle className="trophy-sparkle-1" />
          <Sparkle className="trophy-sparkle-2" />
          <Sparkle className="trophy-sparkle-3" />

          {/* light escaping from the cup as it opens */}
          <span className="trophy-glow" data-open={open} aria-hidden />

          <span className="trophy-lid" data-open={open} aria-hidden>
            ✨
          </span>
          <span className="trophy-cup" data-open={open} aria-hidden>
            🏆
          </span>

          {/* remounted on each burst so the animation replays */}
          <span className="trophy-burst" key={burst} aria-hidden>
            {open &&
              CONFETTI.map((c, i) => (
                <span
                  key={i}
                  className="trophy-confetti"
                  style={
                    {
                      "--tx": c.tx,
                      "--ty": c.ty,
                      "--rot": c.rotate,
                      background: c.color,
                      animationDelay: c.delay,
                    } as React.CSSProperties
                  }
                />
              ))}
          </span>
        </span>

        <span className="trophy-text" data-open={open}>
          <span className="trophy-headline">{profile.trophy.headline}</span>
          {profile.trophy.lines.map((line, i) => (
            <span className="trophy-line" key={line} style={{ "--line-i": i } as React.CSSProperties}>
              {line}
            </span>
          ))}
        </span>
      </Card>
    </div>
  );
}
