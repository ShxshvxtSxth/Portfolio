"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Award, CheckCircle2, Download, ExternalLink, Calendar, BookOpen, Sparkles, Building2 } from "lucide-react";
import { profile } from "@/lib/profile";

export interface CertificateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateDialog({ isOpen, onClose }: CertificateDialogProps) {
  const { featured } = profile.certifications;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = featured.file;
    a.download = `IIT_Kanpur_AI_ML_Certificate_Shashvat_Seth.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenNewTab = () => {
    window.open(featured.file, "_blank", "noopener,noreferrer");
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          id="certificate-dialog-root"
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-dialog-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-zinc-200/90 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Banner */}
            <div className="relative px-6 pt-6 pb-5 bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 text-white overflow-hidden">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
                    <Award className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified Academic Credential</span>
                    </div>
                    <h2 id="cert-dialog-title" className="text-xl font-bold tracking-tight text-white mt-0.5">
                      {featured.issuer}
                    </h2>
                  </div>
                </div>

                <button
                  id="cert-dialog-close-button"
                  type="button"
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-zinc-800" style={{ scrollbarWidth: "none" }}>
              {/* Program Name Card */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                  Certification Program
                </div>
                <div className="text-lg sm:text-xl font-bold text-zinc-950 leading-snug">
                  {featured.program}
                </div>
                <div className="mt-2 text-sm text-zinc-600 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>{featured.department}</span>
                </div>
                <div className="mt-1 text-sm text-zinc-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>{featured.period} ({featured.mode})</span>
                </div>
              </div>

              {/* Curriculum & Key Topics */}
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 mb-3">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Core Curriculum & Technologies Covered</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { title: "Python for Machine Learning", desc: "NumPy, Pandas, Matplotlib & data pre-processing" },
                    { title: "Statistical Modeling", desc: "Supervised & unsupervised learning with Scikit-learn" },
                    { title: "Deep Neural Networks", desc: "TensorFlow & Keras architectures, backpropagation" },
                    { title: "Computer Vision & NLP", desc: "CNNs, RNNs, LSTMs and attention mechanisms" },
                  ].map((topic, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                      <div className="text-xs font-bold text-zinc-900">{topic.title}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{topic.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta details */}
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3 text-xs sm:text-sm text-indigo-950">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Key Highlights: </span>
                  {featured.meta}. Completed with comprehensive project submissions and assessments evaluated by IIT Kanpur faculty.
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-zinc-500 font-medium">
                Official PDF available for offline verification
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleOpenNewTab}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-700 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-100 transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Tab</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
