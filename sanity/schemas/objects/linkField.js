export const linkField = {
  name: "linkField",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Label",
      type: "string",
      description: "Text shown to visitors.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "href",
      title: "URL",
      type: "string",
      description: "Use an internal anchor like #admissions or a full URL.",
      initialValue: "#",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    },
  ],
};
