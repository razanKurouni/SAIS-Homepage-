import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getAcademicsHighSchoolPage, getHomepage } from "@/lib/sanity";
import type {
  AcademicsKindergartenFeatureSection,
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  ImageTextSection,
  InnerNavigationItem,
  PortableTextBlock,
} from "@/types/sanity";

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
  activeColor: "#00A5B2",
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
  panelColor: "var(--sais-gray)",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

function resolveInnerNavItems(items?: InnerNavigationItem[]): InnerPageNavItem[] {
  return (
    items?.flatMap((item) => {
      if (!item.label || !item.href) return [];
      return [{ label: item.label, href: item.href, openInNewTab: item.openInNewTab }];
    }) || []
  );
}

const fallbackOverviewSection: ImageTextSection = {
  heading: {
    title: "Freedom to Explore,\nGuidance to Grow",
    description: [
      paragraph(
        "hs-overview-1",
        "In Grades 9 through 12, students experience increased autonomy and agency in their learning journey."
      ),
      paragraph(
        "hs-overview-2",
        "At SAIS-Dubai, students have access to a wide range of choice and elective courses, allowing them to tailor their learning pathways to align with their interests, aspirations, and career goals. Pedagogical approaches in these grades are designed to respond to the diverse priorities and dynamics of student choice. Teachers employ a student-centered approach that encourages inquiry, critical thinking, and creativity, while also providing guidance and support to help students navigate their academic pursuits."
      ),
    ],
  },
  image: {
    url: "/academics-high-school-overview.jpg",
    alt: "SAIS Dubai high school students doing a science experiment",
  },
  imagePosition: "right",
  theme: "light",
  backgroundColor: "#ffffff",
  titleColor: "var(--sais-primary)",
  textColor: "#666b70",
};

const fallbackExcellenceSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "Building Confident,\nFuture-Ready Graduates",
    description: [
      paragraph(
        "hs-excellence",
        "Project-based learning, collaborative projects, and real-world applications of learning are emphasized, empowering students to take ownership of their education and become active participants in their learning process. Through a combination of personalized support, rigorous academic experiences, and opportunities for exploration and self-expression, students in Grades 9-12 develop the skills, knowledge, and dispositions needed to succeed in college, careers, and beyond."
      ),
    ],
  },
  image: {
    url: "/academics-high-school-excellence.jpg",
    alt: "SAIS Dubai high school student painting a model in class",
  },
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "var(--sais-accent)",
  waveColor: "var(--sais-primary)",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackCurriculumSection: ImageTextSection = {
  heading: {
    title: "The Curriculum",
    description: [
      paragraph(
        "hs-curriculum",
        "High School (Grades 9–12): The curriculum enables the students to pursue a personalized pathway. Advanced Placement (AP) courses, elective options, and career guidance prepare students for university and beyond. College and career readiness, entrepreneurship, interdisciplinary learning, and leadership programs define our high school model."
      ),
    ],
  },
  image: {
    url: "/academics-high-school-curriculum.jpg",
    alt: "SAIS Dubai high school students raising hands in class",
  },
  imagePosition: "right",
};

function toExcellenceSliderSection(
  section: AcademicsKindergartenFeatureSection | undefined,
  fallback: Required<AcademicsKindergartenFeatureSection>
): AcademicsLearningSliderSectionData {
  const heading = section?.heading || fallback.heading;
  const body = heading?.description
    ?.map((block) => block.children?.map((c) => c.text || "").join("") || "")
    .filter(Boolean)
    .join("\n\n") || "";

  return {
    slides: [
      {
        _key: "high-school-excellence",
        title: heading?.title,
        body,
        image: section?.image || fallback.image,
        backgroundColor: section?.panelColor || fallback.panelColor,
        sideColor: section?.backgroundColor || fallback.backgroundColor,
        ringColor: section?.waveColor || fallback.waveColor,
        titleColor: section?.titleColor || fallback.titleColor,
        textColor: section?.textColor || fallback.textColor,
        imagePosition: section?.imagePosition || fallback.imagePosition,
      },
    ],
  };
}

export default async function AcademicsHighSchoolPage() {
  const [data, highSchoolPage] = await Promise.all([getHomepage(), getAcademicsHighSchoolPage()]);

  const hero = highSchoolPage?.hero;
  const innerNavigation = highSchoolPage?.innerNavigation;
  const innerNavItems = resolveInnerNavItems(innerNavigation?.items);

  const overviewSection: ImageTextSection = {
    ...fallbackOverviewSection,
    ...highSchoolPage?.overviewSection,
    heading: highSchoolPage?.overviewSection?.heading || fallbackOverviewSection.heading,
    image: highSchoolPage?.overviewSection?.image || fallbackOverviewSection.image,
    imagePosition: "right",
  };

  const excellenceSection = highSchoolPage?.excellenceSection || fallbackExcellenceSection;
  const excellenceSliderSection = toExcellenceSliderSection(excellenceSection, fallbackExcellenceSection);

  const curriculumSection: ImageTextSection = {
    ...fallbackCurriculumSection,
    ...highSchoolPage?.curriculumSection,
    heading: highSchoolPage?.curriculumSection?.heading || fallbackCurriculumSection.heading,
    image: highSchoolPage?.curriculumSection?.image || fallbackCurriculumSection.image,
    imagePosition: "right",
  };

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

      <EditorialSplitSection
        id="academics-high-school-overview"
        title="Freedom to Explore, Guidance to Grow"
        section={overviewSection}
        fallbackImage={fallbackOverviewSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-overview-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        showTitle
      />

      <AcademicsLearningSliderSection
        className="academics-high-school-excellence-slider"
        section={excellenceSliderSection}
        fallbackSection={toExcellenceSliderSection(undefined, fallbackExcellenceSection)}
      />

      <EditorialSplitSection
        id="academics-high-school-curriculum"
        title="The Curriculum"
        section={{ ...curriculumSection, imagePosition: "right" }}
        fallbackImage={fallbackCurriculumSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-curriculum-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle
      />

      <LearningPhasesSection section={data?.learningPhases} excludeTitle="High School" />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
