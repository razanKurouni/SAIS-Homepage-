import { createClient } from "@sanity/client";
import { aboutPageQuery } from "@/sanity/queries/about-page";
import {
  homepageQuery,
  legacyHomeSectionsQuery,
  siteFooterQuery,
  siteHeaderQuery,
} from "@/sanity/queries/homepage";
import { mapLegacySectionsToHomepage } from "@/lib/content";
import type { AboutPageData, HomepageData, LegacyHomeSection, SiteFooter, SiteHeader } from "@/types/sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

function getSanityClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion: "2023-01-01",
    useCdn: true,
    perspective: "published",
  });
}

export async function getHomepage(): Promise<HomepageData> {
  try {
    const client = getSanityClient();
    const [homepage, siteHeader, siteFooter] = await Promise.all([
      client.fetch<HomepageData | null>(homepageQuery),
      client.fetch<SiteHeader | null>(siteHeaderQuery),
      client.fetch<SiteFooter | null>(siteFooterQuery),
    ]);

    if (homepage) {
      return {
        ...homepage,
        header: siteHeader || homepage.header,
        navigation: siteHeader?.navigation || homepage.navigation,
        footer: siteFooter || homepage.footer,
      };
    }

    const legacySections = await client.fetch<LegacyHomeSection[]>(legacyHomeSectionsQuery);
    return mapLegacySectionsToHomepage(legacySections || []);
  } catch {
    return mapLegacySectionsToHomepage([]);
  }
}

export async function getAboutPage(): Promise<AboutPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AboutPageData | null>(aboutPageQuery);
  } catch {
    return null;
  }
}
