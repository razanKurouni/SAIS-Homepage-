import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { PageHero } from "@/components/sections/page-hero";
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
      <PageHero
        className="about-hero"
        title={heroTitle}
        eyebrow={heroEyebrow}
        image={heroImage}
        titleId="about-hero-title"
        priority
        topLineColor={aboutHero?.topLineColor}
        panelColor={aboutHero?.panelColor}
        waveColor={aboutHero?.waveColor}
        textColor={aboutHero?.textColor}
        imagePosition={aboutHero?.imagePosition}
      />

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
