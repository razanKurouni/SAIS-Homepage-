import Image from "next/image";
import Link from "next/link";
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
            {cards.map((card, index) => {
              const content = (
                <>
                  {card.icon?.url ? (
                    <span className="careers-join-team__icon">
                      <Image
                        src={card.icon.url}
                        alt={card.icon.alt || ""}
                        fill
                        sizes="96px"
                        className="careers-join-team__icon-image"
                      />
                    </span>
                  ) : null}
                  {card.label ? <span className="careers-join-team__card-label">{card.label}</span> : null}
                  {card.text ? <span className="careers-join-team__card-text">{card.text}</span> : null}
                </>
              );

              if (card.href) {
                const isExternal = card.href.startsWith("http");
                return (
                  <Link
                    href={card.href}
                    className="careers-join-team__card"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    key={card._key || `${card.label}-${index}`}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <article className="careers-join-team__card" key={card._key || `${card.label}-${index}`}>
                  {content}
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
