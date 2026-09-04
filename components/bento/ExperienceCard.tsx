import React from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";

const TONES = [
  "linear-gradient(135deg,#fb923c,#f43f5e)",
  "linear-gradient(135deg,#38bdf8,#6366f1)",
  "linear-gradient(135deg,#34d399,#0d9488)",
  "linear-gradient(135deg,#e879f9,#a855f7)",
  "linear-gradient(135deg,#fbbf24,#f97316)",
];

/**
 * Client avatars + headline; hovering swaps in a testimonial that assembles
 * word by word.
 */
export default function ExperienceCard({ index }: { index?: number }) {
  const { clients, more, title, testimonial } = profile.experience;
  const words = testimonial.quote.split(" ");

  return (
    <Card card="experience" index={index}>
      <div className="exp-default">
        <div className="exp-circles">
          {clients.map((initial, i) => (
            <span
              key={`${initial}-${i}`}
              className="exp-circle"
              style={{ "--circle-idx": i, background: TONES[i % TONES.length] } as React.CSSProperties}
            >
              {initial}
            </span>
          ))}
          <span
            className="exp-circle exp-circle-last"
            style={{ "--circle-idx": clients.length } as React.CSSProperties}
          >
            {more}
          </span>
        </div>

        <p className="exp-title">{title}</p>
      </div>

      <div className="exp-hover">
        <div className="exp-header">
          <span className="exp-avatar">{testimonial.author.charAt(0)}</span>
          <span>
            <span className="exp-client" style={{ display: "block" }}>
              {testimonial.author}
            </span>
            <span className="card-sub" style={{ display: "block", marginTop: "calc(4 * var(--unit))" }}>
              {testimonial.role}
            </span>
          </span>
        </div>

        <p className="exp-quote">
          {words.map((word, i) => (
            <React.Fragment key={`${word}-${i}`}>
              <span className="exp-word" style={{ "--word-idx": i } as React.CSSProperties}>
                {word}
              </span>{" "}
            </React.Fragment>
          ))}
        </p>

        <div className="exp-footer">— client feedback</div>
      </div>
    </Card>
  );
}
