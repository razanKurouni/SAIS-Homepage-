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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Academics Kindergarten page.");
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

function block(_key, text) {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

async function main() {
const [heroImage, excellenceImage, curriculumImage] = await Promise.all([
  uploadImage(
    "public/academics-kg-hero.png",
    "academics-kg-hero.png",
    "SAIS Dubai kindergarten students learning through play"
  ),
  uploadImage(
    "public/academics-kg-excellence.png",
    "academics-kg-excellence.png",
    "SAIS Dubai kindergarten students playing music together"
  ),
  uploadImage(
    "public/academics-kg-curriculum.png",
    "academics-kg-curriculum.png",
    "SAIS Dubai teacher guiding a kindergarten student during outdoor learning"
  ),
]);

await client.createOrReplace({
  _id: "academics-kindergarten-page",
  _type: "academicsKindergartenPage",
  seo: {
    _type: "seo",
    title: "Kindergarten | Academics | SAIS Dubai",
    description: "Explore Kindergarten academics at Sharjah American International School Dubai.",
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      eyebrow: "Academics",
      title: "Kindergarten",
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
      title: "Building Success Through Collaboration",
      description: [
        block(
          "kg-intro",
          "In the early years at SAIS Dubai, our teaching and learning approaches prioritize play-based learning, exploration, and hands-on experiences to foster holistic development."
        ),
      ],
    },
    titleColor: "#00A5B2",
    textColor: "#216B97",
    backgroundColor: "#ffffff",
  },
  excellenceSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Driving Excellence\nThrough Continuous Review",
      description: [
        block(
          "kg-excellence",
          "Teachers utilize a combination of structured activities and child-directed learning opportunities to cater to individual learning styles and needs. Our curriculum emphasizes foundational skills such as literacy, numeracy, and social-emotional development, integrating them into engaging and developmentally appropriate learning experiences. Through a blend of structured lessons, interactive activities, and creative expression, students in KG-Grade 2 develop essential skills, knowledge, and attitudes that form the building blocks for future learning success."
        ),
      ],
    },
    image: excellenceImage,
    imagePosition: "center",
    backgroundColor: "#00A5B2",
    panelColor: "#216B97",
    waveColor: "#d97252",
    titleColor: "#00A5B2",
    textColor: "#ffffff",
  },
  curriculumSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "The Curriculum",
      description: [
        block(
          "kg-curriculum",
          "Early Years (KG-Grade 2): The curriculum provides hands-on, inquiry-based learning through thematic units and play-based exploration. Integrated with AERO and NGSS standards, the program emphasizes foundational literacy, numeracy, science, and social-emotional development."
        ),
      ],
    },
    image: curriculumImage,
    imagePosition: "right",
    theme: "light",
  },
});

console.log("Seeded academics-kindergarten-page with editable hero, intro, excellence, and curriculum content.");
}

function formatSeedError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(/Bearer\s+[^'"`\s]+/g, "Bearer [redacted]");
}

main().catch((error) => {
  console.error(`Failed to seed academics-kindergarten-page: ${formatSeedError(error)}`);
  process.exit(1);
});
