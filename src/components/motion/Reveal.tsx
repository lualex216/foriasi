"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Variant = "title" | "card-slide" | "card-scale";

const VARIANTS: Record<Variant, Variants> = {
  title: {
    hidden: {
      opacity: 0,
      y: 24,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  "card-slide": {
    hidden: {
      opacity: 0,
      y: 48,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  "card-scale": {
    hidden: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
};

type As = "div" | "section" | "li" | "h1" | "h2" | "h3" | "p" | "figure";

type RevealProps = {
  variant?: Variant;
  delay?: number;
  as?: As;
  hover?: boolean;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  variant = "title",
  delay = 0,
  as = "div",
  hover = false,
  className,
  children,
}: RevealProps) {
  const variants = VARIANTS[variant];
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      whileHover={
        hover
          ? {
              scale: 1.02,
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
