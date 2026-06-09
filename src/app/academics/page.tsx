import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsCurriculumOverviewSection } from "@/components/sections/academics-curriculum-overview-section";
import { AcademicsSkillsSection } from "@/components/sections/academics-skills-section";
import { AcademicsTeachingCommitmentsSection } from "@/components/sections/academics-teaching-commitments-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getAcademicsPage, getHomepage } from "@/lib/sanity";
import type {
  AcademicsCurriculumOverviewSection as AcademicsCurriculumOverviewSectionData,
  AcademicsSkillsSection as AcademicsSkillsSectionData,
  AcademicsTeachingCommitmentsSection as AcademicsTeachingCommitmentsSectionData,
  ContactInfoSection as ContactInfoSectionData,
  PortableTextBlock,
} from "@/types/sanity";

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

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const fallbackCurriculumSection: ContactInfoSectionData = {
  heading: {
    title: "Our Curriculum\nPhilosophy and Vision",
    description: [
      paragraph(
        "curriculum-overview",
        "At SAIS-Dubai, our curriculum is driven by a commitment to academic excellence, holistic development, and global readiness. Grounded in internationally recognized American standards - including AERO Common Core and the Next Generation Science Standards - our curriculum ensures that students acquire the knowledge, skills, and dispositions necessary for lifelong learning and success in a rapidly evolving world."
      ),
      paragraph(
        "curriculum-vision",
        "We envision a dynamic, standards-based curriculum that is coherent, vertically and horizontally aligned, and responsive to the diverse needs of our multicultural student body."
      ),
    ],
  },
  image: {
    url: "/academics-curriculum.png",
    alt: "SAIS Dubai students learning with a microscope",
  },
  imagePosition: "center",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  items: [],
};

const fallbackSkillsSection: AcademicsSkillsSectionData = {
  heading: {
    title: "Skills and Dispositions",
    description: [
      paragraph(
        "skills-intro",
        "Through purposeful design rooted in intentional planning using the Backward Design Model, we ensure that every unit of study is capstoned with a summative performance task, where students are expected to apply and demonstrate their learning through four Key Skills and four dispositions."
      ),
    ],
  },
  groups: [
    {
      _key: "key-skills",
      title: "Key Skills",
      items: [
        {
          _key: "critical-thinking",
          title: "Critical and\nCreative Thinking",
          icon: { url: "/academics-icon-critical-thinking.png", alt: "" },
          iconType: "critical",
          theme: "teal",
        },
        {
          _key: "communication",
          title: "Communication and Collaboration",
          icon: { url: "/academics-icon-communication.png", alt: "" },
          iconType: "communication",
          theme: "teal",
        },
        {
          _key: "organization",
          title: "Organization and\nSelf-Management",
          icon: { url: "/academics-icon-organization.png", alt: "" },
          iconType: "organization",
          theme: "teal",
        },
        {
          _key: "research",
          title: "Research and\nProblem-Solving",
          icon: { url: "/academics-icon-research.png", alt: "" },
          iconType: "research",
          theme: "teal",
        },
      ],
    },
    {
      _key: "dispositions",
      title: "Dispositions",
      items: [
        {
          _key: "resilience",
          title: "Resilience\nand Adaptability",
          icon: { url: "/academics-icon-resilience.png", alt: "" },
          iconType: "resilience",
          theme: "orange",
        },
        {
          _key: "empathy",
          title: "Empathy",
          icon: { url: "/academics-icon-empathy.png", alt: "" },
          iconType: "empathy",
          theme: "orange",
        },
        {
          _key: "curiosity",
          title: "Curiosity",
          icon: { url: "/academics-icon-curiosity.png", alt: "" },
          iconType: "curiosity",
          theme: "orange",
        },
        {
          _key: "growth",
          title: "Growth Mindset",
          icon: { url: "/academics-icon-growth-mindset.png", alt: "" },
          iconType: "growth",
          theme: "orange",
        },
      ],
    },
  ],
};

const fallbackCurriculumOverviewSection: Required<AcademicsCurriculumOverviewSectionData> = {
  firstBlock: {
    heading: {
      title: "Our Curriculum",
      description: [
        paragraph(
          "overview-curriculum-1",
          "Our Curriculum is designed to ensure students' experience is active and skills-focused, rigorous, and aligned with clearly defined outcomes. Our approach integrates 21st-century competencies, active and interactive learning, and real-world applications, encouraging students to become critical thinkers, creative problem-solvers, effective communicators, and compassionate global citizens."
        ),
        paragraph(
          "overview-curriculum-2",
          "With robust student support systems, differentiated instruction, and meaningful and varied assessment practices, we aim to meet each learner where they are while guiding them to where they need to be."
        ),
      ],
    },
    image: {
      url: "/academics-hero.jpg",
      alt: "SAIS Dubai students working on a STEM project",
    },
    imagePosition: "right",
  },
  secondBlock: {
    heading: {
      title: "Curriculum at SAIS-Dubai",
      description: [
        paragraph(
          "overview-curriculum-3",
          "Curriculum at SAIS-Dubai is not static - it is continuously reviewed and improved through collaborative, data-informed processes that ensure relevance, coherence, and excellence across all grade levels and disciplines. We believe that curriculum, instruction, and assessment are interdependent elements of an integrated learning ecosystem, and our educators are empowered to innovate, adapt, and lead meaningful change."
        ),
        paragraph(
          "overview-curriculum-4",
          "Ultimately, our vision is to provide a transformative education that inspires students to achieve their personal best, contribute positively to their communities, and succeed in a global society."
        ),
      ],
    },
    image: {
      url: "/academics-curriculum.png",
      alt: "SAIS Dubai students learning together",
    },
    imagePosition: "left",
  },
};

const fallbackTeachingCommitmentsSection: AcademicsTeachingCommitmentsSectionData = {
  heading: {
    title: "Our Teaching Commitments",
  },
  cards: [
    {
      _key: "high-expectations",
      title: "High Expectations",
      description: "Maintain high expectations for every student",
      iconType: "expectations",
    },
    {
      _key: "engagement",
      title: "Engagement",
      description: "Understand that meaningful learning occurs when students engage in critical thinking",
      iconType: "engagement",
    },
    {
      _key: "achievement",
      title: "Achievement",
      description: "Emphasize the importance of effort and persistence in achievement",
      iconType: "achievement",
    },
  ],
};

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
        activeColor="#00A5B2"
        inactiveColor="var(--sais-primary)"
        textColor="#ffffff"
        dividerColor="#ffffff"
        topLineColor="#ffffff"
        className="academics-inner-nav"
        ariaLabel="Academics page navigation"
      />

      <ContactInfoSection
        className="academics-curriculum-section"
        section={academicsPage?.curriculumSection}
        fallbackSection={fallbackCurriculumSection}
        titleId="academics-curriculum-title"
      />

      <AcademicsSkillsSection
        section={academicsPage?.skillsSection}
        fallbackSection={fallbackSkillsSection}
      />

      <AcademicsCurriculumOverviewSection
        section={academicsPage?.curriculumOverviewSection}
        fallbackSection={fallbackCurriculumOverviewSection}
      />

      <AcademicsTeachingCommitmentsSection
        section={academicsPage?.teachingCommitmentsSection}
        fallbackSection={fallbackTeachingCommitmentsSection}
      />
    </SitePageShell>
  );
}
