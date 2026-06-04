import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { PageHero } from "@/components/sections/page-hero";
import { getContactPage, getHomepage } from "@/lib/sanity";

const fallbackMetadata: Metadata = {
  title: "Contact Us | SAIS Dubai",
  description: "Contact Sharjah American International School Dubai.",
};

const fallbackHero = {
  eyebrow: "Contact Us",
  title: "Contact Sharjah American International School, Dubai",
  image: {
    url: "/about-hero-building.jpg",
    alt: "Sharjah American International School Dubai campus building",
  },
  imageWidth: "60%",
};

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPage();

  return {
    title: contactPage?.seo?.title || fallbackMetadata.title,
    description: contactPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const [data, contactPage] = await Promise.all([getHomepage(), getContactPage()]);
  const contactHero = contactPage?.hero;
  const heroEyebrow = contactHero?.heading?.eyebrow || fallbackHero.eyebrow;
  const heroTitle = contactHero?.heading?.title || fallbackHero.title;
  const heroImage = contactHero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main contact-page__main"
      pageClassName="contact-page"
    >
      <PageHero
        className="contact-hero"
        title={heroTitle}
        eyebrow={heroEyebrow}
        image={heroImage}
        titleId="contact-hero-title"
        priority
        topLineColor={contactHero?.topLineColor}
        panelColor={contactHero?.panelColor}
        waveColor={contactHero?.waveColor}
        textColor={contactHero?.textColor}
        imagePosition={contactHero?.imagePosition}
        imageWidth={contactHero?.imageWidth || fallbackHero.imageWidth}
      />
    </SitePageShell>
  );
}
