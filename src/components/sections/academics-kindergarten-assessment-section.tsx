import type { CSSProperties } from "react";
import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { AcademicsKindergartenAssessmentSection as AssessmentSection } from "@/types/sanity";

type AcademicsKindergartenAssessmentSectionProps = {
  section?: AssessmentSection;
  fallbackSection: AssessmentSection;
};

type AssessmentStyle = CSSProperties & {
  "--academics-kg-assessment-bg"?: string;
  "--academics-kg-assessment-title"?: string;
  "--academics-kg-assessment-text"?: string;
  "--academics-kg-assessment-card-text"?: string;
  "--academics-kg-assessment-card-border"?: string;
  "--academics-kg-assessment-card-hover-border"?: string;
};

export function AcademicsKindergartenAssessmentSection({
  section,
  fallbackSection,
}: AcademicsKindergartenAssessmentSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const cards = section?.cards?.length ? section.cards : fallbackSection.cards || [];

  if (!heading?.title && !cards.length) {
    return null;
  }

  const style: AssessmentStyle = {
    "--academics-kg-assessment-bg": section?.backgroundColor || fallbackSection.backgroundColor,
    "--academics-kg-assessment-title": section?.titleColor || fallbackSection.titleColor,
    "--academics-kg-assessment-text": section?.textColor || fallbackSection.textColor,
    "--academics-kg-assessment-card-text": section?.cardTextColor || fallbackSection.cardTextColor,
    "--academics-kg-assessment-card-border": section?.cardBorderColor || fallbackSection.cardBorderColor,
    "--academics-kg-assessment-card-hover-border":
      section?.cardHoverBorderColor || fallbackSection.cardHoverBorderColor,
  };

  return (
    <section
      className="academics-kg-assessment"
      aria-labelledby="academics-kg-assessment-title"
      style={style}
    >
      <SectionReveal className="academics-kg-assessment__inner">
        {heading?.title ? (
          <h2 id="academics-kg-assessment-title" className="academics-kg-assessment__title">
            {heading.title}
          </h2>
        ) : null}

        <RichText blocks={heading?.description} className="academics-kg-assessment__intro" />

        {cards.length ? (
          <div className="academics-kg-assessment__cards">
            {cards.map((card, index) => (
              <Reveal
                key={card._key || `${card.title}-${index}`}
                className="academics-kg-assessment__card-reveal"
                delay={120 + index * 110}
              >
                <HoverIconCard
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  className="academics-kg-assessment__card"
                  iconSizes="132px"
                />
              </Reveal>
            ))}
          </div>
        ) : null}
      </SectionReveal>
    </section>
  );
}
