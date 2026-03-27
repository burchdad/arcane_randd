"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CrossFadeGlow() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "start 0.1"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 1]);
  const glowScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0.95, 0.95] : [0.95, 1.02]);

  return (
    <motion.div
      ref={sectionRef}
      style={{
        opacity: glowOpacity,
        scale: glowScale,
      }}
      className="pointer-events-none h-32 will-change-transform"
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/16 via-gold/8 to-transparent" />
        <div className="absolute inset-x-0 top-1/3 h-32 w-full bg-[radial-gradient(ellipse_80%_35%_at_50%_10%,rgba(201,169,77,0.28),rgba(201,169,77,0.08)_40%,transparent_70%)] blur-2xl" />
      </div>
    </motion.div>
  );
}
