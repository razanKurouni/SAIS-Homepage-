export const careersPage = {
  name: "careersPage",
  title: "Careers Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      description: "Editable hero content and colors for the Careers page.",
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image", type: "imageWithAlt" },
        {
          name: "topLineColor",
          title: "Top Line Color",
          type: "string",
          description: "Optional CSS color, for example #216B97.",
        },
        {
          name: "panelColor",
          title: "Dark Panel Background Color",
          type: "string",
          description: "Optional CSS color for the left hero panel, for example #707174.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color for the curved divider, for example #d97252.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color for the title.",
        },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center, right center, or 60% center.",
        },
        {
          name: "imageWidth",
          title: "Desktop Image Width",
          type: "string",
          description: "Optional CSS width for desktop, for example 60%. Mobile stays 100%.",
        },
      ],
    },
    {
      name: "intro",
      title: "Page Content",
      type: "object",
      description: "Editable content shown below the hero.",
      fields: [
        { name: "heading", title: "Heading & Body", type: "sectionHeading" },
        { name: "image", title: "Section Image", type: "imageWithAlt" },
        {
          name: "ctas",
          title: "Buttons",
          type: "array",
          of: [{ type: "cta" }],
        },
      ],
    },
    {
      name: "editorialSection",
      title: "Text + Image Section",
      type: "imageTextSection",
      description: "Editable text and image section shown below the Work For SAIS section.",
    },
  ],
  preview: {
    select: {
      title: "hero.heading.title",
      subtitle: "seo.description",
      media: "hero.image.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Careers Page",
        subtitle,
        media,
      };
    },
  },
};
