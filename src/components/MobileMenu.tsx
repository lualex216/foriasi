"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react/dist/ssr";

const NAV_ITEMS = [
  { label: "Misiunea", href: "#misiune" },
  { label: "Fondatori", href: "#fondatori" },
  { label: "Etape", href: "#etape" },
  { label: "Formular", href: "#formular" },
];

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const subscribe = () => () => {};

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const drawer = (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Meniu principal"
          data-glass-strong
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT_QUART }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/60 px-6 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Închide meniu"
            data-glass
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-white/10 bg-muted/30 text-foreground shadow-lg backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-muted/50"
          >
            <X size={20} weight="bold" aria-hidden />
          </button>

          <motion.nav
            aria-label="Navigare mobilă"
            data-glass
            initial={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: EASE_OUT_QUART }}
            className="w-full max-w-sm rounded-3xl border border-white/10 bg-muted/30 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl backdrop-saturate-150"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-5 py-4 text-center font-heading text-2xl font-semibold text-foreground transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Deschide meniu"
        aria-expanded={open}
        data-glass
        className="grid size-10 place-items-center rounded-full border border-white/10 bg-muted/30 text-foreground shadow-xs backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-muted/50 md:hidden"
      >
        <List size={20} weight="bold" aria-hidden />
      </button>

      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}
