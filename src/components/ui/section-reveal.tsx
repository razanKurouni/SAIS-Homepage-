"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export const SectionReveal = memo(function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { y: 26, opacity: 0 }}
      whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
});
