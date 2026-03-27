"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import { fadeUp, staggerContainer } from "@/lib/motion";

const projects = [
  {
    title: "Autonomous AI Orchestration System",
    description: "Control layer for deploying, supervising, and optimizing autonomous agent operations.",
    status: "Active",
    details:
      "This system coordinates specialized AI workers across secure workflows, balancing autonomy with supervisory control. It monitors execution quality, reroutes tasks in real time, and enforces policy boundaries across every operating surface.",
    components: ["Agent routing mesh", "Policy guardrails", "Execution telemetry"],
  },
  {
    title: "Real-Time Voice Intelligence Engine",
    description: "Low-latency voice analysis stack for live inference, routing, and high-trust decision support.",
    status: "Training",
    details:
      "The engine performs streaming speech interpretation, intent mapping, and response guidance inside tightly constrained latency budgets. It is being tuned for resilient multilingual performance, real-time signal cleanup, and operator-aware escalation logic.",
    components: ["Streaming inference", "Intent classification", "Signal cleanup"],
  },
  {
    title: "Financial Decision AI",
    description: "CFO-grade intelligence engine built for forecasting, capital allocation, and risk-aware planning.",
    status: "Active",
    details:
      "Financial Decision AI models strategic planning across liquidity, growth, and risk scenarios with executive-grade explainability. It combines predictive modeling with structured decision pathways so leadership teams can move faster without sacrificing clarity.",
    components: ["Forecast modeling", "Risk simulation", "Decision pathways"],
  },
  {
    title: "Offline AI Runtime",
    description: "Ghost Brain enables private local inference in disconnected or high-security environments.",
    status: "Classified",
    details:
      "Ghost Brain runs advanced inference entirely inside disconnected or sealed environments where external dependency chains are unacceptable. It is optimized for portability, model isolation, and deterministic local execution under restrictive operational conditions.",
    components: ["Air-gapped inference", "Portable runtime", "Model isolation"],
  },
  {
    title: "Multi-Agent Command Framework",
    description: "Mission control interface for coordinating specialized agent teams across complex workflows.",
    status: "Active",
    details:
      "This framework provides the command surface for assigning roles, synchronizing outputs, and supervising multi-agent collaboration at scale. It is designed for complex environments where visibility, controllability, and timing all matter simultaneously.",
    components: ["Operator command layer", "Coordination logic", "Supervision console"],
  },
  {
    title: "Adaptive Threat Signal Mesh",
    description: "Continuous anomaly detection fabric for autonomous monitoring across sensitive digital terrain.",
    status: "Classified",
    details:
      "Adaptive Threat Signal Mesh watches high-sensitivity environments for weak signals, anomalous behavior, and fast-moving system changes. Its architecture prioritizes continuous sensing, layered correlation, and response escalation without overexposing protected infrastructure.",
    components: ["Anomaly sensing", "Signal correlation", "Escalation triggers"],
  },
];

const statusTone: Record<string, string> = {
  Active: "border-gold/25 bg-gold/10 text-gold",
  Training: "border-amber-200/15 bg-amber-200/10 text-amber-100",
  Classified: "border-white/12 bg-white/8 text-white/72",
};

const filters = ["All", "Active", "Training", "Classified"] as const;

type ProjectFilter = (typeof filters)[number];

const filterCounts: Record<ProjectFilter, number> = {
  All: projects.length,
  Active: projects.filter((p) => p.status === "Active").length,
  Training: projects.filter((p) => p.status === "Training").length,
  Classified: projects.filter((p) => p.status === "Classified").length,
};

export function ProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [contentDirection, setContentDirection] = useState<"next" | "prev" | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get("filter") as ProjectFilter | null;
    if (filterParam && (filters as readonly string[]).includes(filterParam)) {
      setActiveFilter(filterParam);
    }
  }, []);

  const handleFilterChange = useCallback((filter: ProjectFilter) => {
    setActiveFilter(filter);
    const url = new URL(window.location.href);
    if (filter === "All") {
      url.searchParams.delete("filter");
    } else {
      url.searchParams.set("filter", filter);
    }
    window.history.replaceState(null, "", url.toString());
  }, []);

  const visibleProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.status === activeFilter);

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;

  const handlePrevProject = useCallback(() => {
    setActiveProjectIndex((prevIndex) => {
      if (prevIndex !== null) {
        setContentDirection("prev");
        return prevIndex === 0 ? projects.length - 1 : prevIndex - 1;
      }
      return null;
    });
  }, []);

  const handleNextProject = useCallback(() => {
    setActiveProjectIndex((prevIndex) => {
      if (prevIndex !== null) {
        setContentDirection("next");
        return prevIndex === projects.length - 1 ? 0 : prevIndex + 1;
      }
      return null;
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveProjectIndex(null);
    setContentDirection(null);
  }, []);

  useEffect(() => {
    if (activeProjectIndex === null) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleCloseModal();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevProject();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNextProject();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [activeProjectIndex, handleCloseModal, handlePrevProject, handleNextProject]);

  return (
    <>
      <SectionShell
        id="projects"
        eyebrow="Active Projects"
        title="Active Systems"
        description="Technologies currently in development and deployment."
      >
        <Reveal variants={fadeUp}>
          <div className="mb-8 md:mb-10">
            <div className="flex flex-wrap gap-2.5">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => handleFilterChange(filter)}
                    className={[
                      "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition duration-300",
                      isActive
                        ? "border-gold/40 bg-gold/[0.14] text-gold shadow-[0_0_0_1px_rgba(201,169,77,0.16),0_0_28px_rgba(201,169,77,0.1),inset_0_1px_0_rgba(255,215,0,0.08)]"
                        : "border-white/10 bg-white/[0.03] text-white/56 hover:border-gold/20 hover:text-gold/80",
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    {filter}
                    <span
                      className={[
                        "tabular-nums text-[10px] font-normal transition duration-300",
                        isActive ? "text-gold/65" : "text-white/28",
                      ].join(" ")}
                    >
                      ({filterCounts[filter]})
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex h-5 items-center justify-end">
              <motion.span
                key={visibleProjects.length}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="text-[11px] uppercase tracking-[0.3em] text-white/30"
              >
                {visibleProjects.length} {visibleProjects.length === 1 ? "system" : "systems"}
              </motion.span>
            </div>
          </div>
        </Reveal>

        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <Reveal variants={fadeUp} delay={index * 0.03}>
                  <button
                    type="button"
                    onClick={() => setActiveProjectIndex(projects.indexOf(project))}
                    className="block h-full w-full text-left"
                    aria-haspopup="dialog"
                    aria-label={`Open details for ${project.title}`}
                  >
                    <GlassPanel className="group relative h-full overflow-hidden p-6 transition duration-500 hover:-translate-y-1.5 hover:bg-white/[0.055] hover:shadow-[0_0_0_1px_rgba(201,169,77,0.16),0_20px_60px_rgba(201,169,77,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-gold/0 transition duration-500 group-hover:border-gold/20 group-focus-visible:border-gold/20" />
                      <div className="pointer-events-none absolute left-[-35%] top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-gold/80 to-transparent opacity-0 transition-all duration-700 group-hover:left-[85%] group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.12),transparent_45%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                      <div className="relative flex h-full flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <p className="max-w-[15rem] text-lg font-medium leading-6 text-white">{project.title}</p>
                          <span
                            className={[
                              "inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em]",
                              statusTone[project.status],
                            ].join(" ")}
                          >
                            {project.status}
                          </span>
                        </div>

                        <p className="mt-5 text-sm leading-7 text-white/58">{project.description}</p>

                        <div className="mt-8 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/30 transition group-hover:text-white/45">
                          <span>Open system profile</span>
                          <span className="text-gold/80">0{index + 1}</span>
                        </div>
                      </div>
                    </GlassPanel>
                  </button>
                </Reveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </SectionShell>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-8 md:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-hidden={false}
          >
            <button
              type="button"
              aria-label="Close project details"
              className="absolute inset-0 bg-black/72 backdrop-blur-md"
              onClick={handleCloseModal}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              aria-describedby="project-dialog-description"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <GlassPanel className="relative overflow-hidden rounded-[32px] border-gold/10 bg-black/70 p-7 shadow-[0_0_0_1px_rgba(201,169,77,0.12),0_30px_120px_rgba(0,0,0,0.55)] md:p-9">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.12),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent opacity-80" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-gold/72">Active System Profile</p>
                        <span className="text-[11px] uppercase tracking-[0.28em] text-white/30">
                          {activeProjectIndex !== null && `${activeProjectIndex + 1} of ${projects.length}`}
                        </span>
                      </div>
                      <h3 id="project-dialog-title" className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                        {activeProject.title}
                      </h3>
                    </div>

                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={handleCloseModal}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition duration-300 hover:border-gold/30 hover:bg-white/[0.06] hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      <span className="sr-only">Close dialog</span>
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                        <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span
                      className={[
                        "inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em]",
                        statusTone[activeProject.status],
                      ].join(" ")}
                    >
                      {activeProject.status}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.28em] text-white/35">Controlled access</span>
                  </div>

                  <motion.div
                    key={`project-${activeProjectIndex}`}
                    initial={contentDirection === "next" ? { opacity: 0, x: 24 } : contentDirection === "prev" ? { opacity: 0, x: -24 } : { opacity: 1, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p id="project-dialog-description" className="mt-6 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
                      {activeProject.details}
                    </p>
                  </motion.div>

                  <div className="mt-8 rounded-[28px] border border-white/8 bg-white/[0.025] p-5 md:p-6">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gold/72">Capabilities</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {activeProject.components.map((component) => (
                        <div
                          key={component}
                          className="rounded-2xl border border-white/8 bg-black/30 px-4 py-4 text-sm text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                        >
                          {component}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-white/8 pt-6">
                    <button
                      type="button"
                      onClick={handlePrevProject}
                      aria-label="View previous project"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/72 transition duration-300 hover:border-gold/30 hover:bg-gold/10 hover:text-gold"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                        <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    <span className="text-[11px] uppercase tracking-[0.32em] text-white/30">Keyboard: ← → to navigate</span>

                    <button
                      type="button"
                      onClick={handleNextProject}
                      aria-label="View next project"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/72 transition duration-300 hover:border-gold/30 hover:bg-gold/10 hover:text-gold"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}