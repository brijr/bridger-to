"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { SITE_TAGLINE } from "@/lib/site";

// Inter Tight has no glyph for U+2734, so browsers fall back to whatever
// font has it, often a color emoji (e.g. Chrome on Linux and Android),
// even with the U+FE0E text selector. Draw the star inline so it always
// matches the text color; the glyph stays in SITE_TAGLINE for metadata.
const STAR = "\u2734\uFE0E";
const [taglineStart, taglineEnd] = SITE_TAGLINE.split(STAR);

function Star() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="inline-block size-[0.7em] align-[-0.04em] fill-current"
    >
      <polygon points="12,0 13.76,7.75 20.49,3.51 16.25,10.24 24,12 16.25,13.76 20.49,20.49 13.76,16.25 12,24 10.24,16.25 3.51,20.49 7.75,13.76 0,12 7.75,10.24 3.51,3.51 10.24,7.75" />
    </svg>
  );
}

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
        {taglineEnd === undefined ? (
          SITE_TAGLINE
        ) : (
          <>
            {taglineStart}
            <Star />
            {taglineEnd}
          </>
        )}
      </motion.span>
    </h3>
  );
}
