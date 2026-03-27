"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import { fadeUp } from "@/lib/motion";

type MessageRole = "system" | "user" | "assistant";

type Message = {
  role: MessageRole;
  content: string;
  timestamp: string;
};

type TypingState = {
  content: string;
  timestamp: string;
} | null;

const EXAMPLE_QUERIES = ["What does Arcane do?", "What systems are active?", "How do I partner?"];

const RESPONSE_MAP: Record<string, string> = {
  "what does arcane do?":
    "Arcane engineers advanced AI systems, autonomous agents, and secure\nhuman-machine interfaces for a narrow set of strategic partners.\n\n  ──  Autonomous orchestration and multi-agent command\n  ──  Real-time voice intelligence and streaming inference\n  ──  Financial modeling, risk simulation, decision support\n  ──  Offline runtimes for air-gapped environments",
  "what systems are active?":
    "Active deployments confirmed across secure surfaces:\n\n  [RUNNING]   AI Core Orchestration ........ v2.4.1\n  [TRAINING]  Voice Intelligence Engine .... v1.8.0\n  [RUNNING]   Multi-Agent Framework ........ v3.1.2\n  [SEALED]    Ghost Brain .................. CLASSIFIED\n  [RUNNING]   Financial Decision AI ........ v1.1.4",
  "how do i partner?":
    "Access is restricted to a narrow set of qualified partners.\n\nTo initiate contact, use the access channel below.\nInclude: technical brief, deployment goals, and constraints.\n\n  Unsolicited requests are reviewed manually.\n  Response time: not guaranteed.",
};

function resolveResponse(input: string) {
  return (
    RESPONSE_MAP[input.trim().toLowerCase()] ??
    "Query acknowledged. Full response restricted to authorized sessions.\nRequest access for a deeper technical briefing."
  );
}

function formatTimestamp() {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

function getTypingDelay(character: string) {
  if (character === " ") {
    return 12;
  }

  if (/[,.!?]/.test(character)) {
    return 42;
  }

  return 14 + Math.floor(Math.random() * 18);
}

export function ArcaneTerminalSection() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "ARCANE TERMINAL v2.4.1 — SESSION INITIALIZED\nEncryption active. Clearance: PUBLIC.\n\nQuery active systems, capabilities, or access protocols.",
      timestamp: formatTimestamp(),
    },
  ]);
  const [typingTarget, setTypingTarget] = useState<TypingState>(null);
  const [typedContent, setTypedContent] = useState("");
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!typingTarget) {
      return undefined;
    }

    setTypedContent("");
    let index = 0;
    let timeoutId: number | undefined;

    const typeNextCharacter = () => {
      index += 1;
      const next = typingTarget.content.slice(0, index);
      setTypedContent(next);

      if (index >= typingTarget.content.length) {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: typingTarget.content,
            timestamp: typingTarget.timestamp,
          },
        ]);
        setTypingTarget(null);
        return;
      }

      timeoutId = window.setTimeout(typeNextCharacter, getTypingDelay(typingTarget.content[index] ?? ""));
    };

    timeoutId = window.setTimeout(typeNextCharacter, 120);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [typingTarget]);

  useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typedContent]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery || typingTarget) {
      return;
    }

    setMessages((current) => [
      ...current,
      { role: "user", content: trimmedQuery, timestamp: formatTimestamp() },
    ]);
    setQuery("");
    setTypingTarget({ content: resolveResponse(trimmedQuery), timestamp: formatTimestamp() });
  }

  function applyExample(example: string) {
    if (typingTarget) {
      return;
    }

    setQuery(example);
  }

  return (
    <SectionShell
      id="terminal"
      eyebrow="Arcane Terminal"
      title="Direct interface"
      description="A simple command surface for querying Arcane systems. Responses are mocked for now and run entirely client-side."
    >
      <Reveal variants={fadeUp}>
        <GlassPanel className="terminal-panel terminal-flicker relative overflow-hidden rounded-[32px] p-0 shadow-[0_24px_80px_rgba(0,0,0,0.44)]">
          <div className="terminal-scanlines absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent opacity-80" />
          <div className="pointer-events-none absolute left-8 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(201,169,77,0.16),transparent_72%)] blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.26em] text-white/45 md:px-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_14px_rgba(201,169,77,0.65)]" />
                <span>Arcane Terminal</span>
              </div>
              <span className="text-gold/80">Interactive Session</span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.72fr_0.28fr]">
              <div className="border-b border-white/8 p-5 md:p-6 lg:border-b-0 lg:border-r">
                <div
                  ref={viewportRef}
                  className="max-h-[26rem] min-h-[22rem] space-y-3 overflow-y-auto pr-1"
                >
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={[
                        "terminal-line rounded-[20px] border px-5 py-4 transition duration-300",
                        message.role === "assistant"
                          ? "border-gold/12 bg-black/30 hover:border-gold/18"
                          : message.role === "user"
                          ? "border-white/8 bg-black/22 hover:border-white/12"
                          : "border-white/5 bg-black/15",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em]">
                        <span className="text-gold/40">[{message.timestamp}]</span>
                        <span
                          className={[
                            "font-semibold tracking-[0.32em]",
                            message.role === "assistant"
                              ? "text-gold/85"
                              : message.role === "user"
                              ? "text-white/60"
                              : "text-white/30",
                          ].join(" ")}
                        >
                          {message.role === "user" ? "USER" : "ARCANE_SYS"}
                        </span>
                        <span className="text-white/18">▸</span>
                      </div>
                      <div
                        className={[
                          "my-3 h-px",
                          message.role === "assistant"
                            ? "bg-gradient-to-r from-gold/20 via-gold/8 to-transparent"
                            : "bg-gradient-to-r from-white/8 to-transparent",
                        ].join(" ")}
                      />
                      <p
                        className={[
                          "whitespace-pre-wrap font-mono text-sm leading-[1.75]",
                          message.role === "system"
                            ? "text-white/42"
                            : message.role === "user"
                            ? "text-white/82"
                            : "text-white/76",
                        ].join(" ")}
                      >
                        {message.content}
                      </p>
                    </div>
                  ))}

                  {typingTarget ? (
                    <div className="terminal-line rounded-[20px] border border-gold/14 bg-black/30 px-5 py-4">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em]">
                        <span className="text-gold/40">[{typingTarget.timestamp}]</span>
                        <span className="font-semibold tracking-[0.32em] text-gold/85">ARCANE_SYS</span>
                        <span className="text-white/18">▸</span>
                        <span className="ml-1 animate-pulse text-[9px] tracking-[0.36em] text-gold/35">PROCESSING</span>
                      </div>
                      <div className="my-3 h-px bg-gradient-to-r from-gold/20 via-gold/8 to-transparent" />
                      <p className="whitespace-pre-wrap font-mono text-sm leading-[1.75] text-white/76">
                        {typedContent}
                        <span className="terminal-cursor ml-px inline-block h-[1.05em] w-[0.62ch] translate-y-0.5 bg-gold/85 align-baseline" />
                      </p>
                    </div>
                  ) : null}
                </div>

                <form onSubmit={handleSubmit} className="mt-5">
                  <label htmlFor="arcane-terminal-input" className="sr-only">
                    Ask Arcane Terminal a question
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-gold/75">&gt;</span>
                      <input
                        id="arcane-terminal-input"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Ask Arcane Terminal..."
                        className="terminal-input h-12 w-full rounded-full border border-white/10 bg-black/35 pl-9 pr-4 font-mono text-sm text-gold outline-none transition placeholder:text-white/28 focus:border-gold/30 focus:bg-black/45 focus:shadow-[0_0_0_1px_rgba(201,169,77,0.1),0_0_30px_rgba(201,169,77,0.08)]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!query.trim() || Boolean(typingTarget)}
                      className="gold-pulse shimmer-sweep inline-flex h-12 items-center justify-center rounded-full border border-gold/35 bg-gold px-6 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#ddbb5e] disabled:cursor-not-allowed disabled:opacity-55"
                    >
                      Send Query
                    </button>
                  </div>
                </form>
              </div>

              <div className="p-5 md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/42">Example Queries</p>
                <div className="mt-4 space-y-3">
                  {EXAMPLE_QUERIES.map((example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => applyExample(example)}
                      className="w-full rounded-2xl border border-white/8 bg-black/25 px-4 py-3 text-left font-mono text-sm text-white/72 transition hover:border-gold/20 hover:bg-white/[0.045] hover:text-gold"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </Reveal>
    </SectionShell>
  );
}