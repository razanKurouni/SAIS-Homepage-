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

function block(_key, text) {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const [
  heroImage,
  curriculumImage,
  criticalThinkingIcon,
  communicationIcon,
  organizationIcon,
  researchIcon,
  resilienceIcon,
  empathyIcon,
  curiosityIcon,
  growthMindsetIcon,
] = await Promise.all([
  uploadImage(
    "public/academics-hero.jpg",
    "academics-hero.jpg",
    "SAIS Dubai students working in a science lab"
  ),
  uploadImage(
    "public/academics-curriculum.png",
    "academics-curriculum.png",
    "SAIS Dubai students learning with a microscope"
  ),
  uploadImage(
    "public/academics-icon-critical-thinking.png",
    "academics-icon-critical-thinking.png",
    "Critical and creative thinking icon"
  ),
  uploadImage(
    "public/academics-icon-communication.png",
    "academics-icon-communication.png",
    "Communication and collaboration icon"
  ),
  uploadImage(
    "public/academics-icon-organization.png",
    "academics-icon-organization.png",
    "Organization and self-management icon"
  ),
  uploadImage(
    "public/academics-icon-research.png",
    "academics-icon-research.png",
    "Research and problem-solving icon"
  ),
  uploadImage(
    "public/academics-icon-resilience.png",
    "academics-icon-resilience.png",
    "Resilience and adaptability icon"
  ),
  uploadImage(
    "public/academics-icon-empathy.png",
    "academics-icon-empathy.png",
    "Empathy icon"
  ),
  uploadImage(
    "public/academics-icon-curiosity.png",
    "academics-icon-curiosity.png",
    "Curiosity icon"
  ),
  uploadImage(
    "public/academics-icon-growth-mindset.png",
    "academics-icon-growth-mindset.png",
    "Growth mindset icon"
  ),
]);

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
  curriculumSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Our Curriculum\nPhilosophy and Vision",
      description: [
        block(
          "curriculum-overview",
          "At SAIS-Dubai, our curriculum is driven by a commitment to academic excellence, holistic development, and global readiness. Grounded in internationally recognized American standards - including AERO Common Core and the Next Generation Science Standards - our curriculum ensures that students acquire the knowledge, skills, and dispositions necessary for lifelong learning and success in a rapidly evolving world."
        ),
        block(
          "curriculum-vision",
          "We envision a dynamic, standards-based curriculum that is coherent, vertically and horizontally aligned, and responsive to the diverse needs of our multicultural student body."
        ),
      ],
    },
    image: curriculumImage,
    imagePosition: "center",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
  },
  skillsSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Skills and Dispositions",
      description: [
        block(
          "skills-intro",
          "Through purposeful design rooted in intentional planning using the Backward Design Model, we ensure that every unit of study is capstoned with a summative performance task, where students are expected to apply and demonstrate their learning through four Key Skills and four dispositions."
        ),
      ],
    },
    groups: [
      {
        _key: "key-skills",
        _type: "object",
        title: "Key Skills",
        items: [
          {
            _key: "critical-thinking",
            _type: "object",
            title: "Critical and\nCreative Thinking",
            icon: criticalThinkingIcon,
            iconType: "critical",
            theme: "teal",
          },
          {
            _key: "communication",
            _type: "object",
            title: "Communication and Collaboration",
            icon: communicationIcon,
            iconType: "communication",
            theme: "teal",
          },
          {
            _key: "organization",
            _type: "object",
            title: "Organization and\nSelf-Management",
            icon: organizationIcon,
            iconType: "organization",
            theme: "teal",
          },
          {
            _key: "research",
            _type: "object",
            title: "Research and\nProblem-Solving",
            icon: researchIcon,
            iconType: "research",
            theme: "teal",
          },
        ],
      },
      {
        _key: "dispositions",
        _type: "object",
        title: "Dispositions",
        items: [
          {
            _key: "resilience",
            _type: "object",
            title: "Resilience\nand Adaptability",
            icon: resilienceIcon,
            iconType: "resilience",
            theme: "orange",
          },
          {
            _key: "empathy",
            _type: "object",
            title: "Empathy",
            icon: empathyIcon,
            iconType: "empathy",
            theme: "orange",
          },
          {
            _key: "curiosity",
            _type: "object",
            title: "Curiosity",
            icon: curiosityIcon,
            iconType: "curiosity",
            theme: "orange",
          },
          {
            _key: "growth",
            _type: "object",
            title: "Growth Mindset",
            icon: growthMindsetIcon,
            iconType: "growth",
            theme: "orange",
          },
        ],
      },
    ],
  },
});

console.log("Seeded academics-page with editable hero, curriculum, and skills content.");
