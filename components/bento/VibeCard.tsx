"use client";

import React from "react";
import dynamic from "next/dynamic";
import Card from "./Card";
import { profile } from "@/lib/profile";

// WebGL only runs in the browser.
const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => <div style={{ position: "absolute", inset: 0, background: "#0c0d10" }} />,
});

/**
 * Media tile. Uses an image when profile.vibe.image is set, otherwise the
 * generative scene. Hovering fades in the caption with a staggered reveal.
 */
export default function VibeCard({ index }: { index?: number }) {
  const { image, status, title, rating } = profile.vibe;

  return (
    <Card card="vibe" variant="image" index={index} arrow={false}>
      {image ? (
        <img className="vibe-media" src={image} alt={title} />
      ) : (
        <span className="vibe-media" style={{ background: "#0c0d10" }}>
          <ThreeScene />
        </span>
      )}

      <span className="vibe-overlay">
        <span className="vibe-indicator" />
        <span className="vibe-text">
          <span className="vibe-status">{status}</span>
          <span className="vibe-title">{title}</span>
          <span className="vibe-rating">{"★".repeat(rating)}</span>
        </span>
      </span>
    </Card>
  );
}
