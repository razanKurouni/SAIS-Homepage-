"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import type { FeatureCard } from "@/types/sanity";

type QuickLinksCardsProps = {
  cards?: FeatureCard[];
};

const themeFallbacks: NonNullable<FeatureCard["theme"]>[] = ["blue", "orange", "teal", "gray"];

function QuickLinksArrow() {
  return (
    <span className="quick-links-card__arrow" aria-hidden="true">
      <ArrowRight size={17} strokeWidth={3} />
    </span>
  );
}

function QuickLinksWave() {
  return (
    <svg className="quick-links-card__wave" viewBox="0 0 96 320" preserveAspectRatio="none" aria-hidden="true">
      <path d="M52 -24 C16 42 16 92 42 154 C70 220 70 274 38 344" />
    </svg>
  );
}

function QuickLinksCurveMask() {
  return (
    <svg className="quick-links-card__curve-mask" viewBox="0 0 96 320" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 -32 H52 C16 42 16 92 42 154 C70 220 70 274 38 352 H0 Z" />
    </svg>
  );
}

export const QuickLinksCards = memo(function QuickLinksCards({ cards = [] }: QuickLinksCardsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="quick-links__grid">
      {cards.map((card, index) => {
        const theme = card.theme || themeFallbacks[index % themeFallbacks.length];
        const href = card.cta?.href || "#";

        return (
          <motion.article
            key={`${card.title}-${index}`}
            className={`quick-links-card quick-links-card--${theme}`}
            initial={prefersReducedMotion ? false : { y: 22, opacity: 0 }}
            whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
              duration: 0.74,
              delay: prefersReducedMotion ? 0 : index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="quick-links-card__copy">
              <h3 className="quick-links-card__title">{card.title}</h3>
              {card.description && <p className="quick-links-card__text">{card.description}</p>}

              <Link
                href={href}
                target={card.cta?.openInNewTab ? "_blank" : undefined}
                rel={card.cta?.openInNewTab ? "noreferrer" : undefined}
                className="quick-links-card__button"
              >
                <span>{card.cta?.label || "See More"}</span>
                <QuickLinksArrow />
              </Link>
            </div>

            <QuickLinksWave />
            <QuickLinksCurveMask />

            <div className="quick-links-card__image-wrap">
              {card.image?.url ? (
                <Image
                  src={card.image.url}
                  alt={card.image.alt || card.title}
                  fill
                  quality={82}
                  sizes="(max-width: 767px) 92vw, (max-width: 1200px) 42vw, 520px"
                  className="quick-links-card__image"
                />
              ) : (
                <div className="quick-links-card__fallback">{card.title}</div>
              )}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
});
