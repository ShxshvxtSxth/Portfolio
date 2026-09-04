"use client";

import React from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="header bg-background/50 backdrop-blur-md border-b border-brand-border/10">
      <Link href="/" className="logo hover:scale-105 transition-transform duration-300" data-cursor="icons">
        <div className="w-2.5 h-2.5 rounded-full bg-brand-teal animate-pulse" />
        <span>SHASHVAT SETH</span>
      </Link>
      <NavLinks />
    </header>
  );
}
