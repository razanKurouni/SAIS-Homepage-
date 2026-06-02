import { homepage } from "./homepage";
import { siteFooter } from "./siteFooter";
import { siteHeader } from "./siteHeader";
import { blockContent } from "./objects/blockContent";
import { cta } from "./objects/cta";
import { featureCard, imageTextSection, metricItem, whyDubaiItem } from "./objects/homepageObjects";
import { imageWithAlt } from "./objects/imageWithAlt";
import { linkField } from "./objects/linkField";
import { sectionHeading } from "./objects/sectionHeading";
import { seo } from "./objects/seo";

export const schemaTypes = [
  blockContent,
  imageWithAlt,
  linkField,
  cta,
  sectionHeading,
  seo,
  metricItem,
  featureCard,
  imageTextSection,
  whyDubaiItem,
  siteHeader,
  siteFooter,
  homepage,
];
