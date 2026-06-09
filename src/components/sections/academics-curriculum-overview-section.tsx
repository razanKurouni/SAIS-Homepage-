import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import type { AcademicsCurriculumOverviewSection as AcademicsCurriculumOverviewSectionData, ImageTextSection } from "@/types/sanity";

type AcademicsCurriculumOverviewSectionProps = {
  section?: AcademicsCurriculumOverviewSectionData;
  fallbackSection: Required<AcademicsCurriculumOverviewSectionData>;
};

export function AcademicsCurriculumOverviewSection({
  section,
  fallbackSection,
}: AcademicsCurriculumOverviewSectionProps) {
  const firstBlock: ImageTextSection = section?.firstBlock || fallbackSection.firstBlock;
  const secondBlock: ImageTextSection = section?.secondBlock || fallbackSection.secondBlock;

  return (
    <div className="academics-curriculum-overview">
      <EditorialSplitSection
        id="academics-curriculum-overview"
        title="Our Curriculum"
        section={{ ...firstBlock, imagePosition: "right" }}
        fallbackImage={fallbackSection.firstBlock.image || {}}
        fallbackParagraphs={[]}
        className="academics-curriculum-overview__row academics-curriculum-overview__row--top"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 38vw"
        showTitle
      />

      <EditorialSplitSection
        id="academics-curriculum-continuum"
        title="Curriculum at SAIS-Dubai"
        section={{ ...secondBlock, imagePosition: "left" }}
        fallbackImage={fallbackSection.secondBlock.image || {}}
        fallbackParagraphs={[]}
        className="academics-curriculum-overview__row academics-curriculum-overview__row--bottom"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 38vw"
      />
    </div>
  );
}
