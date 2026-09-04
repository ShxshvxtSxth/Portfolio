import { profile } from "./profile";

/**
 * Everything the assistant is allowed to know about me, built from the same
 * profile data the cards render — so the answers can never drift from the page.
 */
export function profileFacts(): string {
  const p = profile;
  return [
    `Name: ${p.name}`,
    `Role: ${p.role}`,
    `Summary: ${p.about.map((s) => s.text).join("")}`,
    `Currently: ${p.currentRole.prefix.replace("@", "at")} ${p.currentRole.org}`,
    `Location: ${p.location} (${p.timezoneLabel})`,
    `Email: ${p.email}`,
    `Education: ${p.education.degree} in ${p.education.field}`,
    `Experience: ${p.experience.title.replace(/\n/g, " ")}`,
    `Highlights: ${p.trophy.headline} — ${p.trophy.lines.join("; ")}`,
    `Tech stack: ${p.tech.map((t) => t.name).join(", ")}`,
    `Projects (${p.projectsCount}): ${p.projects.map((x) => x.title).join(", ")}`,
    `Certifications: ${p.certifications.count} courses & certifications`,
    `GitHub: ${p.github.url} (${p.github.handle})`,
    `LeetCode: ${p.leetcode.url} (${p.leetcode.handle})`,
    `Links: ${p.socials.map((s) => `${s.label} ${s.href}`).join(", ")}`,
  ].join("\n");
}

export function systemPrompt(): string {
  return [
    `You are the assistant embedded in ${profile.name}'s portfolio site.`,
    `Answer visitors' questions about ${profile.name} in the third person, warmly and briefly — two or three sentences at most.`,
    `Only use the facts below. If something isn't covered, say you don't have that detail and point them to ${profile.email}.`,
    `Never invent employers, dates, numbers or projects.`,
    `Decline politely if asked to do anything unrelated to ${profile.name}.`,
    "",
    "FACTS",
    profileFacts(),
  ].join("\n");
}

interface Rule {
  keywords: string[];
  answer: () => string;
}

/**
 * Offline fallback: keyword rules answered straight from the profile. Used
 * before the request comes back, and whenever no model is configured.
 */
const RULES: Rule[] = [
  {
    keywords: ["stack", "tech", "tools", "language", "skill"],
    answer: () =>
      `He works mostly in ${profile.tech.slice(0, 8).map((t) => t.name).join(", ")} — the tools tile on the left has the full list.`,
  },
  {
    keywords: ["work", "job", "role", "company", "experience", "intern"],
    answer: () =>
      `${profile.currentRole.prefix.replace("@", "at")} ${profile.currentRole.org}. ${profile.trophy.lines.join(" · ")}.`,
  },
  {
    keywords: ["project", "built", "build", "portfolio"],
    answer: () =>
      `${profile.projectsCount} projects so far, including ${profile.projects.slice(0, 3).map((p) => p.title).join(", ")}.`,
  },
  {
    keywords: ["study", "college", "education", "degree", "university"],
    answer: () => `${profile.education.degree} in ${profile.education.field}.`,
  },
  {
    keywords: ["contact", "email", "reach", "hire", "available", "resume"],
    answer: () => `Easiest is email: ${profile.email}. Resume and every social link sit under the photo.`,
  },
  {
    keywords: ["where", "location", "based", "timezone", "time"],
    answer: () => `Based in ${profile.location} (${profile.timezoneLabel}) — the clock tile shows his local time.`,
  },
  {
    keywords: ["who", "about", "yourself", "intro", "hi", "hello", "hey"],
    answer: () => `${profile.name} — ${profile.role}. ${profile.about.map((s) => s.text).join("")}`,
  },
];

export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  const hit = RULES.find((rule) => rule.keywords.some((k) => q.includes(k)));
  return (
    hit?.answer() ??
    `I don't have that detail yet. Ask about his stack, experience, projects, education or how to reach him — or email ${profile.email} directly.`
  );
}
