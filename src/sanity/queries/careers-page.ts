const imageWithAltProjection = `{
  alt,
  caption,
  "url": image.asset->url
}`;

const ctaProjection = `{
  label,
  href,
  openInNewTab,
  variant
}`;

const headingProjection = `{
  eyebrow,
  title,
  accentTitle,
  subtitle,
  description
}`;

export const careersPageQuery = `*[_type == "careersPage" && _id == "careers-page"][0] {
  seo {
    title,
    description,
    image ${imageWithAltProjection}
  },
  hero {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    topLineColor,
    panelColor,
    waveColor,
    textColor,
    imagePosition,
    imageWidth
  },
  intro {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection}
  },
  editorialSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    imagePosition,
    theme
  }
}`;
