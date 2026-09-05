"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, RotateCcw, Sparkles } from "lucide-react";
import { profile } from "@/lib/profile";
import { localAnswer } from "@/lib/answers";

export interface AIDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: "bot" | "user";
  text: string;
}

export default function AIDialog({ isOpen, onClose }: AIDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: profile.aiChat.intro },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus input on open
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(timer);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const handleSend = async (textToSend?: string) => {
    const question = (textToSend ?? draft).trim();
    if (!question || thinking) return;

    const history = messages.slice(-6).map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    }));

    setDraft("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setThinking(true);

    let reply = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });
      const data = await res.json();
      reply = typeof data?.reply === "string" ? data.reply : "";
    } catch {
      reply = "";
    }

    setThinking(false);
    setMessages((prev) => [
      ...prev,
      { role: "bot", text: reply || localAnswer(question) },
    ]);
  };

  const handleReset = () => {
    setMessages([{ role: "bot", text: profile.aiChat.intro }]);
    setDraft("");
    setThinking(false);
    inputRef.current?.focus();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          id="buddy-dialog-root"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="buddy-dialog-title"
        >
          {/* Backdrop overlay with blur */}
          <motion.div
            id="buddy-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Dialog Card */}
          <motion.div
            id="buddy-dialog-card"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 340,
            }}
            className="relative w-full max-w-[540px] h-[620px] max-h-[90vh] bg-white rounded-[28px] shadow-[0_24px_70px_rgba(0,0,0,0.35)] border border-black/10 flex flex-col overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100 bg-zinc-50/75 select-none">
              <div className="flex items-center gap-3">
                {/* Buddy face icon */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#fff833] via-[#ff8320] to-[#ff2228] flex items-center justify-center gap-1 shadow-md shadow-orange-500/20">
                    <span className="w-[3px] h-2.5 rounded-full bg-[#333346]" />
                    <span className="w-[3px] h-2.5 rounded-full bg-[#333346]" />
                  </div>
                  {/* Pulsing online indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h2
                      id="assistant-dialog-title"
                      className="font-semibold text-base text-zinc-900 leading-tight"
                    >
                      {profile.aiChat.name}
                    </h2>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full">
                      <Sparkles className="w-2.5 h-2.5" />
                      AI
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-normal">
                    Shashvat&apos;s Portfolio Assistant • Instant Answers
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  id="buddy-reset-button"
                  type="button"
                  onClick={handleReset}
                  title="Reset conversation"
                  className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-full transition-colors"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  id="buddy-close-button"
                  type="button"
                  onClick={onClose}
                  title="Close dialog (Esc)"
                  className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-full transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat message log */}
            <div
              ref={logRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5 bg-gradient-to-b from-white to-zinc-50/50"
            >
              {messages.map((m, i) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#fff833] via-[#ff8320] to-[#ff2228] flex items-center justify-center gap-0.5 shrink-0 shadow-sm mt-0.5">
                        <span className="w-[2px] h-1.5 rounded-full bg-[#333346]" />
                        <span className="w-[2px] h-1.5 rounded-full bg-[#333346]" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] px-4 py-2.5 text-[14px] leading-relaxed rounded-2xl shadow-sm ${
                        isUser
                          ? "bg-[#474054] text-white rounded-tr-sm font-normal"
                          : "bg-zinc-100/90 text-zinc-800 rounded-tl-sm font-normal border border-zinc-200/50"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {/* Suggested prompts after first message */}
              {messages.length === 1 && !thinking && (
                <div className="pt-2 pl-9">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-2">
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.aiChat.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(prompt)}
                        className="text-left text-xs bg-white hover:bg-orange-50/70 text-zinc-700 hover:text-orange-700 hover:border-orange-300 px-3 py-1.5 rounded-full border border-zinc-200 transition-all duration-150 shadow-xs"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Thinking indicator */}
              {thinking && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#fff833] via-[#ff8320] to-[#ff2228] flex items-center justify-center gap-0.5 shrink-0 shadow-sm mt-0.5">
                    <span className="w-[2px] h-1.5 rounded-full bg-[#333346]" />
                    <span className="w-[2px] h-1.5 rounded-full bg-[#333346]" />
                  </div>
                  <div className="bg-zinc-100/90 text-zinc-500 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs flex items-center gap-1.5 border border-zinc-200/50 shadow-sm">
                    <span>Buddy is thinking</span>
                    <span className="flex gap-1 items-center ml-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:0.4s]" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3.5 bg-white border-t border-zinc-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative flex items-center bg-zinc-50 hover:bg-zinc-100/70 focus-within:bg-white rounded-2xl border border-zinc-200/90 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900/5 transition-all p-1.5"
              >
                <textarea
                  ref={inputRef}
                  id="buddy-chat-input"
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={profile.aiChat.placeholder}
                  className="w-full resize-none border-none outline-none bg-transparent px-3 py-1.5 text-sm text-zinc-800 placeholder:text-zinc-400 max-h-24 font-normal"
                />
                <button
                  id="buddy-send-button"
                  type="submit"
                  disabled={!draft.trim() || thinking}
                  className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center bg-[#474054] text-white hover:bg-[#5d546d] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-zinc-400 select-none">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>Powered by Gemini</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
