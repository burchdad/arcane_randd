"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";

export function Footer() {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());

    setLastUpdated(format());

    const interval = window.setInterval(() => {
      setLastUpdated(format());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="relative z-10 border-t border-white/8 py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent opacity-70" />
      <Container className="flex flex-col gap-3 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>Arcane R&amp;D — Engineering the Future</p>
        <p>Last Updated: {lastUpdated || "Syncing..."}</p>
      </Container>
    </footer>
  );
}