"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, Github, ExternalLink } from "lucide-react";

interface ProjectProps {
  id: string;
  title: string;
  technologies: string;
  image: string;
  color: string;
  github: string;
  deployed: string;
  description: string;
}

export default function Project({
  id,
  title,
  technologies,
  image,
  color,
  github,
  deployed,
  description,
}: ProjectProps) {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  const [showModal, setShowModal] = useState(false);

  const cardVariants = {
    hidden: { x: parseInt(id) % 2 === 0 ? "10vw" : "-10vw", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <>
      <motion.div
        ref={ref}
        className="w-full md:w-1/2 p-3"
        variants={cardVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div
          style={{ backgroundColor: color }}
          className="projectCard flex items-center justify-between p-6 relative group cursor-pointer"
          onClick={() => setShowModal(true)}
          data-cursor="icons"
        >
          {/* Card Meta Content */}
          <div className="w-1/2 flex flex-col justify-center gap-1.5 p-2 z-10 text-left">
            <p className="tech text-xs italic tracking-wider font-semibold">
              {technologies}
            </p>
            <h3 className="projectTitle text-xl font-bold text-white uppercase font-display leading-tight">
              {title}
            </h3>
            <span className="viewWork text-xs font-bold text-white/80 hover:text-white flex items-center gap-1">
              <span>View Details</span>
              <span>&rarr;</span>
            </span>
          </div>

          {/* Card Mockup Graphic */}
          <div className="w-1/2 flex justify-center items-center h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 group-hover:to-black/0 transition-all duration-300" />
            <img 
              src={image} 
              alt={title} 
              className="max-h-[180px] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
            />
          </div>
        </div>
      </motion.div>

      {/* Volumetric Hologram Modal Backdrop */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[999] px-6">
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />

            {/* Modal Card Content */}
            <motion.div
              className="bg-[#101010] border border-brand-border rounded-xl p-8 max-w-md w-full relative flex flex-col gap-6 z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-1 rounded-md text-brand-muted hover:text-brand-teal bg-brand-dark transition-colors duration-200"
                data-cursor="icons"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest font-display">
                  {technologies}
                </span>
                <h3 className="text-2xl font-extrabold text-white tracking-tight uppercase font-display">
                  {title}
                </h3>
              </div>

              <p className="text-sm text-brand-muted leading-relaxed">
                {description}
              </p>

              <div className="flex gap-4 mt-2">
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-4 py-2.5 bg-brand-dark border border-brand-border hover:border-brand-teal rounded-md text-xs font-semibold text-brand-teal hover:text-white uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
                  data-cursor="icons"
                >
                  <span>Code</span>
                  <Github size={14} />
                </a>
                <a
                  href={deployed}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-4 py-2.5 bg-brand-teal hover:bg-brand-emerald rounded-md text-xs font-semibold text-background uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
                  data-cursor="icons"
                >
                  <span>Live URL</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
