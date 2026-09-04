import React from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";

/**
 * Headline that reveals word by word on load, with the two gradient runs
 * picked out of lib/profile.ts.
 */
export default function AboutCard({ index }: { index?: number }) {
  let wordIndex = 0;

  return (
    <Card card="about" index={index}>
      <p className="about-text">
        {profile.about.map((segment, s) => {
          const words = segment.text.split(" ").filter(Boolean);
          const leading = segment.text.startsWith(" ") ? " " : "";

          return (
            <React.Fragment key={s}>
              {leading}
              {words.map((word, w) => {
                const style = { "--i": wordIndex++ } as React.CSSProperties;
                const content = segment.gradient ? (
                  <strong className={`gradient-${segment.gradient}`}>
                    <span className="gradient-word">{word}</span>
                  </strong>
                ) : (
                  word
                );
                return (
                  <React.Fragment key={`${s}-${w}`}>
                    <span className="word" style={style}>
                      {content}
                    </span>
                    {w < words.length - 1 ? " " : ""}
                  </React.Fragment>
                );
              })}
              {segment.text.endsWith(" ") ? " " : ""}
            </React.Fragment>
          );
        })}
      </p>
    </Card>
  );
}
