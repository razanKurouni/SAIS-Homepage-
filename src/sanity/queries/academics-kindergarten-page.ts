const imageWithAltProjection = `{
  alt,
  caption,
  "url": image.asset->url
}`;

const headingProjection = `{
  eyebrow,
  title,
  accentTitle,
  subtitle,
  description
}`;

export const academicsKindergartenPageQuery = `*[_type == "academicsKindergartenPage" && _id == "academics-kindergarten-page"][0] {
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
    titleColor,
    textColor,
    backgroundColor
  },
  excellenceSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  curriculumSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    theme
  },
  assessmentSection {
    heading ${headingProjection},
    cards[] {
      _key,
      title,
      description,
      icon ${imageWithAltProjection}
    },
    backgroundColor,
    titleColor,
    textColor,
    cardTextColor,
    cardBorderColor,
    cardHoverBorderColor
  }
}`;
