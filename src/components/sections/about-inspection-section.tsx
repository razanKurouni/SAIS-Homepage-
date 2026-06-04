import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import type { ImageTextSection } from "@/types/sanity";

type AboutInspectionSectionProps = {
  section?: ImageTextSection;
};

const fallbackParagraphs = [
  "As part of Dubai's educational regulatory framework, all private schools undergo an annual review and inspection process directed by the Dubai Schools Inspection Bureau (DSIB), a division of the Knowledge and Human Development Authority (KHDA). Our school engages in comprehensive self-assessment of student learning outcomes and other relevant metrics to inform our continuous improvement planning prior to the external DSIB review. The insights gained through internal evaluation, combined with the DSIB report and recommendations, form the foundation of our improvement cycle: reflection, planning, action, and monitoring - all directed toward achieving educational excellence.",
];

const fallbackImage = {
  url: "/about-inspection-review.jpg",
  alt: "SAIS Dubai teacher reading with students in the library",
};

export function AboutInspectionSection({ section }: AboutInspectionSectionProps) {
  return (
    <EditorialSplitSection
      id="about-inspection"
      title="Dubai Schools Inspection Bureau Review"
      section={section}
      fallbackImage={fallbackImage}
      fallbackParagraphs={fallbackParagraphs}
      className="editorial-split-section--inspection"
    />
  );
}
