"use client";

import React, { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

const CELLS = 44;
const HOLD_MS = 2200;

/**
 * Intro curtain: outlined name behind a greeting, with a progress bar whose
 * cells fill from alternating edges, then the whole thing fades away.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDone(true);
      onDone();
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="loader" data-done={done} aria-hidden={done}>
      <span className="loader-outline">{profile.firstName}</span>

      <div className="loader-text">
        <div className="loader-pre">Hi, I am</div>
        <div className="loader-name">{profile.name}</div>
      </div>

      <div className="loader-bar">
        {Array.from({ length: CELLS }, (_, i) => (
          <span className="loader-cell" key={i}>
            <span
              className="loader-cell-fill"
              style={{
                transformOrigin: i % 2 === 0 ? "top" : "bottom",
                animationDelay: `${0.25 + i * 0.035}s`,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
