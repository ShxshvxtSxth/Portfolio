"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search, Layers, Sparkles, Terminal, Database, Code2, ShieldCheck, Cpu, Cloud } from "lucide-react";
import { profile, type TechItem, type TechProficiencyCategory } from "@/lib/profile";

export interface TechProficiencyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Frontend & UI": <Layers className="w-4 h-4 text-sky-500" />,
  "State, Data & Forms": <Database className="w-4 h-4 text-emerald-500" />,
  "Backend & Databases": <Terminal className="w-4 h-4 text-indigo-500" />,
  "AI / ML & Agentic Systems": <Cpu className="w-4 h-4 text-amber-500" />,
  "Programming Languages": <Code2 className="w-4 h-4 text-rose-500" />,
  "Cloud, DevOps & Containers": <Cloud className="w-4 h-4 text-cyan-500" />,
  "Auth, Tools & Infrastructure": <ShieldCheck className="w-4 h-4 text-violet-500" />,
};

function TechBadge({ item }: { item: TechItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-50/80 hover:bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all duration-200 shadow-xs hover:shadow-md"
      style={{
        ["--item-color" as string]: item.color ? `#${item.color.replace("#", "")}` : "#6366f1",
      }}
    >
      <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200/60 shadow-xs flex items-center justify-center p-1 shrink-0 group-hover:scale-105 transition-transform">
        {!imgFailed ? (
          <img
            src={`/icons/${item.slug}.svg`}
            alt={item.name}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span
            className="text-[10px] font-bold"
            style={{ color: item.color ? `#${item.color.replace("#", "")}` : "#6366f1" }}
          >
            {item.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <span className="text-sm font-medium text-zinc-800 group-hover:text-zinc-950 transition-colors whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

export default function TechProficiencyDialog({ isOpen, onClose }: TechProficiencyDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const categories = useMemo(() => profile.technicalProficiency || [], []);

  // Filter categories and items based on search and active category tab
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return categories
      .filter((cat) => (activeCategory === "All" ? true : cat.title === activeCategory))
      .map((cat) => {
        if (!q) return cat;
        const matchingItems = cat.items.filter(
          (it) => it.name.toLowerCase().includes(q) || cat.title.toLowerCase().includes(q)
        );
        return { ...cat, items: matchingItems };
      })
      .filter((cat) => cat.items.length > 0);
  }, [categories, activeCategory, searchQuery]);

  const totalSkillsCount = useMemo(() => {
    return categories.reduce((sum, c) => sum + c.items.length, 0);
  }, [categories]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tech-dialog-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-zinc-200/80 flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-zinc-100 flex items-start justify-between gap-4 bg-gradient-to-r from-zinc-50/70 via-white to-zinc-50/40">
              <div>
                <div className="flex items-center gap-2">
                  <h2
                    id="tech-dialog-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900"
                  >
                    Technical Proficiency
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    <Sparkles className="w-3 h-3" />
                    {totalSkillsCount} Technologies
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
                  Production stack, specialized frameworks, and engineering tools powering Shashvat&apos;s digital products.
                </p>
              </div>

              <button
                id="tech-dialog-close-button"
                type="button"
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition-colors"
                aria-label="Close technical proficiency modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="px-6 py-3.5 border-b border-zinc-100 bg-white flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveCategory("All")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    activeCategory === "All"
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  All ({totalSkillsCount})
                </button>
                {categories.map((c) => (
                  <button
                    key={c.title}
                    type="button"
                    onClick={() => setActiveCategory(c.title)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                      activeCategory === c.title
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative shrink-0 sm:w-60">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter skills..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-zinc-100 border border-transparent focus:border-zinc-300 focus:bg-white outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7 bg-zinc-50/40">
              {filteredCategories.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-zinc-400 text-sm">No technologies match &ldquo;{searchQuery}&rdquo;</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    }}
                    className="mt-2 text-xs text-indigo-600 hover:underline"
                  >
                    Clear search and filters
                  </button>
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.title} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-md bg-white border border-zinc-200/60 shadow-2xs">
                        {CATEGORY_ICONS[category.title] || <Layers className="w-4 h-4 text-zinc-500" />}
                      </span>
                      <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
                        {category.title}
                      </h3>
                      <span className="text-xs text-zinc-400">({category.items.length})</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {category.items.map((item) => (
                        <TechBadge key={item.slug + item.name} item={item} />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-zinc-100 bg-white flex items-center justify-between text-xs text-zinc-400">
              <span>Updated for 2026 stack</span>
              <span className="hidden sm:inline">Press Esc or click anywhere outside to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
