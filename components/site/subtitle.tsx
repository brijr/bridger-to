"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { SITE_TAGLINE } from "@/lib/site";

export function Subtitle({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <h3 className={cn("text-muted-foreground relative", className)}>
      <motion.span
        initial={
          prefersReducedMotion
            ? false
            : { filter: "blur(3px)", opacity: 0, y: -40 }
        }
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1,
          ease: "easeInOut",
          opacity: { duration: prefersReducedMotion ? 0 : 1 },
          filter: { duration: prefersReducedMotion ? 0 : 1.2 },
          y: { duration: prefersReducedMotion ? 0 : 1.2 },
        }}
      >
        {SITE_TAGLINE}
      </motion.span>
    </h3>
  );
}
