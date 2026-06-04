import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

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
  "contact-hero-building.jpg",
  "Sharjah American International School Dubai campus building"
);

await client.createOrReplace({
  _id: "contact-page",
  _type: "contactPage",
  seo: {
    _type: "seo",
    title: "Contact Us | SAIS Dubai",
    description: "Contact Sharjah American International School Dubai.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      eyebrow: "Contact Us",
      title: "Contact Sharjah American International School, Dubai",
    },
    image: heroImage,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
});

console.log("Seeded contact-page with editable hero content.");
