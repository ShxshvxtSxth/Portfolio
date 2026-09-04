import React from "react";
import { Linkedin, Github, Code, Mail, Twitter, Instagram, MessageCircle, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Card from "./Card";
import { profile } from "@/lib/profile";

const ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  leetcode: Code,
  mail: Mail,
  x: Twitter,
  instagram: Instagram,
  discord: MessageCircle,
};

/** Social rail with spring tooltips plus the resume button. */
export default function DockCard({ index }: { index?: number }) {
  return (
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

        <a className="dock-resume" href={profile.resumeUrl} target="_blank" rel="noreferrer noopener">
          <FileText className="dock-icon" strokeWidth={1.6} />
          My Resume
        </a>
      </div>
    </Card>
  );
}
