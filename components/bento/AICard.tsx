"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import Card from "./Card";
import { profile } from "@/lib/profile";
import { localAnswer } from "@/lib/answers";

interface Message {
  role: "bot" | "user";
  text: string;
}

export default function AICard({ index }: { index?: number }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: profile.aiChat.intro }]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /**
   * Asks /api/chat, which talks to whichever model is configured server-side.
   * If that call fails for any reason the keyword answers stand in, so the
   * card always replies with something useful.
   */
  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = draft.trim();
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
    setMessages((prev) => [...prev, { role: "bot", text: reply || localAnswer(question) }]);
  };

  return (
    <Card card="ai" index={index} arrow={false}>
      <button
        type="button"
        className="ai-avatar-group"
        data-visible={!open}
        onClick={() => setOpen(true)}
        aria-label="Chat with my AI"
        style={{ width: "100%", height: "100%", background: "none", border: "none" }}
      >
        <svg className="ai-spinner" viewBox="0 0 200 200" aria-hidden>
          <defs>
            <path id="ai-ring-path" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
          </defs>
          <text className="ai-ring-text">
            <textPath href="#ai-ring-path" startOffset="0">
              {profile.aiChat.ring}
            </textPath>
          </text>
        </svg>

        <span className="ai-face" aria-hidden>
          <span className="ai-eye" />
          <span className="ai-eye" />
        </span>
      </button>

      <div className="ai-input" data-visible={open}>
        <button type="button" className="ai-close" onClick={() => setOpen(false)} aria-label="Close chat">
          <X style={{ width: "calc(18 * var(--unit))", height: "calc(18 * var(--unit))" }} />
        </button>

        <div className="ai-log" ref={logRef}>
          {messages.map((m, i) => (
            <p key={i} className={`ai-msg ${m.role === "user" ? "ai-msg-user" : "ai-msg-bot"}`}>
              {m.text}
            </p>
          ))}
          {thinking && (
            <span className="ai-typing" aria-label="thinking">
              <span />
              <span />
              <span />
            </span>
          )}
        </div>

        <form className="ai-form" onSubmit={send}>
          <textarea
            ref={inputRef}
            className="ai-textarea"
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) send(e);
            }}
            placeholder={profile.aiChat.placeholder}
            aria-label="Your question"
          />
          <button type="submit" className="ai-send" aria-label="Send">
            <Send style={{ width: "calc(16 * var(--unit))", height: "calc(16 * var(--unit))" }} />
          </button>
        </form>
      </div>
    </Card>
  );
}
