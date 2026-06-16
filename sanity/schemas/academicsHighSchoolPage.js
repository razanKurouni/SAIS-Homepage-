export const academicsHighSchoolPage = {
  name: "academicsHighSchoolPage",
  title: "Academics High School Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      description: "Editable hero content and colors for the High School page.",
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
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color for the left hero panel, for example #6f7175.",
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
          description: "Optional CSS object-position value, for example center or 55% center.",
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
      name: "innerNavigation",
      title: "Inner Navigation",
      type: "object",
      description: "Editable navigation bar shown below the High School hero.",
      fields: [
        {
          name: "items",
          title: "Navigation Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "href", title: "Link", type: "string" },
                { name: "openInNewTab", title: "Open in New Tab", type: "boolean", initialValue: false },
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "href",
                },
              },
            },
          ],
        },
        {
          name: "activeHref",
          title: "Active Link",
          type: "string",
          description: "The href that should be highlighted, for example /academics/high-school.",
        },
        {
          name: "activeColor",
          title: "Active Background Color",
          type: "string",
          description: "Optional CSS color for the active item, for example #00A5B2.",
        },
        {
          name: "inactiveColor",
          title: "Inactive Background Color",
          type: "string",
          description: "Optional CSS color for inactive items, for example #216B97.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
        {
          name: "dividerColor",
          title: "Divider Color",
          type: "string",
          description: "Optional CSS color for item dividers, for example #ffffff.",
        },
        {
          name: "topLineColor",
          title: "Top Line Color",
          type: "string",
          description: "Optional CSS color for the top border, for example #ffffff.",
        },
        {
          name: "ariaLabel",
          title: "Accessibility Label",
          type: "string",
          description: "Optional label for screen readers.",
        },
      ],
    },
    {
      name: "overviewSection",
      title: "Freedom to Explore Section",
      type: "object",
      description: "Text and image section — Freedom to Explore, Guidance to Grow.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color, for example #216B97.",
        },
        {
          name: "textColor",
          title: "Body Text Color",
          type: "string",
          description: "Optional CSS color, for example #666b70.",
        },
      ],
    },
    {
      name: "excellenceSection",
      title: "Building Confident Graduates Section",
      type: "object",
      description: "Curved image and text band — Building Confident, Future-Ready Graduates.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imageSide",
          title: "Image Side",
          type: "string",
          description: "Choose where the image appears in this curved band.",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
        },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 45% center.",
        },
        {
          name: "panelColor",
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color, for example #216B97.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the section title, for example #ffffff.",
        },
        {
          name: "textColor",
          title: "Body Text Color",
          type: "string",
          description: "Optional CSS color for the body text, for example #ffffff.",
        },
      ],
    },
    {
      name: "curriculumSection",
      title: "The Curriculum Section",
      type: "object",
      description: "Text and image section for the High School curriculum.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
      ],
    },
    {
      name: "careerGuidanceSection",
      title: "Career Guidance Section",
      type: "object",
      description: "Curved image and text band for Career Guidance.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imageSide",
          title: "Image Side",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
        },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 45% center.",
        },
        {
          name: "panelColor",
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color, for example #f5f5f5.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the section title.",
        },
        {
          name: "textColor",
          title: "Body Text Color",
          type: "string",
          description: "Optional CSS color for the body text.",
        },
      ],
    },
    {
      name: "pathwaysSection",
      title: "High School Pathways Section",
      type: "object",
      description: "Text and image section introducing High School Pathways.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        { name: "backgroundColor", title: "Background Color", type: "string" },
        { name: "titleColor", title: "Title Color", type: "string" },
        { name: "textColor", title: "Body Text Color", type: "string" },
      ],
    },
    {
      name: "pathwaysSliderSection",
      title: "Pathway Overview Slider",
      type: "object",
      description: "Slider showing each High School pathway with image and description.",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        {
          name: "slides",
          title: "Pathway Slides",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Pathway Title", type: "string" },
                {
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 8,
                  description: "Use blank lines between paragraphs. Start lines with - for bullet lists.",
                },
                { name: "image", title: "Image", type: "imageWithAlt" },
                { name: "backgroundColor", title: "Background Color", type: "string", description: "e.g. #00A5B2" },
                { name: "sideColor", title: "Side Panel Color", type: "string", description: "e.g. #216B97" },
                { name: "ringColor", title: "Ring/Curve Color", type: "string", description: "e.g. #d97252" },
                { name: "titleColor", title: "Title Color", type: "string" },
                { name: "textColor", title: "Text Color", type: "string", description: "e.g. #ffffff" },
                { name: "imagePosition", title: "Image Position", type: "string", description: "e.g. center or 45% center" },
              ],
              preview: {
                select: { title: "title", media: "image.image" },
              },
            },
          ],
        },
      ],
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
        title: title || "Academics High School Page",
        subtitle,
        media,
      };
    },
  },
};
