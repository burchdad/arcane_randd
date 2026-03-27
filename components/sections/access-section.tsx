"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";

import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import { fadeUp } from "@/lib/motion";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

function validateForm(values: FormState) {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}

export function AccessSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<"idle" | "success">("idle");
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

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

  function updateField(field: keyof FormState, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmissionState("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(formValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => window.setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setSubmissionState("success");
    setFormValues(initialFormState);
    setErrors({});
  }

  function closeModal() {
    if (isSubmitting) {
      return;
    }

    setIsOpen(false);
  }

  return (
    <>
      <SectionShell
        id="access"
        eyebrow="Access"
        title="Invitation-only collaboration"
        description="Arcane collaborates with select partners to develop and deploy advanced technologies. Access is limited."
      >
        <Reveal variants={fadeUp}>
          <GlassPanel className="relative overflow-hidden px-8 py-14 text-center shadow-[0_24px_90px_rgba(0,0,0,0.42)] md:px-12 md:py-16">
            <div className="access-spotlight absolute inset-0 opacity-90" />
            <div className="pointer-events-none absolute inset-x-[18%] top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent opacity-80" />
            <ParallaxLayer className="pointer-events-none absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2" offset={22}>
              <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.16),transparent_66%)] blur-3xl" />
            </ParallaxLayer>

            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-gold/75">Restricted Entry</p>
              <h3 className="mt-5 text-3xl font-semibold text-white md:text-5xl">
                Private development access for a narrow set of strategic partners.
              </h3>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
                Arcane collaborates with select partners to develop and deploy advanced technologies. Access is limited.
              </p>

              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="gold-pulse shimmer-sweep inline-flex items-center justify-center rounded-full border border-gold/35 bg-gold px-8 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#ddbb5e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Request Access
                </button>
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </SectionShell>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center px-4 py-8 md:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <button
              type="button"
              aria-label="Close request access modal"
              className="absolute inset-0 bg-black/76 backdrop-blur-md"
              onClick={closeModal}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="request-access-title"
              aria-describedby="request-access-description"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <GlassPanel className="relative overflow-hidden rounded-[32px] border-gold/10 bg-black/72 p-7 shadow-[0_0_0_1px_rgba(201,169,77,0.12),0_30px_120px_rgba(0,0,0,0.55)] md:p-9">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent opacity-80" />

                <div className="relative z-10">
                  <AnimatePresence mode="wait" initial={false}>
                    {submissionState === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.97, y: 14 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition duration-300 hover:border-gold/30 hover:bg-white/[0.06] hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                          >
                            <span className="sr-only">Close dialog</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                              <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex flex-col items-center py-6 text-center">
                          <div className="relative mb-7">
                            <div className="pointer-events-none absolute inset-0 rounded-full bg-gold/20 blur-2xl" />
                            <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-gold/24 bg-gold/[0.07]">
                              <svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                                <path d="M20 3L37 20L20 37L3 20L20 3Z" stroke="rgba(201,169,77,0.85)" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(201,169,77,0.06)" />
                                <path d="M20 11L29 20L20 29L11 20L20 11Z" stroke="rgba(201,169,77,0.48)" strokeWidth="1" strokeLinejoin="round" fill="rgba(201,169,77,0.04)" />
                                <circle cx="20" cy="20" r="2.5" fill="rgba(201,169,77,0.9)" />
                              </svg>
                            </div>
                          </div>

                          <p className="text-[11px] uppercase tracking-[0.36em] text-gold/70">Confirmed</p>
                          <h4 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
                            Request Received
                          </h4>
                          <p className="mx-auto mt-5 max-w-sm text-base leading-7 text-white/58">
                            Your access request has been logged for review. Arcane will contact you through secure channels if selected.
                          </p>

                          <button
                            type="button"
                            onClick={closeModal}
                            className="mt-10 inline-flex items-center justify-center rounded-full border border-gold/30 bg-transparent px-8 py-3 text-sm font-medium text-gold/85 transition duration-300 hover:border-gold/50 hover:bg-gold/[0.08] hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                          >
                            Dismiss
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18, ease: "easeIn" }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.32em] text-gold/72">Request Access</p>
                            <h3 id="request-access-title" className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                              Access to Arcane systems is limited.
                            </h3>
                            <p id="request-access-description" className="mt-4 max-w-xl text-base leading-8 text-white/64 md:text-lg">
                              Submit your request to be considered.
                            </p>
                          </div>

                          <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={closeModal}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition duration-300 hover:border-gold/30 hover:bg-white/[0.06] hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                          >
                            <span className="sr-only">Close dialog</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                              <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                          <div className="grid gap-5 md:grid-cols-2">
                            <div>
                              <label htmlFor="access-name" className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-white/46">
                                Name
                              </label>
                              <input
                                id="access-name"
                                value={formValues.name}
                                onChange={(event) => updateField("name", event.target.value)}
                                className="access-input h-12 w-full rounded-2xl border border-white/10 bg-black/35 px-4 text-sm text-white outline-none transition placeholder:text-white/24"
                                placeholder="Your name"
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? "access-name-error" : undefined}
                              />
                              {errors.name ? (
                                <p id="access-name-error" className="mt-2 text-sm text-amber-100/85">
                                  {errors.name}
                                </p>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="access-email" className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-white/46">
                                Email
                              </label>
                              <input
                                id="access-email"
                                type="email"
                                value={formValues.email}
                                onChange={(event) => updateField("email", event.target.value)}
                                className="access-input h-12 w-full rounded-2xl border border-white/10 bg-black/35 px-4 text-sm text-white outline-none transition placeholder:text-white/24"
                                placeholder="name@company.com"
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? "access-email-error" : undefined}
                              />
                              {errors.email ? (
                                <p id="access-email-error" className="mt-2 text-sm text-amber-100/85">
                                  {errors.email}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div>
                            <label htmlFor="access-company" className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-white/46">
                              Company
                            </label>
                            <input
                              id="access-company"
                              value={formValues.company}
                              onChange={(event) => updateField("company", event.target.value)}
                              className="access-input h-12 w-full rounded-2xl border border-white/10 bg-black/35 px-4 text-sm text-white outline-none transition placeholder:text-white/24"
                              placeholder="Optional"
                            />
                          </div>

                          <div>
                            <label htmlFor="access-message" className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-white/46">
                              Message
                            </label>
                            <textarea
                              id="access-message"
                              value={formValues.message}
                              onChange={(event) => updateField("message", event.target.value)}
                              className="access-input min-h-[140px] w-full rounded-[24px] border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/24"
                              placeholder="Tell us about your technical mandate, deployment goals, and constraints."
                              aria-invalid={Boolean(errors.message)}
                              aria-describedby={errors.message ? "access-message-error" : undefined}
                            />
                            {errors.message ? (
                              <p id="access-message-error" className="mt-2 text-sm text-amber-100/85">
                                {errors.message}
                              </p>
                            ) : null}
                          </div>

                          <div className="flex flex-col gap-4 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm leading-7 text-white/46">
                              Requests are reviewed manually. No backend is connected yet; submission is currently mocked.
                            </p>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="gold-pulse shimmer-sweep inline-flex min-w-[180px] items-center justify-center rounded-full border border-gold/35 bg-gold px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#ddbb5e] disabled:cursor-not-allowed disabled:opacity-65"
                            >
                              {isSubmitting ? (
                                <>
                                  <svg
                                    className="mr-2 h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      className="opacity-30"
                                    />
                                    <path
                                      fill="currentColor"
                                      className="opacity-80"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                  </svg>
                                  Submitting…
                                </>
                              ) : (
                                "Submit Request"
                              )}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}