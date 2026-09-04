"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code2 } from "lucide-react";

export default function WhatIDo() {
  const categories = [
    {
      title: "AGENTIC AI & LLMS",
      icon: <Cpu className="text-brand-teal" size={24} />,
      subtitle: "Intelligent Systems & Reasoning",
      desc: "Specialist in designing autonomous AI agents, Retrieval-Augmented Generation (RAG) pipelines, and fine-tuning large language models. I build architectures that solve complex business logic and clinical decisions rather than simple wrappers.",
      tags: [
        "Agentic AI",
        "RAG & Retrieval",
        "Large Language Models",
        "Multimodal AI",
        "Computer Vision",
        "Healthcare AI",
        "LangChain / LlamaIndex",
        "Guardrails & Evals"
      ],
      glow: "glow-card"
    },
    {
      title: "SOFTWARE ENGINEERING",
      icon: <Code2 className="text-brand-emerald" size={24} />,
      subtitle: "Robust & Scalable Systems",
      desc: "Experienced full-stack engineer building production-ready architectures, secure distributed APIs, and reliable database structures. Specialized in modern web development frameworks and enterprise system integrations.",
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "Distributed Systems",
        "API Gateways"
      ],
      glow: "glow-card-emerald"
    }
  ];

  return (
    <section 
      id="whatido" 
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-brand-border"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Heading */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-brand-teal uppercase font-display">
            02 / Core Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none font-display uppercase">
            W<span className="text-brand-teal">HAT</span> <br />
            I <span className="text-brand-emerald">DO</span>
          </h2>
          <p className="text-sm md:text-base text-brand-muted leading-relaxed max-w-xs mt-4">
            Solving engineering challenges at the convergence of traditional software logic and artificial cognitive agents.
          </p>
        </div>

        {/* Right Column - Cards with Dash-borders */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`p-8 bg-brand-dark/40 border border-brand-border rounded-xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${cat.glow}`}
            >
              {/* Corner accent decal */}
              <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-border group-hover:bg-brand-teal transition-colors duration-300" />
              </div>

              <div>
                {/* Header icon + category */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-background rounded-lg border border-brand-border group-hover:border-brand-teal/30 transition-colors duration-300">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide font-display">
                      {cat.title}
                    </h3>
                    <h4 className="text-xs text-brand-muted font-medium mt-0.5">
                      {cat.subtitle}
                    </h4>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-brand-muted leading-relaxed mb-8 group-hover:text-slate-300 transition-colors duration-300">
                  {cat.desc}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h5 className="text-[10px] font-bold tracking-widest text-white uppercase mb-3 font-display">
                  Skillset & Stack
                </h5>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-2.5 py-1 bg-background border border-brand-border rounded-md text-slate-400 group-hover:border-brand-teal/20 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
