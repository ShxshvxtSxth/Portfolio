"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Premium easeOutExpo
      },
    },
  };

  return (
    <section 
      id="landingDiv" 
      className="min-h-screen flex items-center relative px-6 md:px-12 max-w-7xl mx-auto w-full pt-20"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-3/5 flex flex-col gap-6 z-10"
      >
        {/* Cinematic greeting */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
          <span className="text-sm font-semibold tracking-widest text-brand-emerald uppercase font-display">
            Active Session
          </span>
        </motion.div>

        {/* Big cinematic header */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <h2 className="text-lg md:text-xl font-medium text-brand-muted tracking-wide uppercase">
            Hello, I'm
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[0.9] mt-2">
            SHASHVAT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-emerald">
              SETH
            </span>
          </h1>
        </motion.div>

        {/* Professional taglines */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm md:text-base font-semibold text-brand-teal font-display tracking-wide uppercase mt-2"
        >
          <span>Software Developer</span>
          <span className="text-brand-muted">•</span>
          <span>AI Engineer</span>
          <span className="text-brand-muted">•</span>
          <span>Builder</span>
        </motion.div>

        {/* Summary Description */}
        <motion.p 
          variants={itemVariants}
          className="text-base md:text-lg text-brand-muted leading-relaxed max-w-lg mt-2"
        >
          I build intelligent, scalable, and user-centric software at the intersection of modern software engineering and artificial intelligence.
        </motion.p>

        {/* Interaction call to action */}
        <motion.div variants={itemVariants} className="mt-8 flex items-center gap-4">
          <button 
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 bg-brand-teal hover:bg-brand-emerald text-background font-bold text-xs uppercase tracking-widest rounded-md transition-all duration-300 shadow-lg flex items-center gap-2 group"
            data-cursor="icons"
          >
            <span>Explore Lab</span>
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Hint */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted hidden md:flex animate-bounce">
        <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll Down</span>
        <ArrowDown size={12} />
      </div>
    </section>
  );
}
