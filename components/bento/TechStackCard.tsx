"use client";

import React, { useState } from "react";
import Card from "./Card";
import { profile, type TechItem } from "@/lib/profile";
import TechProficiencyDialog from "./TechProficiencyDialog";
import { Sparkles, Maximize2 } from "lucide-react";

const COLUMNS = 3;
const DIRECTIONS = ["up", "down", "up"] as const;

function iconUrl(item: TechItem): string {
  return `/icons/${item.slug}.svg`;
}

function split(items: TechItem[]): TechItem[][] {
  const cols: TechItem[][] = Array.from({ length: COLUMNS }, () => []);
  items.forEach((item, i) => cols[i % COLUMNS].push(item));
  return cols;
}

function TechIconItem({ item }: { item: TechItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <span className="tech-icon-wrap" title={item.name}>
      <span className="tech-icon">
        {!imgFailed ? (
          <img
            src={iconUrl(item)}
            alt={item.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span
            className="text-[10px] font-bold tracking-tight select-none"
            style={{ color: item.color ? `#${item.color.replace("#", "")}` : "#6366f1" }}
          >
            {item.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="tech-tooltip">{item.name}</span>
    </span>
  );
}

export default function TechStackCard({ index }: { index?: number }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const columns = split(profile.tech);

  return (
    <>
      <div
        id="tech-stack-card-container"
        className="group/tech relative w-full h-full cursor-pointer"
        onClick={() => setDialogOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDialogOpen(true);
          }
        }}
        aria-label="View Technical Proficiency breakdown"
        aria-haspopup="dialog"
      >
        <Card card="techstack" index={index} ariaLabel="Technical Proficiency">
          {/* Top subtle category pill */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md text-zinc-600 text-[11px] font-medium border border-zinc-200/70 shadow-2xs group-hover/tech:border-zinc-300 group-hover/tech:text-zinc-900 transition-colors pointer-events-none">
            <span>Stack</span>
            <Maximize2 className="w-2.5 h-2.5 opacity-60 group-hover/tech:opacity-100 transition-opacity" />
          </div>

          <div className="tech-viewport">
            {columns.map((items, c) => (
              <div className="tech-column" key={c}>
                <div className="tech-track" data-direction={DIRECTIONS[c]}>
                  {[...items, ...items].map((item, i) => (
                    <TechIconItem key={`${item.slug}-${i}`} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="tech-fade tech-fade-top" aria-hidden />
          <div className="tech-fade tech-fade-bottom" aria-hidden />

          {/* Bottom hover affordance button */}
          <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center pointer-events-none opacity-0 group-hover/tech:opacity-100 transition-all duration-200 transform translate-y-1 group-hover/tech:translate-y-0">
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-900/90 text-white backdrop-blur-md shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Explore Technical Proficiency</span>
            </span>
          </div>
        </Card>
      </div>

      <TechProficiencyDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
