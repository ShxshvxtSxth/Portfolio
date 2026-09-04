"use client";

import React, { useEffect, useRef } from "react";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

export default function SocialIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".icon-item");

    items.forEach((item) => {
      const element = item as HTMLElement;
      
      const onMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Gentle magnetic pull
        element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      };

      const onMouseLeave = () => {
        element.style.transform = "translate(0px, 0px)";
      };

      element.addEventListener("mousemove", onMouseMove);
      element.addEventListener("mouseleave", onMouseLeave);
    });
  }, []);

  const socials = [
    { icon: <Github size={22} />, href: "https://github.com/ShashvxtSxth", title: "GitHub" },
    { icon: <Linkedin size={22} />, href: "https://www.linkedin.com/in/shashvat-seth", title: "LinkedIn" },
    { icon: <Instagram size={22} />, href: "https://www.instagram.com/shashvatseth", title: "Instagram" },
    { icon: <Twitter size={22} />, href: "https://twitter.com/shashvatseth", title: "Twitter" },
  ];

  return (
    <div ref={containerRef} className="socialIcons flex gap-2.5 items-center mt-4">
      {socials.map((soc) => (
        <a
          key={soc.title}
          className="icon-item p-2 text-brand-muted hover:text-brand-teal transition-colors duration-200"
          href={soc.href}
          target="_blank"
          rel="noreferrer"
          title={`Shashvat Seth's ${soc.title} Profile`}
          data-cursor="icons"
          style={{ transition: "transform 0.1s ease-out" }}
        >
          {soc.icon}
        </a>
      ))}
    </div>
  );
}
