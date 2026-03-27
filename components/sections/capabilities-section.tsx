import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import { fadeUp, staggerContainer } from "@/lib/motion";

const capabilities = [
  {
    title: "Autonomous Systems",
    description: "AI agents that think, act, and execute independently.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden="true">
        <path d="M24 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 32v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="15" y="15" width="18" height="18" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Intelligence Engines",
    description: "Advanced systems for prediction, optimization, and decision-making.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden="true">
        <path d="M10 34h28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 30l7-9 6 5 7-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="30" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="21" cy="21" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="27" cy="26" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="34" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Human-AI Interfaces",
    description: "Voice, conversation, and real-time interaction systems.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden="true">
        <path d="M15 18c0-5 4-9 9-9s9 4 9 9v5c0 5-4 9-9 9s-9-4-9-9v-5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 32v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 39h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 22c0 7.732 6.268 14 14 14s14-6.268 14-14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function CapabilitiesSection() {
  return (
    <SectionShell
      id="capabilities"
      eyebrow="Capabilities"
      title="Core capability pillars"
      description="The operating domains behind Arcane systems. Focused, minimal, and engineered for high-trust environments."
    >
      <Reveal className="grid gap-5 lg:grid-cols-3" variants={staggerContainer}>
        {capabilities.map((capability, index) => (
          <Reveal key={capability.title} variants={fadeUp} delay={index * 0.04}>
            <GlassPanel className="group h-full p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.055] hover:shadow-[0_0_0_1px_rgba(201,169,77,0.14),0_18px_42px_rgba(201,169,77,0.12)]">
              <div className="flex h-full flex-col">
                <div className="text-gold/80 transition duration-300 group-hover:text-gold">
                  {capability.icon}
                </div>
                <h3 className="mt-8 text-2xl font-medium text-white">{capability.title}</h3>
                <p className="mt-4 max-w-sm text-base leading-7 text-white/60">{capability.description}</p>
              </div>
            </GlassPanel>
          </Reveal>
        ))}
      </Reveal>
    </SectionShell>
  );
}