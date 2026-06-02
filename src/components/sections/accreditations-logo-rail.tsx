"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { LogoItem } from "@/types/sanity";

type AccreditationsLogoRailProps = {
  logos?: LogoItem[];
};

export function AccreditationsLogoRail({ logos = [] }: AccreditationsLogoRailProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldSlide = logos.length > 0;
  const visibleLogos = shouldSlide ? [...logos, ...logos] : logos;

  if (logos.length === 0) {
    return null;
  }

  return (
    <div className={`accreditations-rail ${shouldSlide ? "is-slider" : ""}`}>
      <motion.div
        className="accreditations-rail__track"
        animate={
          shouldSlide && !prefersReducedMotion
            ? { x: ["0%", "-50%"] }
            : undefined
        }
        transition={
          shouldSlide && !prefersReducedMotion
            ? { duration: Math.max(16, logos.length * 3.6), ease: "linear", repeat: Infinity, repeatType: "loop" }
            : undefined
        }
      >
        {visibleLogos.map((logo, index) => (
          <motion.div
            className="accreditations-rail__item"
            key={`${logo.name}-${index}`}
            initial={prefersReducedMotion || shouldSlide ? false : { y: 18, opacity: 0, scale: 0.96 }}
            whileInView={prefersReducedMotion || shouldSlide ? undefined : { y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{
              duration: 0.58,
              delay: shouldSlide ? 0 : index * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {logo.image?.url ? (
              <Image
                src={logo.image.url}
                alt={logo.image.alt || logo.name}
                width={220}
                height={130}
                className="accreditations-rail__image"
                sizes="(max-width: 767px) 42vw, 180px"
              />
            ) : (
              <span className="accreditations-rail__fallback">{logo.name}</span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
