"use client";

import React, { useState } from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";
import AIDialog from "./AIDialog";

export default function AICard({ index }: { index?: number }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Card card="ai" index={index} arrow={false}>
        <button
          id="ai-card-button"
          type="button"
          className="ai-avatar-group"
          onClick={() => setDialogOpen(true)}
          aria-label={`Chat with ${profile.aiChat.name}`}
          aria-haspopup="dialog"
          aria-expanded={dialogOpen}
          title={`Click to chat with ${profile.aiChat.name}`}
          style={{ width: "100%", height: "100%", background: "none", border: "none", cursor: "pointer" }}
        >
          <svg className="ai-spinner" viewBox="0 0 200 200" aria-hidden>
            <defs>
              <path id="ai-ring-path" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
            </defs>
            <text className="ai-ring-text">
              <textPath href="#ai-ring-path" startOffset="0">
                {profile.aiChat.ring}
              </textPath>
            </text>
          </svg>

          <span className="ai-face" aria-hidden>
            <span className="ai-eye" />
            <span className="ai-eye" />
          </span>
        </button>
      </Card>

      <AIDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}

