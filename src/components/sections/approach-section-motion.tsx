"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Cta, SanityImage } from "@/types/sanity";

type ApproachSectionMotionProps = {
  title?: string;
  lead?: string;
  paragraphs?: string[];
  image?: SanityImage;
  cta?: Cta;
};

function ArrowBadge() {
  return (
    <span className="approach-section__arrow" aria-hidden="true">
      <ArrowRight size={17} strokeWidth={3} />
    </span>
  );
}

export function ApproachSectionMotion({
  title = "Educational Approach",
  lead,
  paragraphs = [],
  image,
  cta,
}: ApproachSectionMotionProps) {
  const prefersReducedMotion = useReducedMotion();
  const copyItems = [lead, ...paragraphs].filter(Boolean);

  if (!copyItems.length && !image?.url) {
    return null;
  }

  return (
    <section className="approach-section" aria-labelledby="approach-section-title">
      <h2 id="approach-section-title" className="sr-only">
        {title}
      </h2>

      {image?.url && (
        <motion.div
          className="approach-section__image-wrap"
          initial={prefersReducedMotion ? false : { opacity: 0, x: 28 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={image.url}
            alt={image.alt || title}
            fill
            sizes="100vw"
            quality={82}
            className="approach-section__image"
          />
        </motion.div>
      )}

      <motion.div
        className="approach-section__panel"
        initial={prefersReducedMotion ? false : { x: -24, opacity: 0 }}
        whileInView={prefersReducedMotion ? undefined : { x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.86, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg
          className="approach-section__shape"
          viewBox="0 0 1647 928"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="approach-section__shape-fill"
            d="M0,0 H1460 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980 L0,928 Z"
          />
          <path
            className="approach-section__shape-accent"
            d="M1460,-50 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980"
            fill="none"
            strokeWidth="88"
            strokeLinecap="round"
          />
        </svg>

        <div className="approach-section__content">
          {lead && (
            <motion.p
              className="approach-section__lead"
              initial={prefersReducedMotion ? false : { y: 24, opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.74, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {lead}
            </motion.p>
          )}

          <div className="approach-section__paragraphs">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={prefersReducedMotion ? false : { y: 28, opacity: 0 }}
                whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{
                  duration: 0.72,
                  delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {cta && (
            <motion.div
              initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.7, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={cta.href || "#"}
                target={cta.openInNewTab ? "_blank" : undefined}
                rel={cta.openInNewTab ? "noreferrer" : undefined}
                className="approach-section__button"
              >
                <span>{cta.label}</span>
                <ArrowBadge />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
