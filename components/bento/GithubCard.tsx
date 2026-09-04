"use client";

import React, { useMemo } from "react";
import { Github } from "lucide-react";
import Card from "./Card";
import { profile } from "@/lib/profile";

const COLS = 20;
const ROWS = 18;

/**
 * Contribution grid with a rolling ripple; hovering swaps it for the stats.
 */
export default function GithubCard({ index }: { index?: number }) {
  // deterministic-ish pattern so the ripple looks organic but stable per mount
  const cells = useMemo(
    () =>
      Array.from({ length: COLS * ROWS }, (_, i) => ({
        lit: (i * 7919) % 11 < 4,
        delay: ((i * 37) % 60) / 10,
      })),
    []
  );

  return (
    <Card card="github" href={profile.github.url} index={index} ariaLabel="GitHub profile">
      <span className="gh-grid" aria-hidden>
        {cells.map((c, i) => (
          <span
            key={i}
            className="gh-cell"
            data-lit={c.lit}
            style={c.lit ? { animationDelay: `${c.delay}s` } : undefined}
          />
        ))}
      </span>

      <span className="gh-state gh-logo-state">
        <span style={{ display: "flex", alignItems: "center", gap: "calc(12 * var(--unit))" }}>
          <Github style={{ width: "calc(40 * var(--unit))", height: "calc(40 * var(--unit))" }} strokeWidth={1.3} />
          <span>
            <span className="card-title" style={{ display: "block" }}>
              github
            </span>
            <span className="card-sub" style={{ display: "block", marginTop: "calc(4 * var(--unit))" }}>
              {profile.github.handle}
            </span>
          </span>
        </span>
      </span>

      <span className="gh-state gh-hover-state">
        <span style={{ display: "flex", gap: "calc(28 * var(--unit))", textAlign: "center" }}>
          <span>
            <span className="gh-stat-value" style={{ display: "block" }}>
              {profile.github.stats.repos}
            </span>
            <span className="gh-stat-label">repos</span>
          </span>
          <span>
            <span className="gh-stat-value" style={{ display: "block" }}>
              {profile.github.stats.contributions}+
            </span>
            <span className="gh-stat-label">contributions</span>
          </span>
        </span>
      </span>
    </Card>
  );
}
