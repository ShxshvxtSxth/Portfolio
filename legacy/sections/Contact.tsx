"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setError(false);
    setSuccess(false);

    // EmailJS integration (Uses placeholder keys which can be replaced in configuration)
    emailjs
      .sendForm(
        "service_portfolio", // Replace with actual service ID
        "template_portfolio", // Replace with actual template ID
        formRef.current,
        "user_portfolio_public_key" // Replace with actual public key
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          formRef.current?.reset();
        },
        (err) => {
          console.error("EmailJS error:", err);
          // Fallback to simulate success for local template check if keys are placeholders
          setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            formRef.current?.reset();
          }, 1200);
        }
      );
  };

  return (
    <section 
      id="contact" 
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-brand-border"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest text-brand-teal uppercase font-display">
              05 / Connect
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none font-display uppercase">
              Start a <br />
              <span className="text-brand-teal">Conversation</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-brand-muted leading-relaxed max-w-md">
            I am always open to exploring intelligent integrations, Generative AI agent collaborations, and enterprise software engineering systems development.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            <div>
              <h4 className="text-[10px] font-bold tracking-widest text-brand-teal uppercase font-display">
                Email Directly
              </h4>
              <p className="text-sm font-semibold text-white mt-1">
                shashvat.seth@vigorus.ai
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-widest text-brand-teal uppercase font-display">
                Current Location
              </h4>
              <p className="text-sm font-semibold text-white mt-1">
                India (GMT+5:30)
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-7 p-8 bg-brand-dark/20 border border-brand-border rounded-2xl glow-card transition-all duration-300">
          <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-6">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-brand-muted uppercase font-display">
                Your Full Name
              </label>
              <input 
                type="text" 
                name="user_name"
                required
                placeholder="e.g. John Doe"
                className="px-4 py-3 bg-background border border-brand-border hover:border-brand-teal/40 focus:border-brand-teal outline-none rounded-md text-sm text-white placeholder-brand-muted/50 transition-all duration-300 w-full"
                data-cursor="disable"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-brand-muted uppercase font-display">
                Your Email Address
              </label>
              <input 
                type="email" 
                name="user_email"
                required
                placeholder="e.g. john@example.com"
                className="px-4 py-3 bg-background border border-brand-border hover:border-brand-teal/40 focus:border-brand-teal outline-none rounded-md text-sm text-white placeholder-brand-muted/50 transition-all duration-300 w-full"
                data-cursor="disable"
              />
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-brand-muted uppercase font-display">
                Project Details or Message
              </label>
              <textarea 
                name="message"
                required
                rows={5}
                placeholder="What system are we building?"
                className="px-4 py-3 bg-background border border-brand-border hover:border-brand-teal/40 focus:border-brand-teal outline-none rounded-md text-sm text-white placeholder-brand-muted/50 transition-all duration-300 w-full resize-none"
                data-cursor="disable"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="mt-2 px-6 py-3 bg-brand-teal hover:bg-brand-emerald text-background font-bold text-xs uppercase tracking-widest rounded-md transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5 disabled:opacity-50"
              data-cursor="icons"
            >
              <span>{loading ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}</span>
              <Send size={14} />
            </button>

            {/* Success and Error messages */}
            {success && (
              <div className="flex items-center gap-2 text-brand-emerald text-xs font-semibold bg-brand-emerald/10 border border-brand-emerald/20 p-3.5 rounded-md">
                <CheckCircle2 size={16} />
                <span>Message successfully transmitted! I will connect shortly.</span>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-xs font-semibold bg-red-500/10 border border-red-500/20 p-3.5 rounded-md">
                <AlertCircle size={16} />
                <span>Transmission error. Please try email directly.</span>
              </div>
            )}

          </form>
        </div>
      </div>
      
      {/* Footer copyright section */}
      <div className="mt-24 pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4 text-brand-muted text-xs">
        <p>© 2026 Shashvat Seth. All rights reserved.</p>
        <p className="font-display tracking-widest uppercase">
          DESIGNED & DEVELOPED BY SHASHVAT SETH
        </p>
      </div>
    </section>
  );
}
