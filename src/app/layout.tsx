import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAIS Dubai | School Website",
  description: "Responsive SAIS Dubai homepage powered by Sanity CMS.",
  icons: {
    icon: "/sais-tab-icon.png",
    shortcut: "/sais-tab-icon.png",
    apple: "/sais-tab-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
