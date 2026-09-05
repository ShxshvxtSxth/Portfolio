"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Printer,
  Copy,
  Check,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Award,
  FolderGit2,
  Wrench,
  ExternalLink,
} from "lucide-react";
import { profile } from "@/lib/profile";

export interface ResumeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeDialog({ isOpen, onClose }: ResumeDialogProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resume } = profile;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    const text = `
SHASHVAT SETH
Software Developer
Location: ${resume.location} | Phone: ${resume.phone} | Email: ${resume.email}
LinkedIn: ${resume.linkedin} | GitHub: ${resume.github}

PROFESSIONAL SUMMARY
${resume.summary}

PROFESSIONAL EXPERIENCE
${resume.experience
  .map(
    (exp) =>
      `${exp.company} - ${exp.role} (${exp.period}, ${exp.location})\n` +
      exp.points.map((p) => `• ${p}`).join("\n")
  )
  .join("\n\n")}

KEY PROJECTS
${resume.projects
  .map((p) => `${p.title} [${p.stack}]\n${p.description}\n` + p.points.map((pt) => `• ${pt}`).join("\n"))
  .join("\n\n")}

EDUCATION
${resume.education.institution} (${resume.education.period})
${resume.education.degree} - ${resume.education.location}
Coursework: ${resume.education.coursework}

ACHIEVEMENTS & LEADERSHIP
${resume.achievements.map((a) => `• ${a.title}: ${a.description}`).join("\n")}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          id="resume-dialog-root"
          className="fixed inset-0 z-[130] flex items-center justify-center p-2 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-dialog-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-md print:hidden"
            onClick={onClose}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden print:m-0 print:p-0 print:border-none print:shadow-none print:max-h-none print:rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Action Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900 text-white border-b border-zinc-800 print:hidden">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-200">
                  Official Resume · Shashvat Seth
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-lg transition-colors flex items-center gap-1.5"
                  title="Copy plain text resume"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copied ? "Copied" : "Copy Text"}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume"
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Document Paper */}
            <div
              className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-zinc-900 font-sans print:p-0"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Header */}
              <div className="border-b-2 border-zinc-900 pb-4 mb-5">
                <h1
                  id="resume-dialog-title"
                  className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-950"
                >
                  {resume.name}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs sm:text-sm text-zinc-700 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {resume.location}
                  </span>
                  <span>•</span>
                  <a href={`tel:${resume.phone}`} className="flex items-center gap-1 hover:text-indigo-600">
                    <Phone className="w-3.5 h-3.5 text-zinc-500" />
                    {resume.phone}
                  </a>
                  <span>•</span>
                  <a href={`mailto:${resume.email}`} className="flex items-center gap-1 hover:text-indigo-600">
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    {resume.email}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-1 text-xs sm:text-sm font-medium text-indigo-700">
                  <a
                    href={resume.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-indigo-600" />
                    linkedin.com/in/shashvat-seth
                  </a>
                  <span>•</span>
                  <a
                    href={resume.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Github className="w-3.5 h-3.5 text-indigo-600" />
                    github.com/ShxshvxtSxth
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-zinc-700" />
                  Professional Summary
                </h2>
                <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-700">
                  {resume.summary}
                </p>
              </div>

              {/* Technical Skills */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-zinc-700" />
                  Technical Skills
                </h2>
                <div className="text-xs sm:text-[13px] leading-relaxed text-zinc-700 space-y-1">
                  <div>
                    <strong className="text-zinc-900">Frontend & UI:</strong> React 19, Next.js 15, TypeScript, Tailwind CSS, Shadcn/UI, Three.js, HTML5/CSS3
                  </div>
                  <div>
                    <strong className="text-zinc-900">State, Data & Forms:</strong> Zustand, TanStack Query, TanStack Table, IndexedDB, React Hook Form, Zod, @dnd-kit
                  </div>
                  <div>
                    <strong className="text-zinc-900">Backend & Databases:</strong> Node.js, Express.js, FastAPI, Prisma ORM, PostgreSQL, NeonDB, MongoDB, REST APIs
                  </div>
                  <div>
                    <strong className="text-zinc-900">AI / ML & Agentic Systems:</strong> LLM APIs & Prompt Eng., Agentic Architectures, PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy
                  </div>
                  <div>
                    <strong className="text-zinc-900">Programming Languages:</strong> TypeScript, JavaScript (ES6+), Python, C/C++, Java, Rust
                  </div>
                  <div>
                    <strong className="text-zinc-900">Auth, Tools & Infrastructure:</strong> Clerk Auth, JWT, Git / GitHub, Vite, Vonage Video, i18n, EmailJS
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-zinc-700" />
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {resume.experience.map((exp, i) => (
                    <div key={i} className="text-xs sm:text-[13px]">
                      <div className="flex items-baseline justify-between font-bold text-zinc-900">
                        <span>{exp.company}</span>
                        <span className="text-zinc-600 font-normal">{exp.location}</span>
                      </div>
                      <div className="flex items-baseline justify-between text-zinc-700 italic mb-1.5 font-medium">
                        <span>{exp.role}</span>
                        <span className="not-italic text-zinc-500 text-[11px]">{exp.period}</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-zinc-700 leading-relaxed">
                        {exp.points.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Projects */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3 flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-zinc-700" />
                  Key Projects
                </h2>
                <div className="space-y-3.5">
                  {resume.projects.map((proj, i) => (
                    <div key={i} className="text-xs sm:text-[13px]">
                      <div className="flex flex-wrap items-baseline justify-between gap-1 font-bold text-zinc-950">
                        <span>{proj.title}</span>
                        <span className="text-zinc-500 font-normal text-[11px] italic">{proj.stack}</span>
                      </div>
                      <p className="text-zinc-700 mt-0.5 leading-relaxed">{proj.description}</p>
                      <ul className="list-disc pl-4 space-y-0.5 text-zinc-700 mt-1 leading-relaxed">
                        {proj.points.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-700" />
                  Education
                </h2>
                <div className="text-xs sm:text-[13px]">
                  <div className="flex items-baseline justify-between font-bold text-zinc-900">
                    <span>{resume.education.institution}</span>
                    <span className="text-zinc-600 font-normal">{resume.education.location}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-zinc-700 font-medium">
                    <span>{resume.education.degree}</span>
                    <span className="text-zinc-500 text-[11px]">{resume.education.period}</span>
                  </div>
                  <div className="text-zinc-600 mt-1 text-[11px] leading-relaxed">
                    <strong className="text-zinc-800">Key Coursework:</strong> {resume.education.coursework}
                  </div>
                </div>
              </div>

              {/* Achievements & Leadership */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-zinc-700" />
                  Achievements & Leadership
                </h2>
                <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-[13px] text-zinc-700 leading-relaxed">
                  {resume.achievements.map((ach, i) => (
                    <li key={i}>
                      <strong className="text-zinc-900">{ach.title}:</strong> {ach.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
