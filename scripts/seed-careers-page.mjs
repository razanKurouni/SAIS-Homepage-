import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

function block(_key, text) {
  return {
    _type: "block",
    _key,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${_key}-text`,
        text,
        marks: [],
      },
    ],
  };
}

async function uploadImage(path, filename, title) {
  if (!fs.existsSync(path)) {
    throw new Error(`Image was not found at ${path}`);
  }

  const asset = await client.assets.upload("image", fs.createReadStream(path), {
    filename,
    title,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    alt: title,
  };
}

const heroImage = await uploadImage(
  "public/careers-hero.jpg",
  "careers-hero.jpg",
  "SAIS Dubai teacher supporting a student in a sensory learning space"
);

const workForSaisImage = await uploadImage(
  "public/careers-work-for-sais.png",
  "careers-work-for-sais.png",
  "SAIS Dubai staff members standing together"
);

const editorialImage = await uploadImage(
  "public/careers-editorial.jpg",
  "careers-editorial.jpg",
  "SAIS Dubai teacher supporting a student in a learning space"
);

await client.createOrReplace({
  _id: "careers-page",
  _type: "careersPage",
  seo: {
    _type: "seo",
    title: "Careers | SAIS Dubai",
    description: "Explore career opportunities at Sharjah American International School Dubai.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      eyebrow: "Careers",
      title: "Work At\nOur School",
    },
    image: heroImage,
    topLineColor: "#216B97",
    panelColor: "#707174",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
  intro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Work For SAIS",
      description: [
        block(
          "work-for-sais-body-1",
          "Sharjah American International School, Dubai Campus, delivers premium education that equips students to meet contemporary global challenges. With over 23 years as an education provider in the UAE, we remain dedicated to pursuing excellence and leadership in educational practice."
        ),
      ],
    },
    image: workForSaisImage,
    ctas: [],
  },
  editorialSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "SAIS Educational Community",
      description: [
        block(
          "careers-community-body-1",
          "The SAIS educational community currently encompasses four Emirates across the UAE: Sharjah, Dubai, Umm Al-Quwain, and Abu Dhabi."
        ),
        block(
          "careers-community-body-2",
          "The SAIS journey began with the establishment of our flagship Sharjah campus in 1997. The Dubai campus, opened in 2005, represents the second institution in our expanding network. Initially launched as a comprehensive KG-Grade 12 American curriculum school, we began with 60 students and a dedicated core faculty. The school experienced consistent enrollment growth and evolved into a vibrant, innovative learning environment delivering premier American education while honoring local customs and traditions."
        ),
        block(
          "careers-community-body-3",
          "The administrative leadership across all SAIS campuses maintains close professional collaboration, forming a cohesive professional learning network that supports the development of each institution and its leadership team."
        ),
      ],
    },
    image: editorialImage,
    imagePosition: "right",
    theme: "light",
    ctas: [],
  },
});

console.log("Seeded careers-page with editable hero, Work For SAIS, and text/image content.");
