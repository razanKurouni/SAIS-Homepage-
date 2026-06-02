"use client";

import { memo } from "react";
import { Instagram } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CmsImage } from "@/components/ui/cms-image";
import { FacebookBrandIcon, TwitterBrandIcon } from "@/components/ui/social-icons";
import type { HomepageData } from "@/types/sanity";

type SocialSectionProps = {
  section?: HomepageData["instagram"];
};

const icons = [Instagram, FacebookBrandIcon, TwitterBrandIcon];

export const SocialSection = memo(function SocialSection({ section }: SocialSectionProps) {
  const prefersReducedMotion = useReducedMotion();

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
              <motion.a
                key={index}
                href={section.socialLinks?.[index]?.href || "#"}
                target={section.socialLinks?.[index]?.openInNewTab ? "_blank" : undefined}
                rel={section.socialLinks?.[index]?.openInNewTab ? "noreferrer" : undefined}
                aria-label={section.socialLinks?.[index]?.label || "Social link"}
                className="social-feed__link"
                whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.06 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <Icon aria-hidden="true" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="social-feed__grid">
          {(section.images || []).slice(0, 4).map((image, index) => (
            <motion.div
              key={`${image.url || "social"}-${index}`}
              className="social-feed__item"
              initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.72,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <CmsImage
                image={image}
                fallbackLabel={`Social image ${index + 1}`}
                className="social-feed__image-wrap"
                imageClassName="social-feed__image"
                sizes="(max-width: 767px) 88vw, (max-width: 1024px) 42vw, 270px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
