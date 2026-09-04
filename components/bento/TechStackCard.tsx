import React from "react";
import Card from "./Card";
import { profile, type TechItem } from "@/lib/profile";

const COLUMNS = 3;
const DIRECTIONS = ["up", "down", "up"] as const;

/**
 * Icons are vendored into public/icons (brand colours baked in) so the page
 * makes no third-party requests. Re-run the download in the README notes if
 * you add a tool to lib/profile.ts.
 */
function iconUrl(item: TechItem): string {
  return `/icons/${item.slug}.svg`;
}

/** deal the tools into N columns so each marquee runs a different set */
function split(items: TechItem[]): TechItem[][] {
  const cols: TechItem[][] = Array.from({ length: COLUMNS }, () => []);
  items.forEach((item, i) => cols[i % COLUMNS].push(item));
  return cols;
}

/**
 * Three vertical marquees running in alternating directions, faded at both
 * edges and paused on hover.
 */
export default function TechStackCard({ index }: { index?: number }) {
  const columns = split(profile.tech);

  return (
    <Card card="techstack" index={index} ariaLabel="Tools I work with">
      <div className="tech-viewport">
        {columns.map((items, c) => (
          <div className="tech-column" key={c}>
            {/* the list is rendered twice so the -50% loop is seamless */}
            <div className="tech-track" data-direction={DIRECTIONS[c]}>
              {[...items, ...items].map((item, i) => (
                <span className="tech-icon-wrap" key={`${item.slug}-${i}`} title={item.name}>
                  <span className="tech-icon">
                    <img src={iconUrl(item)} alt={item.name} loading="lazy" />
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="tech-fade tech-fade-top" aria-hidden />
      <div className="tech-fade tech-fade-bottom" aria-hidden />
    </Card>
  );
}
