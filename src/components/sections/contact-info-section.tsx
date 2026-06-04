import Image from "next/image";
import type { CSSProperties } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";
import type { ContactInfoItem, ContactInfoSection as ContactInfoSectionData } from "@/types/sanity";

type ContactInfoSectionProps = {
  section?: ContactInfoSectionData;
};

type ContactInfoStyle = CSSProperties & {
  "--contact-info-image-position"?: string;
  "--contact-info-text-color"?: string;
};

const fallbackSection: Required<Pick<ContactInfoSectionData, "heading" | "image" | "items">> = {
  heading: {
    title: "Investing in Continuous Professional Growth",
  },
  image: {
    url: "/contact-campus-building.jpg",
    alt: "Sharjah American International School Dubai campus entrance",
  },
  items: [
    {
      _key: "address",
      icon: "location",
      label: "Campus Address",
      text: "Sharjah American International School - Dubai Campus\nP.O. Box 47755 , Al Warqa 1,\nDubai, UAE.",
    },
    {
      _key: "phone",
      icon: "phone",
      label: "Phone",
      text: "+971 4 280 1111",
      href: "tel:+97142801111",
    },
    {
      _key: "email",
      icon: "email",
      label: "Email",
      text: "sais_dubai@saisdubai.com",
      href: "mailto:sais_dubai@saisdubai.com",
    },
  ],
};

const iconMap: Record<NonNullable<ContactInfoItem["icon"]>, typeof MapPin> = {
  location: MapPin,
  phone: Phone,
  email: Mail,
};

function ContactInfoIcon({ icon = "location" }: Pick<ContactInfoItem, "icon">) {
  const Icon = iconMap[icon] || MapPin;

  return (
    <span className="contact-info-section__item-icon" aria-hidden="true">
      <Icon size={14} strokeWidth={2.25} />
    </span>
  );
}

function ContactInfoText({ item }: { item: ContactInfoItem }) {
  const textLines = item.text?.split("\n").filter(Boolean) || [];
  const content = (
    <>
      {item.label ? <span className="sr-only">{item.label}: </span> : null}
      {textLines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {line}
          {index < textLines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );

  if (item.href) {
    return (
      <a className="contact-info-section__item-text" href={item.href}>
        {content}
      </a>
    );
  }

  return <p className="contact-info-section__item-text">{content}</p>;
}

export function ContactInfoSection({ section }: ContactInfoSectionProps) {
  const heading = section?.heading?.title || fallbackSection.heading.title;
  const image = section?.image?.url ? section.image : fallbackSection.image;
  const imageUrl = image.url || "/contact-campus-building.jpg";
  const imageAlt = image.alt || fallbackSection.image.alt || heading;
  const items = section?.items?.length ? section.items : fallbackSection.items;
  const style: ContactInfoStyle = {
    "--contact-info-image-position": section?.imagePosition || "center",
    "--contact-info-text-color": section?.textColor || "#ffffff",
  };

  return (
    <section className="contact-info-section" aria-labelledby="contact-info-title" style={style}>
      <div className="contact-info-section__inner">
        <div className="contact-info-section__media">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 767px) calc(100vw - 32px), 32vw"
            quality={84}
            className="contact-info-section__image"
          />
        </div>

        <SaisCurvedPanel
          className="contact-info-section__panel"
          contentClassName="contact-info-section__panel-content"
          fillColor={section?.panelColor || "var(--sais-primary)"}
          accentColor={section?.waveColor || "#d97252"}
          strokeWidth={78}
          flipped
          minHeight="clamp(335px, 31vw, 398px)"
        >
          <h2 id="contact-info-title" className="contact-info-section__title">
            {heading}
          </h2>

          <div className="contact-info-section__items">
            {items.map((item, index) => (
              <div className="contact-info-section__item" key={item._key || `${item.label}-${index}`}>
                <ContactInfoIcon icon={item.icon} />
                <ContactInfoText item={item} />
              </div>
            ))}
          </div>
        </SaisCurvedPanel>
      </div>
    </section>
  );
}
