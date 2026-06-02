import { Instagram } from "lucide-react";
import { CmsImage } from "@/components/ui/cms-image";
import { Reveal } from "@/components/ui/reveal";
import { FacebookBrandIcon, TwitterBrandIcon } from "@/components/ui/social-icons";
import type { HomepageData } from "@/types/sanity";

type SocialSectionProps = {
  section?: HomepageData["instagram"];
};

const icons = [Instagram, FacebookBrandIcon, TwitterBrandIcon];

export function SocialSection({ section }: SocialSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <section className="social-feed" aria-labelledby="social-feed-title">
      <div className="social-feed__inner">
        <div className="social-feed__top">
          <h2 id="social-feed-title" className="social-feed__title">
            {section.heading?.title || "Follow Us"}
          </h2>

          <div className="social-feed__links" aria-label="Social media links">
            {icons.map((Icon, index) => (
              <a
                key={index}
                href={section.socialLinks?.[index]?.href || "#"}
                target={section.socialLinks?.[index]?.openInNewTab ? "_blank" : undefined}
                rel={section.socialLinks?.[index]?.openInNewTab ? "noreferrer" : undefined}
                aria-label={section.socialLinks?.[index]?.label || "Social link"}
                className="social-feed__link"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="social-feed__grid">
          {(section.images || []).slice(0, 4).map((image, index) => (
            <Reveal
              key={`${image.url || "social"}-${index}`}
              className="social-feed__item"
              delay={index * 80}
              threshold={0.2}
            >
              <CmsImage
                image={image}
                fallbackLabel={`Social image ${index + 1}`}
                className="social-feed__image-wrap"
                imageClassName="social-feed__image"
                sizes="(max-width: 767px) 88vw, (max-width: 1024px) 42vw, 270px"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
