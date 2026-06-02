import { HomePage } from "@/components/home/home-page";
import { getHomepage } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAIS Dubai | UI Preview",
  description: "Local SAIS navigation rebuild preview.",
};

export const revalidate = 300;

export default async function Page() {
  const data = await getHomepage();

  return <HomePage data={data} />;
}
