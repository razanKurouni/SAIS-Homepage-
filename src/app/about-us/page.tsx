import Image from "next/image";
import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { RichText } from "@/components/ui/rich-text";
import { getHomepage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About Us | SAIS Dubai",
  description: "Learn more about Sharjah American International School Dubai.",
};

export const revalidate = 300;

const aboutFallback =
  "Sharjah American International School Dubai is a distinguished member of the SAIS group of schools, delivering an American curriculum within a supportive learning environment that honors Islamic values, local traditions, and global citizenship.";

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
  const title = data?.intro?.heading?.title || "Building Bright Futures with Purpose and Principle";
  const image = data?.intro?.image;

  return (
    <SitePageShell data={data} mainClassName="site-page__main about-page__main" pageClassName="about-page">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__inner">
          <div className="about-hero__copy">
            <p className="about-hero__eyebrow">About Us</p>
            <h1 id="about-hero-title" className="about-hero__title">
              {title}
            </h1>
            <RichText
              blocks={data?.intro?.heading?.description}
              fallback={aboutFallback}
              className="about-hero__description"
            />
          </div>

          <div className="about-hero__media">
            <Image
              src={image?.url || "/sais-building-futures.png"}
              alt={image?.alt || "SAIS Dubai students learning together"}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 42vw"
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
