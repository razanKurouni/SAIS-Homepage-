import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { PageHero } from "@/components/sections/page-hero";
import { getAcademicsHighSchoolPage, getHomepage } from "@/lib/sanity";
import type { InnerNavigationItem } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "High School | Academics | SAIS Dubai",
  description: "Explore High School academics at Sharjah American International School Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const highSchoolPage = await getAcademicsHighSchoolPage();

  return {
    title: highSchoolPage?.seo?.title || fallbackMetadata.title,
    description: highSchoolPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

const fallbackInnerNavigation = {
  items: [
    { label: "Overview", href: "/academics" },
    { label: "Kindergarten", href: "/academics/kindergarten" },
    { label: "Elementary", href: "/academics/elementary" },
    { label: "Middle School", href: "/academics/middle-school" },
    { label: "High School", href: "/academics/high-school" },
  ],
  activeHref: "/academics/high-school",
  activeColor: "#4a5568",
  inactiveColor: "var(--sais-primary)",
  textColor: "#ffffff",
  dividerColor: "#ffffff",
  topLineColor: "#ffffff",
  ariaLabel: "Academics page navigation",
} satisfies {
  items: InnerPageNavItem[];
  activeHref: string;
  activeColor: string;
  inactiveColor: string;
  textColor: string;
  dividerColor: string;
  topLineColor: string;
  ariaLabel: string;
};

const fallbackHero = {
  eyebrow: "Academics",
  title: "High School",
  image: {
    url: "/academics-high-school-hero.jpg",
    alt: "SAIS Dubai high school students in a science lab",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "#4a5568",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

function resolveInnerNavItems(items?: InnerNavigationItem[]): InnerPageNavItem[] {
  return (
    items?.flatMap((item) => {
      if (!item.label || !item.href) return [];
      return [{ label: item.label, href: item.href, openInNewTab: item.openInNewTab }];
    }) || []
  );
}

export default async function AcademicsHighSchoolPage() {
  const [data, highSchoolPage] = await Promise.all([getHomepage(), getAcademicsHighSchoolPage()]);

  const hero = highSchoolPage?.hero;
  const innerNavigation = highSchoolPage?.innerNavigation;
  const innerNavItems = resolveInnerNavItems(innerNavigation?.items);

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-high-school-page__main"
      pageClassName="academics-high-school-page"
    >
      <PageHero
        className="academics-high-school-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        eyebrow={hero?.heading?.eyebrow || fallbackHero.eyebrow}
        titleId="academics-high-school-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        items={innerNavItems.length ? innerNavItems : fallbackInnerNavigation.items}
        activeHref={innerNavigation?.activeHref || fallbackInnerNavigation.activeHref}
        activeColor={innerNavigation?.activeColor || fallbackInnerNavigation.activeColor}
        inactiveColor={innerNavigation?.inactiveColor || fallbackInnerNavigation.inactiveColor}
        textColor={innerNavigation?.textColor || fallbackInnerNavigation.textColor}
        dividerColor={innerNavigation?.dividerColor || fallbackInnerNavigation.dividerColor}
        topLineColor={innerNavigation?.topLineColor || fallbackInnerNavigation.topLineColor}
        className="academics-inner-nav"
        ariaLabel={innerNavigation?.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <LearningPhasesSection section={data?.learningPhases} excludeTitle="High School" />
    </SitePageShell>
  );
}
