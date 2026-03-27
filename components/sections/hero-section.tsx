"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], shouldReduceMotion ? [1, 1] : [1, 0.06]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], shouldReduceMotion ? [0, 0] : [0, 88]);
  const contentScale = useTransform(scrollYProgress, [0, 0.55], shouldReduceMotion ? [1, 1] : [1, 0.93]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.55], shouldReduceMotion ? ["blur(0px)", "blur(0px)"] : ["blur(0px)", "blur(8px)"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 70]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.04, 0.98]);
  const dissolveOpacity = useTransform(scrollYProgress, [0.18, 0.72], shouldReduceMotion ? [0.7, 0.7] : [0.2, 1]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen scroll-mt-28 items-center overflow-hidden pb-20 pt-28 md:pb-24 md:pt-32"
    >
      <motion.div className="absolute inset-0" style={{ y: backgroundY, scale: backgroundScale }}>
        <div className="hero-gradient-shift absolute inset-0 opacity-90" />
        <ParallaxLayer className="pointer-events-none absolute inset-0 opacity-60" offset={20}>
          <div className="hero-system-grid h-full w-full" />
        </ParallaxLayer>
        <ParallaxLayer className="pointer-events-none absolute inset-0 opacity-40" offset={28}>
          <div className="hero-neural-pattern h-full w-full" />
        </ParallaxLayer>
        <ParallaxLayer
          className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2"
          offset={34}
        >
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(201,169,77,0.28),rgba(201,169,77,0.08)_34%,transparent_72%)] blur-3xl" />
        </ParallaxLayer>
        <ParallaxLayer className="pointer-events-none absolute left-1/2 top-[18%] h-40 w-40 -translate-x-1/2" offset={18}>
          <div className="h-full w-full rounded-full border border-gold/20 bg-gold/10 blur-2xl" />
        </ParallaxLayer>
      </motion.div>

      <motion.div className="hero-dissolve absolute inset-x-0 bottom-0 h-[32vh]" style={{ opacity: dissolveOpacity }} />
      <div className="section-transition-bottom absolute inset-x-0 bottom-0 h-28" />

      <Container className="relative z-10">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, scale: contentScale, filter: contentBlur }}
          className="will-change-transform"
        >
          <Reveal variants={staggerContainer} className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Reveal variants={fadeUp}>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.36em] text-gold/75 md:mb-8">
              Private Research and Engineering Lab
            </p>
          </Reveal>
          <Reveal variants={fadeUp}>
            <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              We Build What Others Haven&apos;t Imagined Yet
            </h1>
          </Reveal>
          <Reveal variants={fadeUp}>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72 md:mt-8 md:text-xl">
              Arcane is a private R&amp;D lab engineering advanced AI systems, autonomous agents, and next-generation technologies.
            </p>
          </Reveal>
          <Reveal variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="#projects"
              className="gold-pulse inline-flex min-w-[220px] items-center justify-center rounded-full border border-gold/35 bg-gold px-8 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#ddbb5e]"
            >
              View Active Projects
            </Link>
            <Link
              href="#access"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/12 bg-white/[0.045] px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-white/[0.08] hover:text-gold"
            >
              Request Access
            </Link>
          </Reveal>
          </Reveal>
        </motion.div>
      </Container>
    </section>
  );
}