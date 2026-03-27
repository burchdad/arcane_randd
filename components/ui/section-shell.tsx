"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { Container } from "@/components/ui/container";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function SectionShell({ id, eyebrow, title, description, children }: SectionShellProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.95", "start 0.4"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0.44, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [24, 0]);

  return (
    <section ref={sectionRef} id={id} className="relative isolate scroll-mt-28 py-20 md:py-28">
      <div className="section-transition-top absolute inset-x-0 top-0 h-24" />
      <div className="section-transition-bottom absolute inset-x-0 bottom-0 h-24" />
      <ParallaxLayer className="pointer-events-none absolute inset-0 -z-10" offset={18}>
        <div className="section-ambient mx-auto h-full max-w-6xl" />
      </ParallaxLayer>

      <Container className="relative">
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="mb-12 max-w-3xl md:mb-16 will-change-transform">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-gold/80">{eyebrow}</p>
          ) : null}
          <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">{description}</p>
        </motion.div>
        {children}
      </Container>
    </section>
  );
}