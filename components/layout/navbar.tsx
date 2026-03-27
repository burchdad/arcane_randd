"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { useScrollSpy } from "@/lib/hooks/use-scroll-spy";
import { smoothScrollToSection } from "@/lib/scroll-to-section";

const links = [
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "capabilities", href: "#capabilities", label: "Capabilities" },
  { id: "access", href: "#access", label: "Access" },
];

const allSectionIds = ["top", ...links.map((link) => link.id)];

const linkListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const linkItemVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  const activeSection = useScrollSpy(allSectionIds, 100);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight + 200; // Approximate hero size
      const progress = Math.min(scrollY / heroHeight, 1);

      setScrolled(scrollY > 18);
      setHeroScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeDrawer();
    smoothScrollToSection(id, 80);
  };

  const drawerTransition = {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <motion.div
          className={[
            "rounded-full py-3",
            shouldReduceMotion ? "transition-all duration-300" : "",
          ].join(" ")}
          style={{
            borderColor: `rgba(201, 169, 77, ${shouldReduceMotion ? 0.1 : heroScrollProgress * 0.12})`,
            backgroundColor: `rgba(0, 0, 0, ${shouldReduceMotion ? 0.12 : 0.12 + heroScrollProgress * 0.46})`,
            backdropFilter: `blur(${shouldReduceMotion ? 0 : heroScrollProgress * 16}px)`,
            boxShadow: heroScrollProgress > 0.3 ? "0 0 0 1px rgba(201, 169, 77, 0.06), 0 24px 48px rgba(201, 169, 77, 0.12)" : "none",
            border: `1px solid rgba(201, 169, 77, ${shouldReduceMotion ? 0.1 : heroScrollProgress * 0.12})`,
          }}
        >
          <Container>
            <div className="flex items-center justify-between gap-4">
              <Link href="#top" className="text-sm font-semibold uppercase tracking-luxe text-gradient-gold">
                ARCANE
              </Link>

            <nav className="hidden items-center gap-1 overflow-x-auto text-[13px] uppercase tracking-[0.18em] text-white/68 md:flex md:gap-2">
              {links.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <div key={link.href} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={[
                        "relative block rounded-full px-3 py-2 transition duration-300",
                        isActive
                          ? "text-gold"
                          : "text-white/68 hover:bg-white/5 hover:text-gold",
                      ].join(" ")}
                    >
                      {link.label}
                    </a>
                    {isActive ? (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-1 left-3 right-3 h-px bg-gradient-to-r from-gold/0 via-gold to-gold/0 nav-indicator-glow"
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              aria-controls="arcane-mobile-drawer"
              onClick={() => setIsOpen(true)}
              className="mobile-nav-button group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/25 text-gold transition duration-300 hover:border-gold/30 hover:bg-white/[0.05] md:hidden"
            >
              <span className="sr-only">Open menu</span>
              <span className="flex flex-col gap-1.5">
                <span className="h-px w-5 bg-current transition duration-300 group-hover:w-6" />
                <span className="h-px w-6 bg-current" />
                <span className="h-px w-4 self-end bg-current transition duration-300 group-hover:w-5" />
              </span>
            </button>
          </div>
        </Container>
        </motion.div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="fixed inset-0 z-[70] md:hidden"
          >
            <button
              type="button"
              aria-label="Close navigation overlay"
              onClick={closeDrawer}
              className="absolute inset-0 mobile-drawer-backdrop"
            />

            <motion.aside
              id="arcane-mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={drawerTransition}
              className="mobile-drawer-panel absolute inset-y-0 right-0 flex w-[min(88vw,28rem)] flex-col overflow-hidden border-l border-gold/12"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,77,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
              <div className="pointer-events-none absolute inset-y-10 left-0 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent opacity-60" />
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/75 to-transparent opacity-75" />

              <div className="relative z-10 flex items-center justify-between px-6 pb-5 pt-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-luxe text-gradient-gold">ARCANE</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-white/40">Navigation Matrix</p>
                </div>

                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={closeDrawer}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition duration-300 hover:border-gold/30 hover:bg-white/[0.06] hover:text-gold"
                >
                  <span className="sr-only">Close menu</span>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <motion.nav
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={linkListVariants}
                className="relative z-10 flex flex-1 flex-col px-6 pb-8 pt-4"
              >
                <div className="mb-6 h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0" />

                <div className="space-y-3">
                  {links.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <motion.div key={link.href} variants={linkItemVariants}>
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.id)}
                          className={[
                            "mobile-drawer-link group relative flex items-center justify-between rounded-[28px] border px-5 py-5 text-[1.65rem] font-medium tracking-[-0.03em] transition duration-300",
                            isActive
                              ? "border-gold/40 bg-gold/12 text-gold"
                              : "border-white/8 text-white hover:border-gold/20 hover:bg-white/[0.05] hover:text-gold",
                          ].join(" ")}
                        >
                          <span>{link.label}</span>
                          <span className={[
                            "text-xs uppercase tracking-[0.28em] transition duration-300",
                            isActive ? "text-gold" : "text-gold/55 group-hover:text-gold",
                          ].join(" ")}>
                            {isActive ? "Active" : "Open"}
                          </span>
                        </a>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div variants={linkItemVariants} className="mt-auto pt-10">
                  <div className="rounded-[28px] border border-gold/10 bg-white/[0.03] px-5 py-5">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gold/72">Private Lab</p>
                    <p className="mt-3 max-w-[18rem] text-sm leading-7 text-white/58">
                      Precision systems, select access, and controlled deployment surfaces.
                    </p>
                  </div>
                </motion.div>
              </motion.nav>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}