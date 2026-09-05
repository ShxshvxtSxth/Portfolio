"use client";

import React, { useState } from "react";
import { Linkedin, Github, Code, Mail, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Card from "./Card";
import { profile } from "@/lib/profile";
import ResumeDialog from "./ResumeDialog";

const ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  leetcode: Code,
  mail: Mail,
};

/** Social rail with spring tooltips plus the interactive resume button. */
export default function DockCard({ index }: { index?: number }) {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <Card card="dock" index={index} arrow={false}>
        <div className="dock-inner">
          {profile.socials.map((s) => {
            const Icon = ICONS[s.id] ?? Code;
            return (
              <a
                key={s.id}
                className="dock-btn"
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
              >
                <Icon className="dock-icon" strokeWidth={1.5} />
                <span className="dock-tooltip">{s.label}</span>
              </a>
            );
          })}

          <button
            type="button"
            className="dock-resume cursor-pointer"
            onClick={() => setResumeOpen(true)}
            aria-label="Open full official resume"
          >
            <FileText className="dock-icon" strokeWidth={1.6} />
            My Resume
          </button>
        </div>
      </Card>

      <ResumeDialog isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}

