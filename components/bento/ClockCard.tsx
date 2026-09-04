"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";

function format(tz: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const month = get("month").replace(/\.$/, "").slice(0, 3);
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  const [hh, mm] = time.split(":");
  return { date: `${get("weekday")}, ${get("day")} ${month}`, hh, mm };
}

/**
 * Live clock in my timezone, set in Chakra Petch with a blinking separator.
 * The footer alternates between location and offset, cross-fading the way the
 * reference tile does.
 */
export default function ClockCard({ index }: { index?: number }) {
  const [clock, setClock] = useState<{ date: string; hh: string; mm: string } | null>(null);
  const [panel, setPanel] = useState(0);

  useEffect(() => {
    const tick = () => setClock(format(profile.timezone));
    tick();
    const clockId = window.setInterval(tick, 10_000);
    const panelId = window.setInterval(() => setPanel((p) => (p + 1) % 2), 3_800);
    return () => {
      window.clearInterval(clockId);
      window.clearInterval(panelId);
    };
  }, []);

  return (
    <Card card="clock" index={index}>
      <span className="clock-emoji" aria-hidden>
        🕺
      </span>

      <span className="clock-date">{clock?.date ?? " "}</span>

      <span className="clock-time-wrap">
        <span className="clock-time" suppressHydrationWarning>
          <span className="clock-digits">{clock?.hh ?? "--"}</span>
          <span className="clock-colon" aria-hidden>
            :
          </span>
          <span className="clock-digits">{clock?.mm ?? "--"}</span>
        </span>
      </span>

      <span className="clock-msg-container">
        <span className="clock-msg" data-active={panel === 0}>
          {profile.locationShort}
          <svg className="clock-flag" viewBox="0 0 30 20" aria-hidden>
            <rect width="30" height="20" rx="2" fill="#fff" />
            <rect width="30" height="6.67" rx="2" fill="#ff9933" />
            <rect y="13.33" width="30" height="6.67" rx="2" fill="#138808" />
            <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.9" />
          </svg>
        </span>
        <span className="clock-msg" data-active={panel === 1}>
          {profile.timezoneLabel}
        </span>
      </span>
    </Card>
  );
}
