"use client";

import React, { useCallback, useRef, useState } from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";

/**
 * Portrait card. My name runs behind the cut-out in the page's own grey, and
 * a radial mask tracking the cursor lights it up in white — the reference's
 * hero spotlight.
 */
export default function HeroCard({ index }: { index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMoved, setHasMoved] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    if (!hasMoved) setHasMoved(true);
  }, [hasMoved]);

  // the name should span the card whatever its length, so scale by character count
  const heroFontSize = `calc(${Math.round(Math.min(147, 520 / (profile.firstName.length * 0.58)))} * var(--unit))`;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setHasMoved(false)}
      style={{ height: "100%", width: "100%", "--hero-fs": heroFontSize } as React.CSSProperties}
    >
      <Card card="hero" variant="hero" index={index} arrow={false}>
        <div className="hero-bg" data-has-moved={hasMoved}>
          <div className="hero-marquee-row" aria-hidden>
            <span className="hero-marquee-text">{profile.firstName}</span>
          </div>

          <div className="hero-clip-overlay" aria-hidden style={{ opacity: hasMoved ? 1 : 0 }}>
            <div className="hero-marquee-row">
              <span className="hero-marquee-text">{profile.firstName}</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img src={profile.avatar} alt={`${profile.name} portrait`} />
        </div>
      </Card>
    </div>
  );
}
