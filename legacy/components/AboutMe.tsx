"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SocialIcons from "./SocialIcons";

interface AboutMeProps {
  name: string;
  email: string;
  location: string;
  availability: string;
  brand: string;
}

export default function AboutMe({ name, email, location, availability, brand }: AboutMeProps) {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Shashvat_Resume.pdf";
    
    document.body.appendChild(link);
    link.click();
    
    // Simulate loading states
    setTimeout(() => {
      document.body.removeChild(link);
      setDownloading(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-8 pb-16 z-10 relative" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Volumetric 3D Hologram Frame */}
        <motion.div
          className="lg:col-span-4 flex justify-center items-center h-[340px] bg-brand-dark/20 border border-brand-border rounded-xl relative overflow-hidden"
          initial={{ x: "-10vw", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: "-10vw", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Volumetric background scanners */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1),transparent_70%)] animate-pulse-slow" />
          
          <img 
            src="/avatar.jpg" 
            alt={name} 
            className="w-[180px] h-[245px] object-cover rounded-md border border-brand-teal/40 z-10 shadow-lg"
          />
        </motion.div>

        {/* Right Column: Bio Details */}
        <motion.div
          className="lg:col-span-8 flex flex-col justify-center"
          initial={{ x: "10vw", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: "10vw", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <h4 className="text-brand-teal text-xs font-semibold tracking-widest uppercase font-display">
                Nice to meet you
              </h4>
              <h5 className="text-2xl font-bold text-white tracking-tight">
                Software Developer who designs next-level intelligent systems!
              </h5>
            </div>

            <p className="text-sm md:text-base text-brand-muted leading-relaxed">
              {brand}
            </p>

            {/* Structured Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-4 border-t border-b border-brand-border">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest font-display">Name</span>
                <span className="text-sm font-semibold text-white">{name}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest font-display">Email</span>
                <span className="text-sm font-semibold text-white">
                  <a href={`mailto:${email}`} className="hover:text-brand-teal transition-colors duration-200">{email}</a>
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest font-display">Location</span>
                <span className="text-sm font-semibold text-white">{location}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest font-display">Availability</span>
                <span className="text-sm font-semibold text-white">{availability}</span>
              </div>
            </div>

            {/* Resume Trigger and Social links */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <button 
                className="btn" 
                onClick={handleDownload} 
                disabled={downloading}
                data-cursor="icons"
              >
                {downloading ? "Downloading..." : "Download Resume"}
              </button>
              <SocialIcons />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
