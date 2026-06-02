import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CmsImage } from "@/components/ui/cms-image";
import { Reveal } from "@/components/ui/reveal";
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

export function LearningPhasesCards({ cards = [] }: LearningPhasesCardsProps) {
  return (
    <div className="learning-phases__grid">
      {cards.map((card, index) => {
        const theme = card.theme || fallbackThemes[index % fallbackThemes.length];
        const href = card.cta?.href || "#";

        return (
          <Reveal
            as="article"
            key={`${card.title}-${index}`}
            className={`learning-phase-card learning-phase-card--${theme}`}
            delay={index * 90}
            threshold={0.16}
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
          </Reveal>
        );
      })}
    </div>
  );
}
