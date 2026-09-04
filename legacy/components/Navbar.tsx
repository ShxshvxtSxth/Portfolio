"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Home", target: "landingDiv" },
    { label: "About", target: "about" },
    { label: "What I Do", target: "whatido" },
    { label: "Experience", target: "experience" },
    { label: "Projects", target: "work" },
    { label: "Contact", target: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      // Scrolled state for header style changes
      setScrolled(window.scrollY > 50);

      // Find active section
      for (const link of navLinks) {
        const el = document.getElementById(link.target);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.target);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-brand-border py-4" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Futuristic Brand Logo */}
        <div 
          onClick={() => scrollTo("landingDiv")}
          className="text-xl font-bold font-display tracking-wider text-brand-teal hover:text-brand-emerald transition-colors duration-300 cursor-pointer flex items-center gap-2"
          data-cursor="icons"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-brand-teal animate-pulse" />
          <span>S.SETH</span>
        </div>

        {/* Minimal Navigation Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:text-brand-teal ${
                activeSection === link.target 
                  ? "text-brand-teal relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[1.5px] after:bg-brand-teal" 
                  : "text-brand-muted"
              }`}
              data-cursor="icons"
            >
              {link.label}
            </button>
          ))}
        </nav>
        
        {/* Contact indicator for mobile */}
        <div className="md:hidden">
          <button 
            onClick={() => scrollTo("contact")}
            className="text-xs px-3 py-1.5 border border-brand-border rounded-full text-brand-teal bg-brand-dark"
          >
            CONNECT
          </button>
        </div>
      </div>
    </header>
  );
}
