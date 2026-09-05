import React from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";

const RING = { easy: "#00b8a3", medium: "#ffb800", hard: "#ff375f" } as const;

const R = 42;
const CIRC = 2 * Math.PI * R;
const GAP = 6; // px of arc left blank between the three difficulty segments
const SEGMENT = CIRC / 3 - GAP;

/**
 * Logo state by default; on hover the scribbled notes fade out and a solved
 * donut scales in — the same swap the reference tile does.
 *
 * The ring is split into three equal arcs (easy / medium / hard); each arc is
 * filled in proportion to how much of that difficulty is solved.
 */
export default function LeetCodeCard({ index }: { index?: number }) {
  const { solved, totals } = profile.leetcode;
  const total = solved.easy + solved.medium + solved.hard;

  const segments = (["easy", "medium", "hard"] as const).map((key, i) => ({
    key,
    color: RING[key],
    ratio: Math.min(1, solved[key] / totals[key]),
    start: -(i * CIRC) / 3,
  }));

  return (
    <Card card="leetcode" href={profile.leetcode.url} index={index} ariaLabel="LeetCode profile">
      <div className="lc-notes" aria-hidden>
        {profile.leetcode.notes.map((n) => (
          <span
            key={n.text}
            className="lc-note"
            style={{
              top: n.top,
              left: n.left,
              right: n.right,
              transform: `rotate(${n.rotate ?? 0}deg)`,
            }}
          >
            {n.text}
          </span>
        ))}
      </div>

      <div className="lc-state lc-logo-state">
        <span className="lc-logo-inner">
          <img className="lc-logo-icon" src="/icons/leetcode.svg" alt="" loading="lazy" />
          <span>
            <span className="card-title" style={{ display: "block" }}>
              leetcode
            </span>
            <span className="card-sub" style={{ display: "block", marginTop: "calc(4 * var(--unit))" }}>
              {profile.leetcode.handle}
            </span>
          </span>
        </span>
      </div>

      <div className="lc-state lc-hover-state">
        <span className="lc-corner lc-corner-tl">{profile.leetcode.handle}</span>
        <span className="lc-corner lc-corner-tr">{profile.leetcode.rank}</span>

        <span className="lc-donut">
          <svg viewBox="0 0 100 100" aria-hidden>
            {segments.map((s) => (
              <React.Fragment key={s.key}>
                <circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke="#00000010"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={`${SEGMENT.toFixed(2)} ${(CIRC - SEGMENT).toFixed(2)}`}
                  strokeDashoffset={s.start.toFixed(2)}
                />
                <circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={`${(SEGMENT * s.ratio).toFixed(2)} ${(CIRC - SEGMENT * s.ratio).toFixed(2)}`}
                  strokeDashoffset={s.start.toFixed(2)}
                />
              </React.Fragment>
            ))}
          </svg>
          <span className="lc-donut-center">
            <span className="lc-solved">{total}</span>
            <span className="lc-solved-label">solved</span>
          </span>
        </span>

        <span className="lc-corner lc-corner-bl gold-shine">{profile.leetcode.rating}</span>
      </div>
    </Card>
  );
}
