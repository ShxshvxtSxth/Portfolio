"use client";

import React, { useMemo } from "react";
import { Linkedin } from "lucide-react";
import Card from "./Card";
import { profile } from "@/lib/profile";

const COLS = 20;
const ROWS = 18;

/**
 * LinkedIn profile card mirroring the GitHub card:
 * Interactive network ripple grid in the background;
 * Logo state displays the LinkedIn badge with handle;
 * Hover state smoothly transitions to network connection stats.
 */
export default function ClubCard({ index }: { index?: number }) {
  // Deterministic-ish pattern so the ripple looks organic but stable per mount
  const cells = useMemo(
    () =>
      Array.from({ length: COLS * ROWS }, (_, i) => ({
        lit: (i * 7919) % 11 < 4,
        delay: ((i * 37) % 60) / 10,
      })),
    []
  );

  const linkedinUrl =
    profile.resume.linkedin ||
    profile.socials.find((s) => s.id === "linkedin")?.href ||
    "https://www.linkedin.com/in/shashvat-seth-516472364/";

  return (
    <Card card="club" href={linkedinUrl} index={index} ariaLabel="LinkedIn profile">
      <span className="li-grid" aria-hidden>
        {cells.map((c, i) => (
          <span
            key={i}
            className="li-cell"
            data-lit={c.lit}
            style={c.lit ? { animationDelay: `${c.delay}s` } : undefined}
          />
        ))}
      </span>

      <span className="li-state li-logo-state">
        <span style={{ display: "flex", alignItems: "center", gap: "calc(12 * var(--unit))" }}>
          <Linkedin
            style={{
              width: "calc(40 * var(--unit))",
              height: "calc(40 * var(--unit))",
              color: "#0a66c2",
            }}
            strokeWidth={1.3}
          />
          <span>
            <span className="card-title" style={{ display: "block" }}>
              linkedin
            </span>
            <span className="card-sub" style={{ display: "block", marginTop: "calc(4 * var(--unit))" }}>
              shashvat-seth
            </span>
          </span>
        </span>
      </span>

      <span className="li-state li-hover-state">
        <span style={{ display: "flex", gap: "calc(28 * var(--unit))", textAlign: "center" }}>
          <span>
            <span className="li-stat-value" style={{ display: "block" }}>
              500+
            </span>
            <span className="li-stat-label">connections</span>
          </span>
          <span>
            <span className="li-stat-value" style={{ display: "block" }}>
              connect
            </span>
            <span className="li-stat-label">on linkedin</span>
          </span>
        </span>
      </span>
    </Card>
  );
}

export { ClubCard as LinkedInCard };
