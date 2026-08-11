"use client";

import { motion } from "motion/react";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

type GoalProgressProps = {
  count: number;
  target: number;
  targetLabel: string;
  goalLabel: string;
};

export function GoalProgress({
  count,
  target,
  targetLabel,
  goalLabel,
}: GoalProgressProps) {
  const clampedPercent = Math.min((count / target) * 100, 100);
  const formatted = count.toLocaleString("ro-RO");

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{targetLabel}</span>
        <span className="tabular-nums text-foreground/80">{goalLabel}</span>
      </div>

      <div className="relative pb-9">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={target}
          aria-valuenow={Math.min(count, target)}
          aria-label={`Progres înscrieri: ${formatted} din ${target.toLocaleString("ro-RO")}`}
          className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${clampedPercent}%` }}
            transition={{
              duration: 0.9,
              ease: EASE_OUT_QUART,
              delay: 0.4,
            }}
            className="h-full rounded-full bg-brand-blue"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: EASE_OUT_QUART,
            delay: 1.1,
          }}
          style={{ left: `${clampedPercent}%` }}
          className="absolute top-3 -translate-x-1/2"
        >
          <div className="relative rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground shadow-sm">
            <span
              aria-hidden
              className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-primary"
            />
            {formatted}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
