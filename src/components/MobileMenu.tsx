"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react/dist/ssr";

const NAV_ITEMS = [
  { label: "Misiunea", href: "#misiune" },
  { label: "Fondatori", href: "#fondatori" },
  { label: "Etape", href: "#etape" },
  { label: "Formular", href: "#formular" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const drawer = open ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Meniu principal"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/60 px-6 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Închide meniu"
        className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-white/10 bg-muted/30 text-foreground shadow-lg backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-muted/50"
      >
        <X size={20} weight="bold" aria-hidden />
      </button>

      <nav
        aria-label="Navigare mobilă"
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
      </nav>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Deschide meniu"
        aria-expanded={open}
        className="grid size-10 place-items-center rounded-full border border-white/10 bg-muted/30 text-foreground shadow-xs backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-muted/50 md:hidden"
      >
        <List size={20} weight="bold" aria-hidden />
      </button>

      {mounted && drawer ? createPortal(drawer, document.body) : null}
    </>
  );
}
