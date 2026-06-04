import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getContactPage, getHomepage } from "@/lib/sanity";

const fallbackMetadata: Metadata = {
  title: "Contact Us | SAIS Dubai",
  description: "Contact Sharjah American International School Dubai.",
};

const fallbackHero = {
  title: "Contact Sharjah American International School, Dubai",
  image: {
    url: "/about-hero-building.jpg",
    alt: "Sharjah American International School Dubai campus building",
  },
  imageWidth: "60%",
};

const contactInnerNavItems = [
  { label: "Latest News", href: "/#latest-news" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
];

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

      <InnerPageNav
        items={contactInnerNavItems}
        activeHref="/contact-us"
        activeColor="var(--sais-accent)"
        inactiveColor="#707174"
        textColor="#ffffff"
        dividerColor="#ffffff"
        topLineColor="var(--sais-accent)"
        ariaLabel="Contact page navigation"
      />
    </SitePageShell>
  );
}
