"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Variant = "title" | "card-slide" | "card-scale";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const VARIANTS: Record<Variant, Variants> = {
  title: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE_OUT_QUART },
    },
  },
  "card-slide": {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASE_OUT_QUART },
    },
  },
  "card-scale": {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: EASE_OUT_QUART },
    },
  },
};

type As = "div" | "section" | "li" | "h1" | "h2" | "h3" | "p" | "figure";

type RevealProps = {
  variant?: Variant;
  delay?: number;
  as?: As;
  hover?: boolean;
  immediate?: boolean;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  variant = "title",
  delay = 0,
  as = "div",
  hover = false,
  immediate = false,
  className,
  children,
}: RevealProps) {
  const variants = VARIANTS[variant];
  const Component = motion[as] as typeof motion.div;

  const triggerProps = immediate
    ? { animate: "visible" as const }
    : {
        whileInView: "visible" as const,
        viewport: {
          once: true,
          amount: 0.2,
          margin: "0px 0px -80px 0px",
        },
      };

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      {...triggerProps}
      whileHover={
        hover
          ? {
              scale: 1.02,
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
