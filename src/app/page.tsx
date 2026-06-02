import { HomePage } from "@/components/home/home-page";
import { getHomepage } from "@/lib/sanity";
import type { Metadata } from "next";

const fallbackMetadata: Metadata = {
  title: "SAIS Dubai | UI Preview",
  description: "Local SAIS navigation rebuild preview.",
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage();

  return {
    title: data.seo?.title || fallbackMetadata.title,
    description: data.seo?.description || fallbackMetadata.description,
  };
}

export const revalidate = 300;

export default async function Page() {
  const data = await getHomepage();

  return <HomePage data={data} />;
}
