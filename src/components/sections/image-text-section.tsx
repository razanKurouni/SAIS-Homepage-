import { CmsImage } from "@/components/ui/cms-image";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { WavePanel } from "@/components/ui/wave-panel";
import type { ImageTextSection as ImageTextSectionData } from "@/types/sanity";

type ImageTextSectionProps = {
  section?: ImageTextSectionData;
  id?: string;
};

export function ImageTextSection({ section, id }: ImageTextSectionProps) {
  if (!section) {
    return null;
  }

  const imageFirst = section.imagePosition !== "right";

  return (
    <WavePanel id={id} tone={section.theme || "blue"} className="px-5 py-5 md:px-8 md:py-8">
      <div className="grid gap-7 md:grid-cols-2 md:items-center">
        {imageFirst && (
          <CmsImage
            image={section.image}
            fallbackLabel={section.heading.title}
            className="aspect-[5/4] rounded-lg"
          />
        )}
        <div className={section.theme === "light" ? "" : "text-white"}>
          <SectionHeading
            heading={section.heading}
            eyebrowClassName={section.theme === "light" ? "text-[color:var(--sais-accent)]" : "text-white/70"}
            titleClassName={section.theme === "light" ? "text-[color:var(--sais-primary)]" : "text-white"}
            descriptionClassName={section.theme === "light" ? "text-[#557189]" : "text-white/90"}
          />
          {section.ctas && section.ctas.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {section.ctas.map((cta) => (
                <CtaLink key={`${cta.label}-${cta.href}`} cta={cta} />
              ))}
            </div>
          )}
        </div>
        {!imageFirst && (
          <CmsImage
            image={section.image}
            fallbackLabel={section.heading.title}
            className="aspect-[5/4] rounded-lg"
          />
        )}
      </div>
    </WavePanel>
  );
}
