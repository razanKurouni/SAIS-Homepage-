export const academicsKindergartenPage = {
  name: "academicsKindergartenPage",
  title: "Academics Kindergarten Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      description: "Editable hero content and colors for the Kindergarten page.",
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image", type: "imageWithAlt" },
        {
          name: "topLineColor",
          title: "Top Line Color",
          type: "string",
          description: "Optional CSS color, for example #d97252.",
        },
        {
          name: "panelColor",
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color for the left hero panel, for example #216B97.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color for the curved divider, for example #00A5B2.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color for the title, for example #ffffff.",
        },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 52% center.",
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
      title: "Intro Text",
      type: "object",
      description: "Centered text section below the Academics navigation.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2.",
        },
        {
          name: "textColor",
          title: "Body Text Color",
          type: "string",
          description: "Optional CSS color, for example #216B97.",
        },
        {
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
      ],
    },
    {
      name: "excellenceSection",
      title: "Driving Excellence Section",
      type: "object",
      description: "Editable curved image and text panel.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 45% center.",
        },
        {
          name: "backgroundColor",
          title: "Left Background Color",
          type: "string",
          description: "Optional CSS color behind the image, for example #00A5B2.",
        },
        {
          name: "panelColor",
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color, for example #216B97.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color, for example #d97252.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2.",
        },
        {
          name: "textColor",
          title: "Body Text Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
      ],
    },
    {
      name: "curriculumSection",
      title: "The Curriculum Section",
      type: "imageTextSection",
      description: "Editable text and image section shown below the curved panel.",
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
        title: title || "Academics Kindergarten Page",
        subtitle,
        media,
      };
    },
  },
};
