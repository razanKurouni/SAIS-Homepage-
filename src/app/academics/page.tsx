import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getAcademicsPage, getHomepage } from "@/lib/sanity";

const fallbackMetadata: Metadata = {
  title: "Academics | SAIS Dubai",
  description: "Explore academics at Sharjah American International School Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const academicsPage = await getAcademicsPage();

  return {
    title: academicsPage?.seo?.title || fallbackMetadata.title,
    description: academicsPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

const fallbackHero = {
  title: "Academics\nat SAIS Dubai",
  image: {
    url: "/academics-hero.jpg",
    alt: "SAIS Dubai students working in a science lab",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "#707174",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

const academicsInnerNavItems = [
  { label: "Overview", href: "/academics" },
  { label: "Kindergarten", href: "/academics/kindergarten" },
  { label: "Elementary", href: "/academics/elementary" },
  { label: "Middle School", href: "/academics/middle-school" },
  { label: "High School", href: "/academics/high-school" },
];

export default async function AcademicsPage() {
  const [data, academicsPage] = await Promise.all([getHomepage(), getAcademicsPage()]);
  const academicsHero = academicsPage?.hero;
  const heroTitle = academicsHero?.heading?.title || fallbackHero.title;
  const heroImage = academicsHero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-page__main"
      pageClassName="academics-page"
    >
      <PageHero
        className="academics-hero"
        title={heroTitle}
        image={heroImage}
        eyebrow={academicsHero?.heading?.eyebrow}
        titleId="academics-hero-title"
        priority
        topLineColor={academicsHero?.topLineColor || fallbackHero.topLineColor}
        panelColor={academicsHero?.panelColor || fallbackHero.panelColor}
        waveColor={academicsHero?.waveColor || fallbackHero.waveColor}
        textColor={academicsHero?.textColor || fallbackHero.textColor}
        imagePosition={academicsHero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={academicsHero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        items={academicsInnerNavItems}
        activeHref="/academics"
        activeColor="var(--sais-primary)"
        inactiveColor="var(--sais-primary)"
        textColor="#ffffff"
        dividerColor="#ffffff"
        topLineColor="#ffffff"
        className="academics-inner-nav"
        ariaLabel="Academics page navigation"
      />
    </SitePageShell>
  );
}
