import Image from "next/image";
import type { CSSProperties } from "react";
import type { LogoItem } from "@/types/sanity";

type AccreditationsLogoRailProps = {
  logos?: LogoItem[];
};

export function AccreditationsLogoRail({ logos = [] }: AccreditationsLogoRailProps) {
  const shouldSlide = logos.length > 0;
  const visibleLogos = shouldSlide ? [...logos, ...logos] : logos;
  const railStyle = {
    "--accreditations-scroll-duration": `${Math.max(16, logos.length * 3.6)}s`,
  } as CSSProperties;

  if (logos.length === 0) {
    return null;
  }

  return (
    <div className={`accreditations-rail ${shouldSlide ? "is-slider" : ""}`}>
      <div
        className="accreditations-rail__track"
        style={railStyle}
      >
        {visibleLogos.map((logo, index) => (
          <div
            className="accreditations-rail__item"
            key={`${logo.name}-${index}`}
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
          </div>
        ))}
      </div>
    </div>
  );
}
