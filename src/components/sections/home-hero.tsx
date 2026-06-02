import Image from "next/image";
import type { HomepageData } from "@/types/sanity";
import { richTextToPlainText } from "@/lib/content";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";
import { HomeHeroMotionPanel } from "@/components/sections/home-hero-motion-panel";

type HomeHeroProps = {
  hero?: HomepageData["hero"];
};

const fallbackHero = {
  heading: "Empowering Students to Achieve Their Highest Potential",
  description:
    "Through a rigorous American curriculum grounded in Islamic values and cultural heritage.",
  image: {
    url: "/sais-hero-students.jpg",
    alt: "SAIS Dubai students gathered on campus",
  },
};

export function HomeHero({ hero }: HomeHeroProps) {
  const heading = hero?.heading || fallbackHero.heading;
  const description =
    richTextToPlainText(hero?.description) ||
    hero?.subtitle ||
    fallbackHero.description;
  const imageUrl = hero?.image?.url || fallbackHero.image.url;
  const imageAlt = hero?.image?.alt || fallbackHero.image.alt;

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        quality={82}
        sizes="100vw"
        className="home-hero__image"
      />
      <div className="home-hero__shade" />

      <div className="home-hero__content">
        <HomeHeroMotionPanel>
          <SaisCurvedPanel
            className="home-hero__copy"
            fillColor="rgba(var(--sais-primary-rgb), 0.72)"
            accentColor="var(--sais-accent)"
            strokeWidth={88}
          >
            <h1 id="home-hero-title" className="home-hero__title">
              {heading}
            </h1>
            <p className="home-hero__description">{description}</p>
          </SaisCurvedPanel>
        </HomeHeroMotionPanel>
      </div>
    </section>
  );
}
