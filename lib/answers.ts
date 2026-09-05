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
    `You are Shashvat Seth's Portfolio Assistant.`,
    ``,
    `Answer ONLY questions about Shashvat, his skills, experience, projects, education, achievements, and professional background.`,
    ``,
    `RULES:`,
    `- Answer in 1–2 short sentences.`,
    `- Maximum 40 words.`,
    `- Be direct and factual.`,
    `- No unnecessary explanation.`,
    `- No introductions or conclusions.`,
    `- Never repeat the question.`,
    `- Never invent information.`,
    `- If information is unavailable, say:`,
    `  "I don't have that information."`,
    ``,
    `Use only verified information from Shashvat's portfolio.`,
    ``,
    `Example:`,
    ``,
    `Q: Who is Shashvat?`,
    `A: Shashvat Seth is a Software Developer focused on AI, software engineering, and building practical digital products.`,
    ``,
    `Q: What does Shashvat know?`,
    `A: Python, Kotlin, JavaScript, TypeScript, React, Next.js, FastAPI, Android, RAG, LLMs, NLP, and Voice AI.`,
    ``,
    `Q: What has he built?`,
    `A: His key projects include Nag, a voice-powered productivity app, and Plant Rescue AI, an AI-powered agricultural assistant.`,
    ``,
    `Q: What is Nag?`,
    `A: Nag is a voice-powered Android productivity app that reminds users about unfinished tasks.`,
    ``,
    `Q: What is Plant Rescue AI?`,
    `A: Plant Rescue AI uses RAG, LLMs, NLP, and voice interaction to provide practical agricultural assistance.`,
    ``,
    `Q: Can I contact Shashvat?`,
    `A: Yes. Use the email or LinkedIn links available on his portfolio.`,
    ``,
    `Q: What if you don't know something?`,
    `A: I don't have that information.`,
    ``,
    `VERIFIED INFORMATION:`,
    profileFacts(),
    `Nag: A voice-powered Android productivity app that reminds users about unfinished tasks.`,
    `Plant Rescue AI: An AI-powered agricultural assistant using RAG, LLMs, NLP, and voice interaction.`,
  ].join("\n");
}

interface Rule {
  keywords: string[];
  answer: () => string;
}

/**
 * Offline fallback: keyword rules answered straight from verified portfolio information.
 */
const RULES: Rule[] = [
  {
    keywords: ["who is shashvat", "who are you", "about shashvat", "who is he", "who r u"],
    answer: () =>
      "Shashvat Seth is a Software Developer focused on AI, software engineering, and building practical digital products.",
  },
  {
    keywords: ["what does shashvat know", "know", "skills", "stack", "tech", "languages", "tools"],
    answer: () =>
      "Python, Kotlin, JavaScript, TypeScript, React, Next.js, FastAPI, Android, RAG, LLMs, NLP, and Voice AI.",
  },
  {
    keywords: ["what is nag", "nag"],
    answer: () =>
      "Nag is a voice-powered Android productivity app that reminds users about unfinished tasks.",
  },
  {
    keywords: ["what is plant rescue ai", "plant rescue", "plant rescue ai"],
    answer: () =>
      "Plant Rescue AI uses RAG, LLMs, NLP, and voice interaction to provide practical agricultural assistance.",
  },
  {
    keywords: ["what has he built", "built", "projects", "build"],
    answer: () =>
      "His key projects include Nag, a voice-powered productivity app, and Plant Rescue AI, an AI-powered agricultural assistant.",
  },
  {
    keywords: ["work", "experience", "job", "vigorus", "intern"],
    answer: () =>
      `Shashvat worked at Vigorus Health Tech as a Software Developer, building healthcare systems like Chikitsa EMR v2 and HIMS Queue Scheduler.`,
  },
  {
    keywords: ["education", "degree", "college", "university", "study"],
    answer: () =>
      `${profile.education.degree} in ${profile.education.field}.`,
  },
  {
    keywords: ["contact", "email", "reach", "hire", "linkedin"],
    answer: () =>
      "Yes. Use the email or LinkedIn links available on his portfolio.",
  },
  {
    keywords: ["location", "where", "city", "based"],
    answer: () =>
      `Shashvat is based in ${profile.location}.`,
  },
];

export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  const hit = RULES.find((rule) => rule.keywords.some((k) => q.includes(k)));
  return hit ? hit.answer() : "I don't have that information.";
}
