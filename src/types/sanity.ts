export type PortableTextSpan = {
  _key?: string;
  _type?: "span";
  text?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type?: "block";
  children?: PortableTextSpan[];
};

export type SanityImage = {
  alt?: string;
  caption?: string;
  url?: string;
};

export type LinkField = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type Cta = LinkField & {
  variant?: "primary" | "secondary" | "ghost";
};

export type SectionHeading = {
  eyebrow?: string;
  title: string;
  accentTitle?: string;
  subtitle?: string;
  description?: PortableTextBlock[];
};

export type Seo = {
  title?: string;
  description?: string;
  image?: SanityImage;
};

export type MetricItem = {
  value: string;
  label: string;
};

export type FeatureCard = {
  title: string;
  description?: string;
  image?: SanityImage;
  cta?: Cta;
  theme?: "blue" | "teal" | "orange" | "gray";
};

export type ImageTextSection = {
  _key?: string;
  heading: SectionHeading;
  image?: SanityImage;
  ctas?: Cta[];
  imagePosition?: "left" | "right";
  theme?: "blue" | "teal" | "light";
};

export type LogoItem = {
  name: string;
  image?: SanityImage;
};

export type WhyDubaiItem = {
  title?: string;
  description: string;
  iconType?: "student" | "globe" | "learning" | "family";
  icon?: SanityImage;
};

export type FooterColumn = {
  title?: string;
  links?: LinkField[];
};

export type SiteFooter = {
  logoText?: string;
  contactText?: PortableTextBlock[];
  columns?: FooterColumn[];
  socialLinks?: LinkField[];
  legalLinks?: LinkField[];
};

export type HeaderSettings = {
  logo?: SanityImage;
  scrolledLogo?: SanityImage;
  menuIcon?: SanityImage;
  bookTourButton?: Cta;
  applyNowButton?: Cta;
};

export type SiteHeader = HeaderSettings & {
  navigation?: LinkField[];
};

export type HomepageData = {
  seo?: Seo;
  header?: HeaderSettings;
  navigation?: LinkField[];
  hero?: {
    heading: string;
    subtitle?: string;
    description?: PortableTextBlock[];
    image?: SanityImage;
    ctas?: Cta[];
    valueBar?: string[];
  };
  heroContactBand?: {
    text?: string;
    ctas?: Cta[];
  };
  aboutPage?: {
    hero?: {
      heading?: SectionHeading;
      image?: SanityImage;
      topLineColor?: string;
      panelColor?: string;
      waveColor?: string;
      textColor?: string;
      imagePosition?: string;
    };
  };
  intro?: ImageTextSection;
  whyDubai?: {
    heading: SectionHeading;
    image?: SanityImage;
    items?: WhyDubaiItem[];
  };
  ctaBand?: {
    text: string;
    ctas?: Cta[];
  };
  accreditations?: {
    heading: SectionHeading;
    logos?: LogoItem[];
  };
  whySection?: ImageTextSection;
  facts?: {
    heading: SectionHeading;
    items?: MetricItem[];
  };
  quickLinks?: {
    heading: SectionHeading;
    cards?: FeatureCard[];
  };
  learningPhases?: {
    heading: SectionHeading;
    cta?: Cta;
    cards?: FeatureCard[];
  };
  tour?: {
    heading: SectionHeading;
    cards?: FeatureCard[];
  };
  news?: {
    heading: SectionHeading;
    cta?: Cta;
    posts?: FeatureCard[];
  };
  instagram?: {
    heading: SectionHeading;
    images?: SanityImage[];
    socialLinks?: LinkField[];
  };
  footer?: SiteFooter;
};

export type LegacyHomeSection = {
  _id: string;
  order: number;
  title: string;
  subtitle?: string;
  body?: PortableTextBlock[];
  items?: string[];
  ctas?: string[];
  imagePlaceholders?: Array<{
    _key?: string;
    label?: string;
    fileName?: string;
    note?: string;
  }>;
  images?: Array<SanityImage & { label?: string }>;
};
