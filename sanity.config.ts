import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { SchemaTypeDefinition } from "sanity";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "saisDubai",
  title: "SAIS Dubai",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Website Content")
          .items([
            S.listItem()
              .title("Menu / Header")
              .schemaType("siteHeader")
              .child(S.document().schemaType("siteHeader").documentId("site-header-main")),
            S.listItem()
              .title("Homepage")
              .schemaType("homepage")
              .child(S.document().schemaType("homepage").documentId("homepage-main")),
            S.listItem()
              .title("Footer")
              .schemaType("siteFooter")
              .child(S.document().schemaType("siteFooter").documentId("site-footer")),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes as unknown as SchemaTypeDefinition[],
    templates: (templates) =>
      templates.filter(
        (template) => !["siteHeader", "siteFooter", "homepage"].includes(template.id)
      ),
  },
});
