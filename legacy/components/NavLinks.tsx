"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function NavLinks() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Mobile Hamburger Trigger */}
      <button 
        className="dropdown-toggle text-white hover:text-brand-teal transition-colors duration-200" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        data-cursor="icons"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <nav className={`links ${isMenuOpen ? "open" : "closed"}`}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={isActive ? "active" : ""}
              data-cursor="icons"
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
