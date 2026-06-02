"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type HomeHeroMotionPanelProps = {
  children: ReactNode;
};

export function HomeHeroMotionPanel({ children }: HomeHeroMotionPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="home-hero__scroll-motion"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="home-hero__entry-motion"
        initial={prefersReducedMotion ? false : { x: "-106%", opacity: 0.55 }}
        animate={prefersReducedMotion ? undefined : { x: "0%", opacity: 1 }}
        transition={{
          duration: 1.02,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
