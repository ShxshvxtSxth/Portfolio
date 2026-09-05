"use client";

import React, { useCallback, useEffect, useState } from "react";
import { profile } from "@/lib/profile";

const CELLS = 44;
const HOLD_MS = 2200;

/**
 * Intro curtain: outlined name behind a greeting, with a progress bar whose
 * cells fill from alternating edges, then the whole curtain glides upward
 * in a synchronized transition to reveal the main bento grid.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [lifting, setLifting] = useState(false);
  const [done, setDone] = useState(false);

  const triggerExit = useCallback(() => {
    if (lifting || done) return;
    setLifting(true);
    // Signal parent page to start staggered card entrance in sync with curtain lift
    onDone();

    // After curtain has completed its upward glide, hide and detach
    const finishTimer = window.setTimeout(() => {
      setDone(true);
    }, 900);
    return () => window.clearTimeout(finishTimer);
  }, [lifting, done, onDone]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      triggerExit();
    }, HOLD_MS);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
        triggerExit();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [triggerExit]);

  if (done) return null;

  return (
    <div
      className="loader"
      data-lifting={lifting}
      data-done={done}
      aria-hidden={done}
      onClick={() => {
        if (!lifting) triggerExit();
      }}
      role="button"
      tabIndex={0}
      aria-label="Skip to portfolio"
      style={{ cursor: lifting ? "default" : "pointer" }}
    >
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
                animationDelay: `${0.15 + i * 0.035}s`,
              }}
            />
          </span>
        ))}
      </div>

      <button
        type="button"
        className="loader-skip"
        onClick={(e) => {
          e.stopPropagation();
          triggerExit();
        }}
        aria-label="Skip intro animation"
      >
        Skip intro ↵
      </button>
    </div>
  );
}
