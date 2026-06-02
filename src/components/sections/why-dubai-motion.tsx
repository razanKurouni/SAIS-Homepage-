"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Globe2, Network, UsersRound } from "lucide-react";
import { memo } from "react";
import type { ComponentType } from "react";
import type { HomepageData, WhyDubaiItem } from "@/types/sanity";

type WhyDubaiMotionProps = {
  section: NonNullable<HomepageData["whyDubai"]>;
};

const iconMap: Record<NonNullable<WhyDubaiItem["iconType"]>, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  student: Award,
  globe: Globe2,
  learning: Network,
  family: UsersRound,
};

export const WhyDubaiMotion = memo(function WhyDubaiMotion({ section }: WhyDubaiMotionProps) {
  const prefersReducedMotion = useReducedMotion();
  const title = section.heading?.title || "Why SAIS Dubai?";
  const subtitle = section.heading?.subtitle;

  return (
    <section className="why-dubai" aria-labelledby="why-dubai-title">
      <motion.div
        className="why-dubai__inner"
        initial={prefersReducedMotion ? false : { y: 24, opacity: 0 }}
        whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h2
          id="why-dubai-title"
          className="why-dubai__title"
          initial={prefersReducedMotion ? false : { x: 28, opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            className="why-dubai__subtitle"
            initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
            whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.62, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>
        )}

        <div className="why-dubai__items">
          {section.items?.map((item, index) => {
            const Icon = iconMap[item.iconType || "student"] || Award;

            return (
              <motion.article
                className="why-dubai__item"
                key={`${item.description}-${index}`}
                initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
                whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: 0.62,
                  delay: prefersReducedMotion ? 0 : 0.16 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="why-dubai__icon">
                  {item.icon?.url ? (
                    // SVG icon bases render more reliably as plain images than through next/image.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.icon.url} alt="" aria-hidden="true" className="why-dubai__icon-image" />
                  ) : (
                    <Icon size={84} strokeWidth={1.9} />
                  )}
                </span>
                <p>{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
});
