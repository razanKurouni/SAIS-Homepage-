import Image from "next/image";
import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { getHomepage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About Us | SAIS Dubai",
  description: "Learn more about Sharjah American International School Dubai.",
};

export const revalidate = 300;

const fallbackHero = {
  eyebrow: "About Us",
  title: "About Sharjah American International School, Dubai",
  image: {
    url: "/about-hero-building.jpg",
    alt: "Sharjah American International School Dubai campus building",
  },
};

const highlights = [
  {
    label: "American Curriculum",
    text: "A rigorous learning pathway designed to help students grow academically, socially, and personally.",
  },
  {
    label: "Islamic Values",
    text: "A school culture rooted in respect, tradition, care, and responsible citizenship.",
  },
  {
    label: "Dubai Campus",
    text: "A welcoming community for students and families across every stage of school life.",
  },
];

export default async function AboutUsPage() {
  const data = await getHomepage();
  const aboutHero = data?.aboutPage?.hero;
  const heroEyebrow = aboutHero?.heading?.eyebrow || fallbackHero.eyebrow;
  const heroTitle = aboutHero?.heading?.title || fallbackHero.title;
  const heroImage = aboutHero?.image || fallbackHero.image;

  return (
    <SitePageShell data={data} mainClassName="site-page__main about-page__main" pageClassName="about-page">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__inner">
          <div className="about-hero__copy">
            <p className="about-hero__eyebrow">{heroEyebrow}</p>
            <h1 id="about-hero-title" className="about-hero__title">
              {heroTitle}
            </h1>
          </div>

          <svg className="about-hero__curve-mask" viewBox="0 0 120 520" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 -40 H70 C20 70 20 150 56 250 C92 350 88 438 44 560 H0 Z" />
          </svg>
          <svg className="about-hero__wave" viewBox="0 0 120 520" preserveAspectRatio="none" aria-hidden="true">
            <path d="M70 -26 C20 70 20 150 56 250 C92 350 88 438 44 546" />
          </svg>

          <div className="about-hero__media">
            <Image
              src={heroImage?.url || fallbackHero.image.url}
              alt={heroImage?.alt || fallbackHero.image.alt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 62vw"
              className="about-hero__image"
            />
          </div>
        </div>
      </section>

      <section className="about-highlights" aria-label="SAIS Dubai highlights">
        <div className="about-highlights__inner">
          {highlights.map((item) => (
            <article key={item.label} className="about-highlight-card">
              <h2>{item.label}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </SitePageShell>
  );
}
