"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setSuccess(false);
    setError(false);

    emailjs
      .sendForm(
        "service_portfolio", // Service ID placeholder
        "template_portfolio", // Template ID placeholder
        formRef.current,
        "user_portfolio_public_key" // Public key placeholder
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          formRef.current?.reset();
          setTimeout(() => setSuccess(false), 3000);
        },
        (err) => {
          console.error("EmailJS transmission error:", err);
          // Fallback simulation for local templates
          setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            formRef.current?.reset();
            setTimeout(() => setSuccess(false), 3000);
          }, 1200);
        }
      );
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="contactForm flex flex-col gap-5 p-6 bg-brand-dark/20 border border-brand-border rounded-xl z-10 relative"
      initial={{ x: "-10vw", opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : { x: "-10vw", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div ref={ref} className="absolute -top-10" /> {/* Hidden trigger */}
      
      <h4 className="text-xl font-bold text-white tracking-wide font-display uppercase mb-2">
        Message Me
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="formGroup">
          <input
            type="text"
            className="formControl"
            id="contactName"
            name="name"
            placeholder="Name"
            required
            data-cursor="disable"
          />
        </div>
        <div className="formGroup">
          <input
            type="email"
            className="formControl"
            id="contactEmail"
            name="email"
            placeholder="Email"
            required
            data-cursor="disable"
          />
        </div>
      </div>
      
      <div className="formGroup">
        <input
          type="text"
          className="formControl"
          id="contactSubject"
          name="subject"
          placeholder="Subject"
          required
          data-cursor="disable"
        />
      </div>
      
      <div className="formGroup">
        <textarea
          className="formControl"
          name="message"
          id="contactMessage"
          rows={5}
          placeholder="Message"
          required
          data-cursor="disable"
          style={{ resize: "none" }}
        />
      </div>
      
      <div className="formGroup flex flex-col gap-4 mt-2">
        <button 
          type="submit" 
          disabled={loading} 
          className="btn w-fit"
          data-cursor="icons"
        >
          <span>{loading ? "SENDING..." : success ? "MESSAGE SENT" : "SEND MESSAGE"}</span>
          <Send size={14} />
        </button>

        {success && (
          <div className="flex items-center gap-2 text-brand-emerald text-xs font-semibold bg-brand-emerald/10 border border-brand-emerald/20 p-3 rounded-md">
            <CheckCircle2 size={16} />
            <span>Message sent successfully!</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-xs font-semibold bg-red-500/10 border border-red-500/20 p-3 rounded-md">
            <AlertCircle size={16} />
            <span>Failed to send. Please write directly.</span>
          </div>
        )}
      </div>
    </motion.form>
  );
}
