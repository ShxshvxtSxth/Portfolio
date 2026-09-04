/**
 * Single source of truth for every piece of content in the bento grid.
 * Edit values here — no card component hardcodes copy.
 *
 * Items marked TODO are placeholders inferred from the previous site build:
 * replace them with your real numbers/links.
 */

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface TechItem {
  /** simple-icons slug, see https://simpleicons.org */
  slug: string;
  name: string;
  /** hex without "#", omit for the brand default colour */
  color?: string;
}

export interface ProjectItem {
  title: string;
  /** optional screenshot in /public/projects, e.g. "/projects/emr.png" */
  image?: string;
  /** css gradient used until a screenshot exists */
  gradient: string;
  href?: string;
}

/** One run of the headline; `gradient` paints it with the animated gradient. */
export interface AboutSegment {
  text: string;
  gradient?: "a" | "b";
}

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  location: string;
  locationShort: string;
  timezone: string;
  timezoneLabel: string;
  countryFlag: string;
  email: string;
  resumeUrl: string;
  avatar: string;
  about: AboutSegment[];
  socials: SocialLink[];
  leetcode: {
    handle: string;
    url: string;
    rank: string;
    rating: string;
    solved: { easy: number; medium: number; hard: number };
    totals: { easy: number; medium: number; hard: number };
    notes: { text: string; top: string; left?: string; right?: string; rotate?: number }[];
  };
  github: {
    handle: string;
    url: string;
    since: string;
    stats: { repos: number; contributions: number };
  };
  certifications: {
    count: number;
    label: string;
    featured: {
      issuer: string;
      program: string;
      department: string;
      period: string;
      mode: string;
      meta: string;
      file: string;
    };
  };
  currentRole: { prefix: string; org: string; url: string };
  experience: {
    title: string;
    clients: string[];
    more: string;
    testimonial: { quote: string; author: string; role: string };
  };
  trophy: { headline: string; lines: string[] };
  education: { degree: string; field: string; institution: string; sticker: string };
  nowPlaying: { track: string; artist: string; url: string; cover: string; audio?: string };
  vibe: { image?: string; status: string; title: string; rating: number };
  projects: ProjectItem[];
  projectsCount: string;
  tech: TechItem[];
  aiChat: { ring: string; intro: string; placeholder: string };
}

export const profile: Profile = {
  name: "Shashvat Seth",
  firstName: "SHASHVAT",
  role: "Software Developer & AI Engineer",
  location: "India",
  locationShort: "India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "GMT +5:30",
  countryFlag: "🇮🇳",
  email: "shashvat.seth@vigorus.ai",
  resumeUrl: "/resume.pdf", // TODO: drop your resume at public/resume.pdf
  avatar: "/hero.png", // pixel-art character, background removed from hero-source.jpg

  about: [
    { text: "I am a " },
    { text: "software developer", gradient: "a" },
    { text: " who builds scalable full-stack systems and ships " },
    { text: "AI/ML agents", gradient: "b" },
    { text: " that solve real clinical problems." },
  ],

  socials: [
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/shashvat-seth" },
    { id: "github", label: "GitHub", href: "https://github.com/ShxshvxtSxth" },
    { id: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/ShxshvxtSxth/" },
    { id: "mail", label: "Email", href: "mailto:sethshashvat18@gmail.com" },
    { id: "x", label: "X", href: "https://x.com/" }, // TODO
    { id: "instagram", label: "Instagram", href: "https://instagram.com/" }, // TODO
    { id: "discord", label: "Discord", href: "https://discord.com/" }, // TODO
  ],

  leetcode: {
    handle: "ShxshvxtSxth",
    url: "https://leetcode.com/u/ShxshvxtSxth/",
    rank: "top 12%",
    rating: "1650 rating",
    solved: { easy: 120, medium: 145, hard: 32 }, // TODO: real counts
    totals: { easy: 880, medium: 1850, hard: 820 },
    notes: [
      { text: "// binary search", top: "12%", left: "12%", rotate: -3 },
      { text: "dp = Array(n).fill(0)", top: "20%", right: "8%", rotate: -8 },
      { text: "while (i < j)", top: "48%", left: "7%", rotate: 2 },
      { text: "mid = low + (high - low) / 2", top: "72%", right: "9%", rotate: -4 },
      { text: "O(n log n)", top: "86%", left: "14%", rotate: 3 },
    ],
  },

  github: {
    handle: "ShxshvxtSxth",
    url: "https://github.com/ShxshvxtSxth",
    since: "since 2022", // TODO
    stats: { repos: 34, contributions: 1200 }, // TODO
  },

  certifications: {
    count: 12, // TODO: real count
    label: "courses &\ncertifications",
    // shown when the tile is hovered; the file opens on click
    featured: {
      issuer: "IIT Kanpur",
      program: "PYTHON for AI, Machine Learning & Deep Learning",
      department: "Dept. of Electrical Engineering · Office of Outreach Activities",
      period: "1–27 June 2025",
      mode: "4-week online certificate program",
      meta: "NumPy · Pandas · scikit-learn · TensorFlow/Keras · CNNs, RNNs & transformers",
      file: "/certificates/iitk-python-ai-ml-dl.pdf",
    },
  },

  currentRole: {
    prefix: "software developer @",
    org: "VIGORUS.AI",
    url: "https://vigorus.ai",
  },

  experience: {
    title: "2 years of building\nproducts for real users", // TODO: verify
    clients: ["A", "R", "M", "K", "S"],
    more: "16+",
    testimonial: {
      quote:
        "Shashvat shipped the EMR integration ahead of schedule and cut our clinical dashboard load times by 40%. He owns problems end to end.",
      author: "Product Lead",
      role: "Vigorus.AI",
    }, // TODO: replace with a real quote
  },

  trophy: {
    headline: "Healthcare AI at Scale",
    lines: ["Chikitsa EMR v2 · HIMS", "40% faster dashboards", "ICD-10 agent · 92% precision"],
  },

  education: {
    degree: "Bachelor of Technology",
    field: "Computer Engineering", // TODO: verify the branch
    institution: "Jaypee University of Engineering & Technology",
    sticker: "🎓",
  },

  nowPlaying: {
    track: "God's Plan",
    artist: "Drake",
    url: "https://open.spotify.com/track/6DCZcSspjsKoFjzjrWoCdn",
    cover: "linear-gradient(135deg, #1f2937, #4b5563 45%, #111827)",
    // played in-page by the card's play button; the album tile still links out
    audio: "/audio/gods-plan.mp3",
  },

  vibe: {
    // animated loop stitched from the source GIFs; clear `image` to fall back
    // to the generative 3D scene
    image: "/vibe.webp",
    status: "currently watching",
    title: "Demon Slayer",
    rating: 5,
  },

  projects: [
    { title: "Chikitsa EMR v2", gradient: "linear-gradient(135deg,#38bdf8,#6366f1)" },
    { title: "HIMS Queue Scheduler", gradient: "linear-gradient(135deg,#34d399,#0f766e)" },
    { title: "Clinical NLP Agent", gradient: "linear-gradient(135deg,#e879f9,#7c3aed)" },
    { title: "Project 04", gradient: "linear-gradient(135deg,#fbbf24,#ea580c)" },
    { title: "Project 05", gradient: "linear-gradient(135deg,#fb7185,#be123c)" },
    { title: "Project 06", gradient: "linear-gradient(135deg,#22d3ee,#2563eb)" },
    { title: "Project 07", gradient: "linear-gradient(135deg,#a3e635,#15803d)" },
    { title: "Project 08", gradient: "linear-gradient(135deg,#a78bfa,#4338ca)" },
    { title: "Project 09", gradient: "linear-gradient(135deg,#94a3b8,#1e293b)" },
    { title: "Project 10", gradient: "linear-gradient(135deg,#f87171,#9f1239)" },
  ], // TODO: replace placeholders + add /public/projects screenshots

  projectsCount: "10+",

  tech: [
    { slug: "python", name: "Python" },
    { slug: "typescript", name: "TypeScript" },
    { slug: "react", name: "React" },
    { slug: "nextdotjs", name: "Next.js", color: "0f172a" },
    { slug: "nodedotjs", name: "Node.js" },
    { slug: "express", name: "Express", color: "0f172a" },
    { slug: "fastapi", name: "FastAPI" },
    { slug: "postgresql", name: "PostgreSQL" },
    { slug: "mongodb", name: "MongoDB" },
    { slug: "redis", name: "Redis" },
    { slug: "docker", name: "Docker" },
    { slug: "tailwindcss", name: "Tailwind CSS" },
    { slug: "html5", name: "HTML5" },
    { slug: "threedotjs", name: "Three.js", color: "0f172a" },
    { slug: "pytorch", name: "PyTorch" },
    { slug: "langchain", name: "LangChain", color: "0f172a" },
    { slug: "git", name: "Git" },
    { slug: "github", name: "GitHub", color: "0f172a" },
    { slug: "vercel", name: "Vercel", color: "0f172a" },
    { slug: "figma", name: "Figma" },
    { slug: "prisma", name: "Prisma", color: "0f172a" },
  ],

  aiChat: {
    ring: "talk to my ai • he knows about me • get an instant reply • lets have a chat • ",
    intro: "Hey! I'm Shashvat's assistant. Ask me about his stack, experience, projects or how to reach him.",
    placeholder: "Ask me anything about Shashvat…",
  },
};

export default profile;
