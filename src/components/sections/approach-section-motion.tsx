import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
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
        <Reveal
          className="approach-section__image-wrap"
          threshold={0.18}
        >
          <Image
            src={image.url}
            alt={image.alt || title}
            fill
            sizes="100vw"
            quality={82}
            className="approach-section__image"
          />
        </Reveal>
      )}

      <Reveal
        className="approach-section__panel"
        threshold={0.18}
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
            <p className="approach-section__lead">
              {lead}
            </p>
          )}

          <div className="approach-section__paragraphs">
            {paragraphs.map((paragraph, index) => (
              <Reveal
                as="p"
                className="approach-section__paragraph"
                key={paragraph}
                delay={160 + index * 70}
                threshold={0.22}
              >
                {paragraph}
              </Reveal>
            ))}
          </div>

          {cta && (
            <Reveal delay={320} threshold={0.22}>
              <Link
                href={cta.href || "#"}
                target={cta.openInNewTab ? "_blank" : undefined}
                rel={cta.openInNewTab ? "noreferrer" : undefined}
                className="approach-section__button"
              >
                <span>{cta.label}</span>
                <ArrowBadge />
              </Link>
            </Reveal>
          )}
        </div>
      </Reveal>
    </section>
  );
}
