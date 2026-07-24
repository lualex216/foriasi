"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Misiunea", href: "#misiune" },
  { label: "Fondatori", href: "#fondatori" },
  { label: "Etape", href: "#etape" },
  { label: "Formular", href: "#formular" },
];

const SCROLL_THRESHOLD = 400;

export function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navigare fixă"
      className={cn(
        "fixed left-1/2 top-4 z-40 hidden -translate-x-1/2 rounded-full border border-white/10 bg-muted/30 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl backdrop-saturate-150 transition-[opacity,transform] duration-300 ease-out md:block",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0",
      )}
    >
      <ul className="flex items-center gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active = activeSection === item.href.slice(1);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-blue text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
