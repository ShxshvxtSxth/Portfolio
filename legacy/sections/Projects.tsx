"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tools: string;
  link: string;
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);

  const projects: Project[] = [
    {
      title: "Chikitsa EMR v2 Integration Suite",
      category: "Healthcare Technology",
      description: "A secure electronic medical record endpoint manager. Refactored query locks and database structures to index patient records, reducing clinical dashboard load times by 40%.",
      highlights: [
        "Optimized patient retrieval indexing structures",
        "Encrypted database integrations meeting healthcare compliance Standards",
        "Reduced dashboard fetch latency under concurrent queries"
      ],
      tools: "Node.js, PostgreSQL, Docker, REST APIs, Cryptography",
      link: "https://github.com/ShashvxtSxth"
    },
    {
      title: "Chikitsa HIMS Queue Scheduler",
      category: "Infrastructure & Scheduling",
      description: "A distributed scheduler engine handling concurrent clinical queues and doctor appointments. Leverages locking to prevent double bookings and optimize patient check-in workflows.",
      highlights: [
        "Distributed queue management to resolve concurrency race conditions",
        "Real-time client alerts via websocket messaging hubs",
        "Automated backup procedures for records integrity"
      ],
      tools: "Python, Redis, WebSockets, MongoDB, FastAPI",
      link: "https://github.com/ShashvxtSxth"
    },
    {
      title: "Clinical NLP Diagnosis Agent",
      category: "Agentic AI & Computer Vision",
      description: "An AI-powered agent mapping unstructured clinical notes to standard ICD-10 medical diagnostics codes. Features local RAG for prompt templates validation.",
      highlights: [
        "ICD-10 clinical diagnosis automatic labeling",
        "LangChain execution with local Ollama validation guardrails",
        "92% mapping precision in comparative tests"
      ],
      tools: "Python, Ollama, LangChain, ICD-10 Mapping API, NLP",
      link: "https://github.com/ShashvxtSxth"
    }
  ];

  const handleSlide = useCallback((index: number) => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex(index);
    setTimeout(() => setSliding(false), 500);
  }, [sliding]);

  const prevSlide = useCallback(() => {
    const nextIdx = activeIndex === 0 ? projects.length - 1 : activeIndex - 1;
    handleSlide(nextIdx);
  }, [activeIndex, handleSlide, projects.length]);

  const nextSlide = useCallback(() => {
    const nextIdx = activeIndex === projects.length - 1 ? 0 : activeIndex + 1;
    handleSlide(nextIdx);
  }, [activeIndex, handleSlide, projects.length]);

  return (
    <section 
      id="work" 
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-brand-border"
    >
      <div className="flex flex-col gap-12">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest text-brand-teal uppercase font-display">
              04 / Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none font-display uppercase">
              Project <span className="text-brand-teal">Systems</span>
            </h2>
            <p className="text-sm md:text-base text-brand-muted leading-relaxed max-w-md mt-4">
              A selected portfolio of clinical systems engineering, generative AI, and medical infrastructure solutions.
            </p>
          </div>

          <a 
            href="https://github.com/ShashvxtSxth" 
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-brand-dark/40 border border-brand-border hover:border-brand-teal rounded-md text-xs font-semibold text-brand-teal uppercase tracking-widest flex items-center gap-2 w-fit transition-all duration-300"
            data-cursor="icons"
          >
            <span>View Repositories</span>
            <Github size={14} />
          </a>
        </div>

        {/* Carousel implementation */}
        <div className="relative mt-8 p-8 bg-brand-dark/20 border border-brand-border rounded-2xl overflow-hidden min-h-[420px] flex flex-col justify-between">
          
          {/* Navigation Arrows */}
          <div className="absolute top-8 right-8 flex items-center gap-3 z-10">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-md border border-brand-border hover:border-brand-teal flex items-center justify-center text-brand-muted hover:text-brand-teal bg-background/50 transition-all duration-300"
              aria-label="Previous Project"
              data-cursor="icons"
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-md border border-brand-border hover:border-brand-teal flex items-center justify-center text-brand-muted hover:text-brand-teal bg-background/50 transition-all duration-300"
              aria-label="Next Project"
              data-cursor="icons"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Project Details (Framer Motion Animation) */}
          <div className="flex-1 flex flex-col justify-center max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="text-xs font-bold text-brand-teal uppercase tracking-wider font-display bg-brand-teal/10 px-3 py-1 rounded-full">
                    {projects[activeIndex].category}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display uppercase mt-3">
                    {projects[activeIndex].title}
                  </h3>
                </div>

                <p className="text-sm md:text-base text-brand-muted leading-relaxed">
                  {projects[activeIndex].description}
                </p>

                {/* Highlights List */}
                <ul className="flex flex-col gap-2.5 my-2">
                  {projects[activeIndex].highlights.map((h, i) => (
                    <li key={i} className="text-xs md:text-sm text-slate-300 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tools Stack */}
                <div className="flex flex-col gap-1.5 border-t border-brand-border pt-4">
                  <span className="text-[10px] font-bold tracking-widest text-brand-muted uppercase font-display">
                    Technologies & Stack
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-brand-teal font-display uppercase tracking-wide">
                    {projects[activeIndex].tools}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bullet navigation dot indicator */}
          <div className="flex gap-2.5 mt-8 items-center justify-center md:justify-start">
            {projects.map((p, idx) => (
              <button 
                key={p.title}
                onClick={() => handleSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-8 bg-brand-teal" : "bg-brand-border"
                }`}
                aria-label={`Go to project ${idx + 1}`}
                data-cursor="icons"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
