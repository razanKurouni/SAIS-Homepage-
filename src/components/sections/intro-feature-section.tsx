"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { RichText } from "@/components/ui/rich-text";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";
import type { HomepageData, PortableTextBlock } from "@/types/sanity";

type IntroFeatureSectionProps = {
  section?: HomepageData["intro"];
};

const fallbackDescription: PortableTextBlock[] = [
  {
    _key: "intro-feature-paragraph-1",
    _type: "block",
    children: [
      {
        _key: "intro-feature-span-1",
        _type: "span",
        text:
          "Sharjah American International School (SAIS) - Dubai is a distinguished member of the SAIS group of schools founded and led by Dr. Aysha Sayyar and Dr. Nawaf Fawaz. The SAIS educational network spans four Emirates across the UAE: Sharjah, Dubai, Umm Al-Quwain, and Abu Dhabi.",
      },
    ],
  },
  {
    _key: "intro-feature-paragraph-2",
    _type: "block",
    children: [
      {
        _key: "intro-feature-span-2",
        _type: "span",
        text:
          "At SAIS Dubai, we deliver a rigorous American curriculum within a framework that honors traditional Islamic values and cultural heritage. Our fundamental belief is that students achieve their highest potential in a supportive, nurturing environment that respects and integrates local traditions.",
      },
    ],
  },
];

const fallbackSection: NonNullable<HomepageData["intro"]> = {
  heading: {
    title: "Building Bright Futures with Purpose and Principle",
    description: fallbackDescription,
  },
  image: {
    url: "/sais-building-futures.png",
    alt: "SAIS Dubai students during a science lab activity",
  },
  imagePosition: "left",
  theme: "blue",
  ctas: [],
};

export function IntroFeatureSection({ section }: IntroFeatureSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const title = section?.heading?.title || fallbackSection.heading.title;
  const description = section?.heading?.description?.length
    ? section.heading.description
    : fallbackSection.heading.description;
  const imageUrl = section?.image?.url || fallbackSection.image?.url;
  const imageAlt = section?.image?.alt || fallbackSection.image?.alt || title;

  return (
    <section className="intro-feature" aria-labelledby="intro-feature-title">
      <motion.div
        className="intro-feature__layout"
        initial={prefersReducedMotion ? false : { y: 28, opacity: 0 }}
        whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.86, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="intro-feature__media"
          initial={prefersReducedMotion ? false : { x: -28, opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.84, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="intro-feature__image-shell">
            <Image
              src={imageUrl || fallbackSection.image?.url || "/sais-building-futures.png"}
              alt={imageAlt}
              fill
              priority={false}
              sizes="(max-width: 767px) 100vw, 44vw"
              className="intro-feature__image"
            />
          </div>
        </motion.div>

        <SaisCurvedPanel
          className="intro-feature__shape"
          contentClassName="intro-feature__shape-content"
          fillColor="var(--sais-primary)"
          accentColor="var(--sais-accent)"
          strokeWidth={88}
          flipped
        >
          <div className="intro-feature__content">
            <motion.h2
              id="intro-feature-title"
              className="intro-feature__title"
              initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            >
              {title}
            </motion.h2>
            <RichText blocks={description} className="intro-feature__description" />
          </div>
          <div className="intro-feature__mobile-divider" aria-hidden="true">
            <svg className="intro-feature__curve-mask" viewBox="0 0 96 320" preserveAspectRatio="none">
              <path d="M0 -32 H52 C16 42 16 92 42 154 C70 220 70 274 38 352 H0 Z" />
            </svg>
            <svg className="intro-feature__wave" viewBox="0 0 96 320" preserveAspectRatio="none">
              <path d="M52 -24 C16 42 16 92 42 154 C70 220 70 274 38 344" />
            </svg>
          </div>
        </SaisCurvedPanel>
      </motion.div>
    </section>
  );
}
