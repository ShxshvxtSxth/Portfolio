"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      role: "Software Developer",
      company: "Enterprise AI Tech",
      period: "JULY 2026 – PRESENT",
      desc: "Leading full-stack engineering of intelligent web services. Designing agentic workflows to automate data analysis tasks. Optimizing distributed API layers and maintaining sub-second latency targets across core service databases."
    },
    {
      role: "Software Engineering Intern",
      company: "Vigorus.AI",
      period: "DECEMBER 2025 – JULY 2026",
      desc: "Core contributor to Chikitsa EMR v2 and Chikitsa HIMS, a healthcare information management system and electronic medical records platform. Designed secure clinical record access APIs, optimized queries, and integrated machine learning modules for medical text indexing."
    }
  ];

  return (
    <section 
      id="experience" 
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-brand-border"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Heading */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-brand-teal uppercase font-display">
            03 / History
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none font-display uppercase">
            My career <br />
            <span className="text-brand-teal">&</span> <br />
            experience
          </h2>
          <p className="text-sm md:text-base text-brand-muted leading-relaxed max-w-xs mt-4">
            Building reliable, critical systems—from enterprise-grade healthcare frameworks to AI automation hubs.
          </p>
        </div>

        {/* Right Column - Timeline Track */}
        <div className="lg:col-span-8 flex flex-col gap-8 relative pl-6 md:pl-10">
          {/* Vertical Timeline Bar */}
          <div className="absolute left-0 top-2 bottom-2 w-[1.5px] bg-brand-border">
            <div className="absolute top-0 left-[-2px] w-1.5 h-1.5 rounded-full bg-brand-teal animate-ping" />
          </div>

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company + exp.role}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Dot Indicator */}
              <div className="absolute left-[-30px] md:left-[-46px] top-2.5 w-3 h-3 rounded-full border border-brand-teal bg-background group-hover:bg-brand-emerald group-hover:border-brand-emerald transition-colors duration-300" />

              {/* Card Container */}
              <div className="p-6 bg-brand-dark/20 border border-brand-border rounded-xl group-hover:border-brand-teal/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white font-display">
                      {exp.role}
                    </h3>
                    <h4 className="text-sm font-semibold text-brand-teal mt-0.5">
                      {exp.company}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-brand-muted tracking-wider uppercase font-display bg-background border border-brand-border px-3 py-1 rounded-full w-fit">
                    {exp.period}
                  </span>
                </div>
                
                <p className="text-sm md:text-base text-brand-muted leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
