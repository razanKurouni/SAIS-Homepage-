"use client";

import { Accessibility, BrainCircuit, Globe2, MessagesSquare, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { Reveal } from "@/components/ui/reveal";
import type {
  AcademicsSupportProgramCard,
  AcademicsSupportProgramsSection as AcademicsSupportProgramsSectionData,
} from "@/types/sanity";

type AcademicsSupportProgramsSliderSectionProps = {
  section?: AcademicsSupportProgramsSectionData;
  fallbackSection: AcademicsSupportProgramsSectionData;
  className?: string;
};

type SupportProgramsStyle = CSSProperties & {
  "--support-programs-bg"?: string;
  "--support-programs-title"?: string;
  "--support-card-border"?: string;
  "--support-card-hover-border"?: string;
  "--support-card-text"?: string;
};

type SupportProgramsTrackStyle = CSSProperties & {
  "--support-visible-count"?: number;
};

const fallbackIconMap = {
  determination: Accessibility,
  gifted: Sparkles,
  eal: Globe2,
  counseling: MessagesSquare,
  differentiation: BrainCircuit,
} satisfies Record<NonNullable<AcademicsSupportProgramCard["iconType"]>, typeof Accessibility>;

function getVisibleCount() {
  if (typeof window === "undefined") {
    return 3;
  }

  if (window.innerWidth >= 960) {
    return 3;
  }

  if (window.innerWidth >= 640) {
    return 2;
  }

  return 1;
}

export function AcademicsSupportProgramsSliderSection({
  section,
  fallbackSection,
  className = "",
}: AcademicsSupportProgramsSliderSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const cards = section?.cards?.length ? section.cards : fallbackSection.cards || [];
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeStart, setActiveStart] = useState(0);
  const maxStart = Math.max(0, cards.length - visibleCount);
  const safeActiveStart = Math.min(activeStart, maxStart);
  const dots = useMemo(() => Array.from({ length: maxStart + 1 }, (_, index) => index), [maxStart]);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount());
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  if (!heading?.title && !cards.length) {
    return null;
  }

  const style: SupportProgramsStyle = {
    "--support-programs-bg": section?.backgroundColor || fallbackSection.backgroundColor,
    "--support-programs-title": section?.titleColor || fallbackSection.titleColor,
    "--support-card-border": section?.cardBorderColor || fallbackSection.cardBorderColor,
    "--support-card-hover-border": section?.cardHoverBorderColor || fallbackSection.cardHoverBorderColor,
    "--support-card-text": section?.cardTextColor || fallbackSection.cardTextColor,
  };
  const trackStyle: SupportProgramsTrackStyle = {
    "--support-visible-count": visibleCount,
    transform: `translateX(calc(-${safeActiveStart} * ((100% - (${visibleCount - 1} * var(--support-slider-gap))) / ${visibleCount} + var(--support-slider-gap))))`,
  };

  return (
    <section
      className={`academics-support-programs ${className}`.trim()}
      aria-labelledby={heading?.title ? "academics-support-programs-title" : undefined}
      style={style}
    >
      <Reveal className="academics-support-programs__inner">
        {heading?.title ? (
          <h2 id="academics-support-programs-title" className="academics-support-programs__title">
            {heading.title}
          </h2>
        ) : null}

        {cards.length ? (
          <>
            <div className="academics-support-programs__viewport">
              <div className="academics-support-programs__track" style={trackStyle}>
                {cards.map((card, index) => {
                  const FallbackIcon = card.iconType ? fallbackIconMap[card.iconType] : Accessibility;

                  return (
                    <HoverIconCard
                      key={card._key || `${card.title}-${index}`}
                      className="academics-support-programs__card"
                      icon={card.icon}
                      fallbackIcon={FallbackIcon}
                      title={card.title}
                      description={card.description}
                      iconSizes="96px"
                    />
                  );
                })}
              </div>
            </div>

            {dots.length > 1 ? (
              <div className="academics-support-programs__dots" aria-label="Support programs slider controls">
                {dots.map((startIndex) => (
                  <button
                    key={startIndex}
                    type="button"
                    className={`academics-support-programs__dot ${safeActiveStart === startIndex ? "is-active" : ""}`.trim()}
                    aria-label={`Show support programs ${startIndex + 1}`}
                    aria-pressed={safeActiveStart === startIndex}
                    onClick={() => setActiveStart(startIndex)}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </Reveal>
    </section>
  );
}
