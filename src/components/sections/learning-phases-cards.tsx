"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import { CmsImage } from "@/components/ui/cms-image";
import type { FeatureCard } from "@/types/sanity";

type LearningPhasesCardsProps = {
  cards?: FeatureCard[];
};

const fallbackThemes: NonNullable<FeatureCard["theme"]>[] = ["blue", "teal", "orange", "gray"];

function ArrowBadge() {
  return (
    <span className="learning-phases__arrow" aria-hidden="true">
      <ArrowRight size={17} strokeWidth={3} />
    </span>
  );
}

export const LearningPhasesCards = memo(function LearningPhasesCards({ cards = [] }: LearningPhasesCardsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="learning-phases__grid">
      {cards.map((card, index) => {
        const theme = card.theme || fallbackThemes[index % fallbackThemes.length];
        const href = card.cta?.href || "#";

        return (
          <motion.article
            key={`${card.title}-${index}`}
            className={`learning-phase-card learning-phase-card--${theme}`}
            initial={prefersReducedMotion ? false : { y: 22, opacity: 0 }}
            whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{
              duration: 0.72,
              delay: prefersReducedMotion ? 0 : index * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <CmsImage
              image={card.image}
              fallbackLabel={card.title}
              className="learning-phase-card__image"
              imageClassName="object-cover"
              sizes="(max-width: 700px) 92vw, (max-width: 1200px) 44vw, 23vw"
            />

            <div className="learning-phase-card__body">
              <h3 className="learning-phase-card__title">{card.title}</h3>
              {card.description && <p className="learning-phase-card__grades">{card.description}</p>}

              <Link
                href={href}
                target={card.cta?.openInNewTab ? "_blank" : undefined}
                rel={card.cta?.openInNewTab ? "noreferrer" : undefined}
                className="learning-phase-card__button"
              >
                <span>{card.cta?.label || "See More"}</span>
                <ArrowBadge />
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
});
