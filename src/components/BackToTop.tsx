"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Înapoi sus"
      className={cn(
        "fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full border border-border bg-primary text-primary-foreground shadow-lg transition-all duration-300 ease-out md:bottom-8 md:right-8 md:size-14",
        "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp size={20} weight="bold" aria-hidden />
    </button>
  );
}
