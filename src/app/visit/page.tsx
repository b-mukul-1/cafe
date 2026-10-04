import type { Metadata } from "next";
import { VisitPage } from "@/components/pages/VisitPage";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Visit Us | Location, Hours & Directions",
  description: "Plan your visit to A2 Cafe: full address, directions, valet parking details, opening hours, and WhatsApp table reservations.",
  alternates: {
    canonical: `${siteUrl}/visit/`,
    languages: {
      en: `${siteUrl}/visit/`,
      hi: `${siteUrl}/hi/visit/`,
    },
  },
};

export default function Page() {
  return <VisitPage locale="en" />;
}
