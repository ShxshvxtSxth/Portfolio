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
  category?: string;
}

export interface TechProficiencyCategory {
  title: string;
  items: TechItem[];
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

export interface ResumeExperience {
  company: string;
  role: string;
  location: string;
  period: string;
  points: string[];
}

export interface ResumeProject {
  title: string;
  stack: string;
  description: string;
  points: string[];
}

export interface ResumeData {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: ResumeExperience[];
  projects: ResumeProject[];
  education: {
    institution: string;
    degree: string;
    location: string;
    period: string;
    coursework: string;
  };
  achievements: {
    title: string;
    description: string;
  }[];
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
  phone: string;
  resumeUrl: string;
  resume: ResumeData;
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
  technicalProficiency: TechProficiencyCategory[];
  tech: TechItem[];
  aiChat: {
    name: string;
    ring: string;
    intro: string;
    placeholder: string;
    suggestedPrompts: string[];
  };
}

export const profile: Profile = {
  name: "Shashvat Seth",
  firstName: "SHASHVAT",
  role: "Software Developer & AI Engineer",
  location: "Pune, India",
  locationShort: "Pune, India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "GMT +5:30",
  countryFlag: "🇮🇳",
  email: "sethshashvat18@gmail.com",
  phone: "+91 9532914996",
  resumeUrl: "/resume.pdf",
  resume: {
    name: "SHASHVAT SETH",
    location: "Pune, India",
    phone: "+91 9532914996",
    email: "sethshashvat18@gmail.com",
    linkedin: "https://www.linkedin.com/in/shashvat-seth-516472364/",
    github: "https://github.com/ShxshvxtSxth",
    summary:
      "Software Developer with practical experience in full-stack web development, scalable frontend architectures, AI-assisted workflows, and modern software systems. Proven track record of delivering enterprise-grade healthcare platforms with Next.js 15, React 19, and LLM integrations, reducing manual data entry by 60% and API overhead by 40%.",
    experience: [
      {
        company: "Vigorus.AI",
        role: "Software Developer",
        location: "Pune, India",
        period: "Dec 2025 – Present",
        points: [
          "Architected enterprise Next.js 15 and React 19 EMR platform (Chikitsa v2), orchestrating patient clinical pathways, billing automation, and inventory control.",
          "Integrated Generative AI and LLM APIs for intelligent medical record interpretation, automated symptom summaries, and predictive clinical inputs.",
          "Engineered foundation for agentic AI workflows, empowering autonomous task execution, adaptive patient questionnaires, and context-aware clinical decision support.",
          "Built a dynamic drag-and-drop form builder using React Hook Form, Zod, and @dnd-kit, slashing clinical form configuration turnaround from several days to under 15 minutes. [< 15 mins]",
        ],
      },
      {
        company: "Agnirva",
        role: "AI Internship Program",
        location: "Remote / Hybrid",
        period: "May 2025 – July 2025",
        points: [
          "Developed machine learning pipelines and exploratory data analysis routines utilizing Python, Scikit-learn, Pandas, and NumPy.",
          "Researched and trained neural network architectures using PyTorch and TensorFlow for pattern recognition tasks.",
        ],
      },
    ],
    projects: [
      {
        title: "Doctor Appointment & Telehealth Platform",
        stack: "Next.js, Tailwind CSS, Prisma, PostgreSQL, NeonDB, Clerk, Vonage, Shadcn/UI",
        description:
          "A production-grade full-stack healthcare platform enabling seamless patient-doctor discovery, automated scheduling, secure card payments, and encrypted real-time video consultations.",
        points: [
          "Doctor verification & credentialing onboarding workflow with administrative review dashboard",
          "Automated calendar booking and appointment management synced with secure payment gateway",
          "Encrypted WebRTC real-time video consultations powered by Vonage Video API",
        ],
      },
      {
        title: "AI-Powered EMR & Hospital Management (Chikitsa v2)",
        stack: "Next.js 15, React 19, LLM APIs, Zustand, TanStack Query, IndexedDB, TanStack Table, Zod",
        description:
          "An enterprise electronic medical record (EMR) system tailored for hospitals, featuring offline-first reliability, AI-assisted diagnosis documentation, and automated billing.",
        points: [
          "Intelligent LLM clinical assistant extracting structured vitals and diagnoses from unstructured notes",
          "Offline-first sync engine with IndexedDB local caching and optimistic TanStack Table mutations",
          "Drag-and-drop dynamic medical form builder slashing clinical deployment to <15 mins",
        ],
      },
      {
        title: "Interactive 3D Developer Portfolio",
        stack: "React.js, Tailwind CSS, Vite, Three.js, EmailJS, Motion",
        description:
          "An immersive developer portfolio featuring interactive 3D WebGL scenes, physics-based canvas effects, smooth route transitions, and an automated EmailJS contact gateway.",
        points: [
          "Custom 3D canvas viewport rendering interactive geometries and lighting rigs",
          "Responsive Bento Grid architectural design with zero-layout-shift micro-interactions",
          "Direct automated inquiry pipeline via EmailJS API integration",
        ],
      },
    ],
    education: {
      institution: "Jaypee University of Engineering and Technology (JUET)",
      degree: "B.Tech in Computer Science and Engineering — Undergraduate",
      location: "Guna, Madhya Pradesh",
      period: "2022 – 2026",
      coursework:
        "Data Structures & Algorithms, Operating Systems, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Software Engineering",
    },
    achievements: [
      {
        title: "LeetCode 100+ Problem Solver",
        description:
          "Solved 100+ Data Structures & Algorithms challenges across Trees, Dynamic Programming, Graphs, and Arrays with consistent algorithmic efficiency.",
      },
      {
        title: "IIT Kanpur AI/ML Certification",
        description:
          "Successfully completed intensive advanced coursework on Python for Artificial Intelligence, Machine Learning and Deep Learning.",
      },
      {
        title: "Academic Distinction (95% CBSE XII)",
        description:
          "Secured 95% in CBSE Class XII Board Examinations with academic excellence in Mathematics and Computer Science.",
      },
      {
        title: "Mr. Fascino Awardee (JUET)",
        description:
          "Awarded the Mr. Fascino title during freshman year in recognition of exceptional communication skills, personality, and active university presence.",
      },
      {
        title: "Sponsorship Team Executive (D'EQUINOX Cultural Fest)",
        description:
          "Spearheaded outreach, corporate pitches, and negotiations with regional and national brand sponsors, raising significant funding for the premiere cultural festival.",
      },
    ],
  },
  avatar: "/hero.png", // character cutout

  about: [
    { text: "I am a " },
    { text: "Software Developer", gradient: "a" },
    { text: " crafting scalable full-stack systems and shipping " },
    { text: " intelligent AI agents", gradient: "b" },
    { text: " that solve critical real-life challenges." },
  ],

  socials: [
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/shashvat-seth-516472364/" },
    { id: "github", label: "GitHub", href: "https://github.com/ShxshvxtSxth" },
    { id: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/ShxshvxtSxth/" },
    { id: "mail", label: "Email", href: "mailto:sethshashvat18@gmail.com" },
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
    prefix: "Software Developer @",
    org: "VIGORUS.AI",
    url: "https://vigorus.ai",
  },

  experience: {
    title: "2 years of building\nproducts for real users", // TODO: verify
    clients: ["A", "R", "M", "K", "S"],
    more: "16+",
    testimonial: {
      quote:
        "Shashvat architected our EMR v2 clinical pathways and LLM interpretation ahead of schedule, slashing clinical form turnaround to under 15 minutes. Exceptional full-stack ownership.",
      author: "Product & Clinical Lead",
      role: "Vigorus.AI (Healthcare Platform)",
    },
  },

  trophy: {
    headline: "Healthcare AI at Scale",
    lines: ["Chikitsa EMR v2 · HIMS", "40% faster dashboards", "ICD-10 agent · 92% precision"],
  },

  education: {
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Jaypee University of Engineering & Technology",
    sticker: "🎓",
  },

  nowPlaying: {
    track: "God's Plan",
    artist: "Drake",
    url: "https://open.spotify.com/track/6DCZcSspjsKoFjzjrWoCdn",
    cover: "/gods-plan.jpg",
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
    { title: "Telehealth Platform", gradient: "linear-gradient(135deg,#0ea5e9,#2563eb)" },
    { title: "Chikitsa EMR v2", gradient: "linear-gradient(135deg,#38bdf8,#6366f1)" },
    { title: "3D Developer Portfolio", gradient: "linear-gradient(135deg,#ec4899,#8b5cf6)" },
    { title: "Plant Rescue AI", gradient: "linear-gradient(135deg,#22c55e,#15803d)" },
    { title: "HIMS Queue Scheduler", gradient: "linear-gradient(135deg,#34d399,#0f766e)" },
    { title: "Clinical NLP Agent", gradient: "linear-gradient(135deg,#e879f9,#7c3aed)" },
    { title: "Nag Task Engine", gradient: "linear-gradient(135deg,#6366f1,#a855f7)" },
    { title: "Doctor Onboarding", gradient: "linear-gradient(135deg,#f59e0b,#ef4444)" },
    { title: "Clinical Vitals LLM", gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)" },
    { title: "Smart Scheduling API", gradient: "linear-gradient(135deg,#84cc16,#10b981)" },
  ],

  projectsCount: "10+",

  technicalProficiency: [
    {
      title: "Frontend & UI",
      items: [
        { slug: "react", name: "React 19", color: "61dafb", category: "Frontend & UI" },
        { slug: "nextdotjs", name: "Next.js 15", color: "000000", category: "Frontend & UI" },
        { slug: "typescript", name: "TypeScript", color: "3178c6", category: "Frontend & UI" },
        { slug: "tailwindcss", name: "Tailwind CSS", color: "06b6d4", category: "Frontend & UI" },
        { slug: "shadcnui", name: "Shadcn/UI", color: "000000", category: "Frontend & UI" },
        { slug: "threedotjs", name: "Three.js", color: "000000", category: "Frontend & UI" },
        { slug: "html5", name: "HTML5 / CSS3", color: "e34f26", category: "Frontend & UI" },
      ],
    },
    {
      title: "State, Data & Forms",
      items: [
        { slug: "zustand", name: "Zustand", color: "443e38", category: "State, Data & Forms" },
        { slug: "reactquery", name: "TanStack Query", color: "ff4154", category: "State, Data & Forms" },
        { slug: "tanstacktable", name: "TanStack Table", color: "ff4154", category: "State, Data & Forms" },
        { slug: "indexeddb", name: "IndexedDB", color: "3178c6", category: "State, Data & Forms" },
        { slug: "reacthookform", name: "React Hook Form", color: "ec5990", category: "State, Data & Forms" },
        { slug: "zod", name: "Zod", color: "3e67b1", category: "State, Data & Forms" },
        { slug: "dndkit", name: "@dnd-kit", color: "6366f1", category: "State, Data & Forms" },
      ],
    },
    {
      title: "Backend & Databases",
      items: [
        { slug: "nodedotjs", name: "Node.js", color: "5fa04e", category: "Backend & Databases" },
        { slug: "express", name: "Express.js", color: "000000", category: "Backend & Databases" },
        { slug: "fastapi", name: "FastAPI", color: "009688", category: "Backend & Databases" },
        { slug: "prisma", name: "Prisma ORM", color: "2d3748", category: "Backend & Databases" },
        { slug: "postgresql", name: "PostgreSQL", color: "4169e1", category: "Backend & Databases" },
        { slug: "neon", name: "NeonDB", color: "00e599", category: "Backend & Databases" },
        { slug: "mongodb", name: "MongoDB", color: "47a248", category: "Backend & Databases" },
        { slug: "restapi", name: "REST APIs", color: "0284c7", category: "Backend & Databases" },
      ],
    },
    {
      title: "AI / ML & Agentic Systems",
      items: [
        { slug: "llms", name: "LLM APIs & Prompt Eng.", color: "f59e0b", category: "AI / ML & Agentic Systems" },
        { slug: "agentic", name: "Agentic Architectures", color: "8b5cf6", category: "AI / ML & Agentic Systems" },
        { slug: "rag", name: "RAG", color: "6366f1", category: "AI / ML & Agentic Systems" },
        { slug: "voice-ai", name: "Voice AI", color: "06b6d4", category: "AI / ML & Agentic Systems" },
        { slug: "pytorch", name: "PyTorch", color: "ee4c2c", category: "AI / ML & Agentic Systems" },
        { slug: "tensorflow", name: "TensorFlow", color: "ff6f00", category: "AI / ML & Agentic Systems" },
        { slug: "scikitlearn", name: "Scikit-learn", color: "f7931e", category: "AI / ML & Agentic Systems" },
        { slug: "pandas", name: "Pandas", color: "150458", category: "AI / ML & Agentic Systems" },
        { slug: "numpy", name: "NumPy", color: "013243", category: "AI / ML & Agentic Systems" },
      ],
    },
    {
      title: "Programming Languages",
      items: [
        { slug: "typescript", name: "TypeScript", color: "3178c6", category: "Programming Languages" },
        { slug: "javascript", name: "JavaScript (ES6+)", color: "f7df1e", category: "Programming Languages" },
        { slug: "python", name: "Python", color: "3776ab", category: "Programming Languages" },
        { slug: "cplusplus", name: "C / C++", color: "00599c", category: "Programming Languages" },
        { slug: "java", name: "Java", color: "437291", category: "Programming Languages" },
        { slug: "rust", name: "Rust", color: "000000", category: "Programming Languages" },
        { slug: "kotlin", name: "Kotlin", color: "7f52ff", category: "Programming Languages" },
      ],
    },
    {
      title: "Cloud, DevOps & Containers",
      items: [
        { slug: "docker", name: "Docker", color: "2496ed", category: "Cloud, DevOps & Containers" },
        { slug: "azure", name: "Microsoft Azure", color: "0078d4", category: "Cloud, DevOps & Containers" },
        { slug: "aws", name: "Amazon Web Services (AWS)", color: "ff9900", category: "Cloud, DevOps & Containers" },
        { slug: "googlecloud", name: "Google Cloud (GCP)", color: "4285f4", category: "Cloud, DevOps & Containers" },
        { slug: "kubernetes", name: "Kubernetes", color: "326ce5", category: "Cloud, DevOps & Containers" },
        { slug: "linux", name: "Linux", color: "fcc624", category: "Cloud, DevOps & Containers" },
        { slug: "nginx", name: "Nginx", color: "009639", category: "Cloud, DevOps & Containers" },
        { slug: "cicd", name: "CI / CD (GitHub Actions)", color: "2088ff", category: "Cloud, DevOps & Containers" },
        { slug: "vercel", name: "Vercel", color: "000000", category: "Cloud, DevOps & Containers" },
        { slug: "redis", name: "Redis", color: "dc382d", category: "Cloud, DevOps & Containers" },
      ],
    },
    {
      title: "Auth, Tools & Infrastructure",
      items: [
        { slug: "postman", name: "Postman", color: "ff6c37", category: "Auth, Tools & Infrastructure" },
        { slug: "clerk", name: "Clerk Auth", color: "6c47ff", category: "Auth, Tools & Infrastructure" },
        { slug: "jwt", name: "JWT", color: "000000", category: "Auth, Tools & Infrastructure" },
        { slug: "git", name: "Git", color: "f05032", category: "Auth, Tools & Infrastructure" },
        { slug: "github", name: "GitHub", color: "0f172a", category: "Auth, Tools & Infrastructure" },
        { slug: "vite", name: "Vite", color: "646cff", category: "Auth, Tools & Infrastructure" },
        { slug: "figma", name: "Figma", color: "f24e1e", category: "Auth, Tools & Infrastructure" },
        { slug: "bash", name: "Bash / Shell", color: "4eaa25", category: "Auth, Tools & Infrastructure" },
        { slug: "vonage", name: "Vonage Video", color: "000000", category: "Auth, Tools & Infrastructure" },
        { slug: "i18n", name: "i18n", color: "26a69a", category: "Auth, Tools & Infrastructure" },
        { slug: "emailjs", name: "EmailJS", color: "f7df1e", category: "Auth, Tools & Infrastructure" },
        { slug: "android", name: "Android", color: "3ddc84", category: "Auth, Tools & Infrastructure" },
      ],
    },
  ],

  tech: [
    { slug: "react", name: "React 19", color: "61dafb" },
    { slug: "nextdotjs", name: "Next.js 15", color: "0f172a" },
    { slug: "typescript", name: "TypeScript", color: "3178c6" },
    { slug: "python", name: "Python", color: "3776ab" },
    { slug: "fastapi", name: "FastAPI", color: "009688" },
    { slug: "nodedotjs", name: "Node.js", color: "5fa04e" },
    { slug: "docker", name: "Docker", color: "2496ed" },
    { slug: "azure", name: "Microsoft Azure", color: "0078d4" },
    { slug: "aws", name: "AWS", color: "ff9900" },
    { slug: "kubernetes", name: "Kubernetes", color: "326ce5" },
    { slug: "tailwindcss", name: "Tailwind CSS", color: "06b6d4" },
    { slug: "shadcnui", name: "Shadcn/UI", color: "0f172a" },
    { slug: "threedotjs", name: "Three.js", color: "0f172a" },
    { slug: "zustand", name: "Zustand", color: "443e38" },
    { slug: "reactquery", name: "TanStack Query", color: "ff4154" },
    { slug: "tanstacktable", name: "TanStack Table", color: "ff4154" },
    { slug: "indexeddb", name: "IndexedDB", color: "3178c6" },
    { slug: "reacthookform", name: "React Hook Form", color: "ec5990" },
    { slug: "zod", name: "Zod", color: "3e67b1" },
    { slug: "dndkit", name: "@dnd-kit", color: "6366f1" },
    { slug: "express", name: "Express.js", color: "0f172a" },
    { slug: "prisma", name: "Prisma ORM", color: "2d3748" },
    { slug: "postgresql", name: "PostgreSQL", color: "4169e1" },
    { slug: "neon", name: "NeonDB", color: "00e599" },
    { slug: "mongodb", name: "MongoDB", color: "47a248" },
    { slug: "restapi", name: "REST APIs", color: "0284c7" },
    { slug: "llms", name: "LLMs & Prompt Eng.", color: "f59e0b" },
    { slug: "agentic", name: "Agentic Architectures", color: "8b5cf6" },
    { slug: "rag", name: "RAG", color: "6366f1" },
    { slug: "voice-ai", name: "Voice AI", color: "06b6d4" },
    { slug: "pytorch", name: "PyTorch", color: "ee4c2c" },
    { slug: "tensorflow", name: "TensorFlow", color: "ff6f00" },
    { slug: "scikitlearn", name: "Scikit-learn", color: "f7931e" },
    { slug: "pandas", name: "Pandas", color: "150458" },
    { slug: "numpy", name: "NumPy", color: "013243" },
    { slug: "linux", name: "Linux", color: "fcc624" },
    { slug: "postman", name: "Postman", color: "ff6c37" },
    { slug: "nginx", name: "Nginx", color: "009639" },
    { slug: "redis", name: "Redis", color: "dc382d" },
    { slug: "vercel", name: "Vercel", color: "0f172a" },
    { slug: "javascript", name: "JavaScript (ES6+)", color: "f7df1e" },
    { slug: "cplusplus", name: "C / C++", color: "00599c" },
    { slug: "java", name: "Java", color: "437291" },
    { slug: "rust", name: "Rust", color: "0f172a" },
    { slug: "kotlin", name: "Kotlin", color: "7f52ff" },
    { slug: "android", name: "Android", color: "3ddc84" },
    { slug: "clerk", name: "Clerk Auth", color: "6c47ff" },
    { slug: "jwt", name: "JWT", color: "0f172a" },
    { slug: "git", name: "Git", color: "f05032" },
    { slug: "github", name: "GitHub", color: "0f172a" },
    { slug: "vite", name: "Vite", color: "646cff" },
    { slug: "figma", name: "Figma", color: "f24e1e" },
    { slug: "vonage", name: "Vonage Video", color: "0f172a" },
    { slug: "i18n", name: "i18n", color: "26a69a" },
    { slug: "emailjs", name: "EmailJS", color: "f7df1e" },
  ],

  aiChat: {
    name: "Portfolio Assistant",
    ring: "chat with assistant • shashvat's portfolio assistant • ask anything • instant answers • ",
    intro: "Ask me anything about Shashvat's skills, experience, projects, or background.",
    placeholder: "Ask about Shashvat's skills, projects, experience…",
    suggestedPrompts: [
      "Who is Shashvat?",
      "What does Shashvat know?",
      "What has he built?",
      "What is Nag?",
      "What is Plant Rescue AI?",
      "Can I contact Shashvat?",
    ],
  },
};

export default profile;
