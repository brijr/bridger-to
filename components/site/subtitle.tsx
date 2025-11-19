"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const labels = [
  {
    label: "Design Engineer",
  },
  {
    label: "Software Engineer",
  },
  {
    label: "Design Generalist",
  },
  {
    label: "Marketing Developer",
  },
];

export function Subtitle() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % labels.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <h3 className="text-muted-foreground relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ filter: "blur(3px)", opacity: 0, y: -40 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          exit={{ filter: "blur(3px)", opacity: 0, y: 30 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            opacity: { duration: 1 },
            filter: { duration: 1.2 },
            y: { duration: 1.2 },
          }}
        >
          {labels[currentIndex].label}
        </motion.span>
      </AnimatePresence>
    </h3>
  );
}
