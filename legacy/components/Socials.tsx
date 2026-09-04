"use client";

import React, { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function Socials() {
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socialRef.current) return;
    
    const items = socialRef.current.querySelectorAll(".magnetic-item");

    items.forEach((item) => {
      const element = item as HTMLElement;
      const link = element.querySelector("a") as HTMLElement;
      
      const onMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        
        // Calculate relative mouse position inside item bounds
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Dynamic magnetic pull effect using CSS transforms
        link.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        element.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      };

      const onMouseLeave = () => {
        // Snap back to center smoothly
        link.style.transform = "translate(0px, 0px)";
        element.style.transform = "translate(0px, 0px)";
      };

      element.addEventListener("mousemove", onMouseMove);
      element.addEventListener("mouseleave", onMouseLeave);
    });
  }, []);

  const links = [
    { icon: <Github size={18} />, href: "https://github.com/ShashvxtSxth", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/shashvat-seth", label: "LinkedIn" },
    { icon: <Mail size={18} />, href: "mailto:shashvat.seth@vigorus.ai", label: "Email" }
  ];

  return (
    <div 
      ref={socialRef}
      className="fixed bottom-8 left-8 z-40 hidden md:flex items-center gap-6"
    >
      {/* Magnetic Social Icons */}
      <div className="flex gap-4 p-2 bg-brand-dark/40 backdrop-blur-md border border-brand-border rounded-full" id="social">
        {links.map((link) => (
          <div 
            key={link.label}
            className="magnetic-item w-10 h-10 flex items-center justify-center rounded-full transition-transform duration-200 ease-out"
            data-cursor="icons"
          >
            <a 
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-brand-muted hover:text-brand-teal transition-colors duration-200 flex items-center justify-center w-full h-full"
            >
              {link.icon}
            </a>
          </div>
        ))}
      </div>

      {/* Resume Download Button */}
      <a 
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="resume-button px-5 py-2.5 bg-brand-dark/60 backdrop-blur-sm border border-brand-border hover:border-brand-teal rounded-full text-xs font-semibold uppercase tracking-wider text-brand-teal hover:text-white flex items-center gap-2 transition-all duration-300 shadow-md group"
        data-cursor="icons"
      >
        <span>RESUME</span>
        <FileText size={14} className="text-brand-teal group-hover:translate-y-[-1px] transition-transform duration-200" />
      </a>
    </div>
  );
}
