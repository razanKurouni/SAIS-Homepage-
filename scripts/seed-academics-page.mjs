import fs from "node:fs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Academics page.");
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
  "public/academics-hero.jpg",
  "academics-hero.jpg",
  "SAIS Dubai students working in a science lab"
);

await client.createOrReplace({
  _id: "academics-page",
  _type: "academicsPage",
  seo: {
    _type: "seo",
    title: "Academics | SAIS Dubai",
    description: "Explore academics at Sharjah American International School Dubai.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Academics\nat SAIS Dubai",
    },
    image: heroImage,
    topLineColor: "#216B97",
    panelColor: "#707174",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
});

console.log("Seeded academics-page with editable hero content.");
