import { AccessSection } from "@/components/sections/access-section";
import { ArcaneTerminalSection } from "@/components/sections/arcane-terminal-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SystemStatusSection } from "@/components/sections/system-status-section";
import { CrossFadeGlow } from "@/components/motion/cross-fade-glow";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SystemStatusSection />
      <ArcaneTerminalSection />
      <CrossFadeGlow />
      <ProjectsSection />
      <CapabilitiesSection />
      <AccessSection />
    </>
  );
}