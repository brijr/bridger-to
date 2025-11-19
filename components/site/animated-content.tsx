"use client";

import { motion } from "motion/react";
import { Children, isValidElement } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { filter: "blur(3px)", opacity: 0, y: -12 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut" as const,
      opacity: { duration: 1 },
      filter: { duration: 1.2 },
      y: { duration: 1.2 },
    },
  },
};

export function AnimatedContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}
