"use client";

import React from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";
import { Sparkles, Terminal } from "lucide-react";

/**
 * Enhanced Software Developer Role Card:
 * Highlights active engineering position at Vigorus.AI with live radar pulse,
 * chromatic company typography, and key tech stack indicators.
 */
export default function ClubCard({ index }: { index?: number }) {
  return (
    <Card
      card="club"
      href={profile.currentRole.url}
      index={index}
      ariaLabel="Current role: Software Developer at Vigorus.AI"
    >
      <div className="club-content">
        {/* Live Active Status Indicator */}
        <div className="club-top-bar">
          <div className="club-status-badge">
            <span className="club-status-ping" />
            <span className="club-status-dot" />
            <span className="club-status-text">Active Role</span>
          </div>
          <span className="club-tech-tag">
            <Terminal className="w-3 h-3" />
            <span>Full-Stack</span>
          </span>
        </div>

        {/* Role & Org */}
        <div className="club-body">
          <span className="club-prefix">Software Developer @</span>
          <span className="club-name">{profile.currentRole.org}</span>
        </div>

        {/* Feature / Domain Highlight */}
        <div className="club-footer">
          <span className="club-highlight-pill">
            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
            <span>Chikitsa EMR v2 · Agentic AI</span>
          </span>
        </div>
      </div>
    </Card>
  );
}
