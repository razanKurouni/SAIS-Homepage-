import { WhyDubaiMotion } from "@/components/sections/why-dubai-motion";
import type { HomepageData } from "@/types/sanity";

type WhyDubaiSectionProps = {
  section?: HomepageData["whyDubai"];
};

export function WhyDubaiSection({ section }: WhyDubaiSectionProps) {
  if (!section?.items?.length) {
    return null;
  }

  return <WhyDubaiMotion section={section} />;
}
