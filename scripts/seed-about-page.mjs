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
  "public/about-hero-building.jpg",
  "about-hero-building.jpg",
  "Sharjah American International School Dubai campus building"
);

const introImage = await uploadImage(
  "/Users/razan/Downloads/_DEL4445.jpg",
  "about-intro-students.jpg",
  "SAIS Dubai students smiling together on the playground"
);

await client.createOrReplace({
  _id: "about-page",
  _type: "aboutPage",
  seo: {
    _type: "seo",
    title: "About Us | SAIS Dubai",
    description: "Learn more about Sharjah American International School Dubai.",
    image: introImage,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      eyebrow: "About Us",
      title: "About Sharjah American International School, Dubai",
    },
    image: heroImage,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
  intro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Sharjah American International School (SAIS)",
      accentTitle: "Dubai Branch",
      subtitle:
        "is a distinguished member of the prestigious SAIS educational network founded and led by Dr. Aysha AlSayyar and Dr. Nawaf Fawaz.",
    },
    image: introImage,
    imagePosition: "center",
    body: [
      block(
        "intro-body-1",
        "The SAIS educational community currently encompasses four Emirates across the UAE: Sharjah, Dubai, Umm Al-Quwain, and Abu Dhabi."
      ),
      block(
        "intro-body-2",
        "The SAIS journey began with the establishment of our flagship Sharjah campus in 1997. The Dubai campus, opened in 2005, represents the second institution in our expanding network. Initially launched as a comprehensive KG-Grade 12 American curriculum school, we began with 60 students and a dedicated core faculty. The school experienced consistent enrollment growth and evolved into a vibrant, innovative learning environment delivering premier American education while honoring local customs and traditions."
      ),
      block(
        "intro-body-3",
        "The administrative leadership across all SAIS campuses maintains close professional collaboration, forming a cohesive professional learning network that supports the development of each institution and its leadership team."
      ),
    ],
  },
});

console.log("Seeded about-page with editable hero and intro section content.");
