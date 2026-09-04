import React from "react";
import Card from "./Card";
import { profile } from "@/lib/profile";

/** Degree line with a tilted sticker that straightens on hover. */
export default function EducationCard({ index }: { index?: number }) {
  return (
    <Card card="education" index={index}>
      <h3 className="education-title">
        {profile.education.degree} in {profile.education.field}
      </h3>
      <span className="education-institution">{profile.education.institution}</span>
      <span className="education-sticker" aria-hidden>
        {profile.education.sticker}
      </span>
    </Card>
  );
}
