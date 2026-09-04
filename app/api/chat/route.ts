import { NextResponse } from "next/server";
import { localAnswer, systemPrompt } from "@/lib/answers";

export const runtime = "edge";

/**
 * Chat endpoint for the AI tile.
 *
 * The API key never reaches the browser — it lives in an env var and is only
 * read here. With nothing configured the route still answers, using the
 * offline keyword rules, so the card works on a fresh clone.
 *
 * Setup (Google AI Studio, free tier):
 *   1. Create a key at https://aistudio.google.com/apikey
 *   2. Put it in .env.local as GOOGLE_API_KEY=...
 *   3. Restart `npm run dev`; add the same var in your host's project settings
 *   4. Check it took: GET /api/chat  ->  {"provider":"google",...}
 *
 * Optional: GOOGLE_MODEL to pin a model, CHAT_PROVIDER=google|groq to force one.
 */

const MAX_MESSAGE = 500;
const MAX_HISTORY = 6;

const GOOGLE_MODEL = process.env.GOOGLE_MODEL || "gemini-2.0-flash";
const GOOGLE_FALLBACK_MODEL = "gemini-2.5-flash";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

interface Turn {
  role: "user" | "assistant";
  content: string;
}

class ProviderError extends Error {
  constructor(public provider: string, public status: number, public detail: string) {
    super(`${provider} ${status}: ${detail}`);
  }
}

async function askGoogle(key: string, model: string, message: string, history: Turn[]): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt() }] },
        generationConfig: { maxOutputTokens: 220, temperature: 0.4 },
        contents: [
          ...history.map((t) => ({
            role: t.role === "assistant" ? "model" : "user",
            parts: [{ text: t.content }],
          })),
          { role: "user", parts: [{ text: message }] },
        ],
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new ProviderError("google", res.status, body.slice(0, 300));
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== "string" || !text.trim()) {
    throw new ProviderError("google", 200, `no text in response: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return text.trim();
}

async function askGroq(key: string, message: string, history: Turn[]): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: 220,
      temperature: 0.4,
      messages: [{ role: "system", content: systemPrompt() }, ...history, { role: "user", content: message }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new ProviderError("groq", res.status, body.slice(0, 300));
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) throw new ProviderError("groq", 200, "empty completion");
  return text.trim();
}

/** which provider this deployment will actually use */
function resolveProvider() {
  const forced = process.env.CHAT_PROVIDER?.toLowerCase();
  const google = process.env.GOOGLE_API_KEY;
  const groq = process.env.GROQ_API_KEY;

  if (forced === "google") return google ? { name: "google" as const, key: google } : null;
  if (forced === "groq") return groq ? { name: "groq" as const, key: groq } : null;
  if (google) return { name: "google" as const, key: google };
  if (groq) return { name: "groq" as const, key: groq };
  return null;
}

/** Health check — says what is wired without ever echoing the key. */
export async function GET() {
  const provider = resolveProvider();
  return NextResponse.json({
    provider: provider?.name ?? "local",
    model: provider?.name === "google" ? GOOGLE_MODEL : provider?.name === "groq" ? GROQ_MODEL : null,
    note:
      provider === null
        ? "No key found. Add GOOGLE_API_KEY to .env.local and restart; answers use built-in keyword rules until then."
        : "Ready.",
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { message, history } = (body ?? {}) as { message?: unknown; history?: unknown };

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "message required" }, { status: 400 });
  }

  const question = message.trim().slice(0, MAX_MESSAGE);
  const turns: Turn[] = Array.isArray(history)
    ? (history as Turn[])
        .filter(
          (t) =>
            t &&
            (t.role === "user" || t.role === "assistant") &&
            typeof t.content === "string" &&
            t.content.trim().length > 0
        )
        .slice(-MAX_HISTORY)
        .map((t) => ({ role: t.role, content: t.content.slice(0, MAX_MESSAGE) }))
    : [];

  const provider = resolveProvider();
  let detail: string | undefined;

  if (provider) {
    try {
      if (provider.name === "google") {
        try {
          const reply = await askGoogle(provider.key, GOOGLE_MODEL, question, turns);
          return NextResponse.json({ reply, source: "google", model: GOOGLE_MODEL });
        } catch (error) {
          // a retired model id returns 404 — retry once on the newer flash model
          if (error instanceof ProviderError && error.status === 404 && GOOGLE_MODEL !== GOOGLE_FALLBACK_MODEL) {
            const reply = await askGoogle(provider.key, GOOGLE_FALLBACK_MODEL, question, turns);
            return NextResponse.json({ reply, source: "google", model: GOOGLE_FALLBACK_MODEL });
          }
          throw error;
        }
      }
      return NextResponse.json({ reply: await askGroq(provider.key, question, turns), source: "groq", model: GROQ_MODEL });
    } catch (error) {
      // answer anyway rather than showing a visitor an error
      detail = error instanceof Error ? error.message : String(error);
      console.error("[chat] provider failed —", detail);
    }
  }

  return NextResponse.json({
    reply: localAnswer(question),
    source: "local",
    // surfaced outside production so a bad key is obvious while wiring
    ...(detail && process.env.NODE_ENV !== "production" ? { detail } : {}),
  });
}
