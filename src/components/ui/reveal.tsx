"use client";

import { createElement, memo, type CSSProperties, type ReactNode } from "react";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type RevealProps = {
  as?: "a" | "article" | "div" | "li" | "p" | "section" | "span";
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
};

export const Reveal = memo(function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  threshold = 0.18,
}: RevealProps) {
  const { ref, isInViewport } = useInViewport<HTMLElement>({ once: true, threshold });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isVisible = prefersReducedMotion || isInViewport;
  const style = delay > 0 ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return createElement(
    as,
    {
      className: `${className} reveal-item ${isVisible ? "is-visible" : ""}`.trim(),
      ref,
      style,
    },
    children,
  );
});
