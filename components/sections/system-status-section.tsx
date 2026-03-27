"use client";

import { useEffect, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import { fadeUp } from "@/lib/motion";

const systems = [
  {
    symbol: "✔",
    name: "AI Core",
    status: "Active",
    tone: "text-[#9AD6A5]",
  },
  {
    symbol: "✔",
    name: "Voice Engine",
    status: "Active",
    tone: "text-[#9AD6A5]",
  },
  {
    symbol: "⚠",
    name: "Financial AI",
    status: "Training",
    tone: "text-gold",
  },
  {
    symbol: "🔒",
    name: "Classified Systems",
    status: "Restricted",
    tone: "text-white/70",
  },
] as const;

const liveUpdates = [
  "Live update: voice inference latency stable at 14 ms.",
  "Live update: financial model training checkpoint verified.",
  "Live update: agent orchestration fabric synchronized.",
  "Live update: restricted systems remain sealed and monitored.",
];

export function SystemStatusSection() {
  const [activeUpdate, setActiveUpdate] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveUpdate((current) => (current + 1) % liveUpdates.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <SectionShell
      id="status"
      eyebrow="System Status"
      title="Operational visibility"
      description="A live snapshot of core Arcane systems currently active, training, or restricted."
    >
      <Reveal variants={fadeUp}>
        <GlassPanel className="terminal-panel terminal-flicker relative overflow-hidden rounded-[32px] p-0 shadow-[0_24px_80px_rgba(0,0,0,0.44)]">
          <div className="terminal-scanlines absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent opacity-75" />
          <div className="pointer-events-none absolute right-10 top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(201,169,77,0.18),transparent_72%)] blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.26em] text-white/45 md:px-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#9AD6A5] shadow-[0_0_14px_rgba(154,214,165,0.55)]" />
                <span>Arcane Systems</span>
              </div>
              <span className="text-gold/80">Live Monitor</span>
            </div>

            <div className="px-5 py-6 md:px-6 md:py-7">
              <div className="grid gap-3 font-mono text-sm leading-7 text-white/78 md:gap-4">
                {systems.map((system) => (
                  <div
                    key={system.name}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/6 bg-black/25 px-4 py-3 transition duration-300 hover:border-gold/20 hover:bg-white/[0.045] hover:shadow-[0_0_0_1px_rgba(201,169,77,0.1),0_18px_40px_rgba(201,169,77,0.08)]"
                  >
                    <span className={["text-base", system.tone].join(" ")}>{system.symbol}</span>
                    <span className="truncate text-white/84">{system.name}</span>
                    <span className={["text-xs uppercase tracking-[0.22em]", system.tone].join(" ")}>{system.status}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-black/35 px-4 py-3 font-mono text-xs text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_rgba(201,169,77,0.7)] animate-pulse" />
                  <span className="text-gold/80">$</span>
                  <span>{liveUpdates[activeUpdate]}</span>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </Reveal>
    </SectionShell>
  );
}