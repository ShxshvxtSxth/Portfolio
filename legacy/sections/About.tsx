"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const sentence = "I am a Software Developer and AI Engineer specializing in distributed software architectures, agentic LLM systems, and high-performance full-stack applications. My experience bridges the gap between hands-on systems development and leading-edge artificial intelligence, with a focus on Healthcare AI, Generative models, and Computer Vision.";
  
  const words = sentence.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.2 },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="about" 
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col justify-center relative border-t border-brand-border"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Title Column */}
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-2"
          >
            <span className="text-xs font-semibold tracking-widest text-brand-teal uppercase font-display">
              01 / Core Profile
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
              About Me
            </h3>
          </motion.div>
        </div>

        {/* Narrative Description Column */}
        <div className="md:col-span-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg md:text-2xl font-medium text-brand-muted leading-relaxed flex flex-wrap gap-x-2 gap-y-1.5"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block origin-bottom text-slate-300 hover:text-brand-teal transition-colors duration-200"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
