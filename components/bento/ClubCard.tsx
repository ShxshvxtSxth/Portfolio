import React from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";

/** Current-role tile with the soft violet/pink corner gradients. */
export default function ClubCard({ index }: { index?: number }) {
  return (
    <Card card="club" href={profile.currentRole.url} index={index} ariaLabel="Current role">
      <span className="club-prefix">{profile.currentRole.prefix}</span>
      <span className="club-name">{profile.currentRole.org}</span>
    </Card>
  );
}
