import Image from "next/image";
import type { CSSProperties } from "react";
import type { SanityImage } from "@/types/sanity";

type PageHeroProps = {
  title: string;
  image?: SanityImage;
  eyebrow?: string;
  titleId?: string;
  className?: string;
  imageSizes?: string;
  imagePosition?: string;
  imageWidth?: string;
  priority?: boolean;
  topLineColor?: string;
  panelColor?: string;
  waveColor?: string;
  textColor?: string;
  strokeWidth?: number;
};

type PageHeroStyle = CSSProperties & {
  "--page-hero-top-line-color"?: string;
  "--page-hero-panel-bg"?: string;
  "--page-hero-wave-color"?: string;
  "--page-hero-text-color"?: string;
  "--page-hero-image-position"?: string;
  "--page-hero-image-width"?: string;
};

export function PageHero({
  title,
  image,
  eyebrow,
  titleId,
  className = "",
  imageSizes = "(max-width: 767px) 100vw, 62vw",
  imagePosition = "center",
  imageWidth = "60%",
  priority = false,
  topLineColor = "#d97252",
  panelColor = "var(--sais-primary)",
  waveColor = "var(--sais-accent)",
  textColor = "#ffffff",
  strokeWidth = 88,
}: PageHeroProps) {
  const style: PageHeroStyle = {
    "--page-hero-top-line-color": topLineColor,
    "--page-hero-panel-bg": panelColor,
    "--page-hero-wave-color": waveColor,
    "--page-hero-text-color": textColor,
    "--page-hero-image-position": imagePosition,
    "--page-hero-image-width": imageWidth,
  };

  return (
    <section className={`page-hero ${className}`} aria-labelledby={titleId} style={style}>
      <div className="page-hero__media">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || title}
            fill
            priority={priority}
            sizes={imageSizes}
            className="page-hero__image"
          />
        ) : null}
      </div>

      <svg
        className="page-hero__panel-svg"
        viewBox="0 0 1647 928"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="page-hero__panel-shape"
          d="M0,0 H1460 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980 L0,928 Z"
        />
        <path
          className="page-hero__panel-wave"
          d="M1460,-50 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>

      <div className="page-hero__copy">
        {eyebrow ? <p className="page-hero__eyebrow">{eyebrow}</p> : null}
        <h1 id={titleId} className="page-hero__title">
          {title}
        </h1>
      </div>
    </section>
  );
}
