import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { RichText } from "@/components/ui/rich-text";
import type { CareersJoinTeamSection as CareersJoinTeamSectionData } from "@/types/sanity";

type CareersJoinTeamSectionProps = {
  section?: CareersJoinTeamSectionData;
  fallbackSection: CareersJoinTeamSectionData;
};

export function CareersJoinTeamSection({
  section,
  fallbackSection,
}: CareersJoinTeamSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const cards = section?.cards?.length ? section.cards : fallbackSection.cards || [];

  if (!heading?.title && !cards.length) {
    return null;
  }

  return (
    <section className="careers-join-team" aria-labelledby="careers-join-team-title">
      <div className="careers-join-team__inner">
        <div className="careers-join-team__header">
          {heading?.title ? (
            <h2 id="careers-join-team-title" className="careers-join-team__title">
              {heading.title}
            </h2>
          ) : null}
          <RichText blocks={heading?.description} className="careers-join-team__body" />
        </div>

        {cards.length ? (
          <div className="careers-join-team__cards">
            {cards.map((card, index) => (
              <HoverIconCard
                key={card._key || `${card.label}-${index}`}
                href={card.href}
                icon={card.icon}
                title={card.label}
                description={card.text}
                className="careers-join-team__card"
                iconSizes="96px"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
