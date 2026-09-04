"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User, MapPin, Mail } from "lucide-react";

interface ContactInfoProps {
  name: string;
  email: string;
  location: string;
}

export default function ContactInfo({ name, email, location }: ContactInfoProps) {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="contactInfo flex flex-col gap-6 p-6 bg-brand-dark/20 border border-brand-border rounded-xl z-10 relative"
      initial={{ x: "10vw", opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : { x: "10vw", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div>
        <h4 className="text-xl font-bold text-white tracking-wide font-display uppercase mb-2">
          Contact Information
        </h4>
        <p className="text-sm text-brand-muted leading-relaxed">
          Open for opportunities and discussions. Let's connect and build something awesome together!
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {/* Name Item */}
        <li className="flex items-center gap-4 p-3 bg-background/50 border border-brand-border/50 rounded-lg hover:border-brand-teal/20 transition-all duration-300">
          <div className="p-2.5 bg-brand-dark rounded-md text-brand-teal">
            <User size={18} />
          </div>
          <div>
            <h6 className="text-[10px] font-bold text-brand-muted uppercase tracking-widest font-display">Name</h6>
            <span className="text-sm font-semibold text-white">{name}</span>
          </div>
        </li>

        {/* Location Item */}
        <li className="flex items-center gap-4 p-3 bg-background/50 border border-brand-border/50 rounded-lg hover:border-brand-teal/20 transition-all duration-300">
          <div className="p-2.5 bg-brand-dark rounded-md text-brand-teal">
            <MapPin size={18} />
          </div>
          <div>
            <h6 className="text-[10px] font-bold text-brand-muted uppercase tracking-widest font-display">Location</h6>
            <span className="text-sm font-semibold text-white">{location}</span>
          </div>
        </li>

        {/* Email Item */}
        <li className="flex items-center gap-4 p-3 bg-background/50 border border-brand-border/50 rounded-lg hover:border-brand-teal/20 transition-all duration-300">
          <div className="p-2.5 bg-brand-dark rounded-md text-brand-teal">
            <Mail size={18} />
          </div>
          <div>
            <h6 className="text-[10px] font-bold text-brand-muted uppercase tracking-widest font-display">Email</h6>
            <span className="text-sm font-semibold text-white">
              <a href={`mailto:${email}`} className="hover:text-brand-teal transition-colors duration-200">
                {email}
              </a>
            </span>
          </div>
        </li>
      </ul>
    </motion.div>
  );
}
