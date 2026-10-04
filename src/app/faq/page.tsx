import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/FaqPage";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ)",
  description: "Find verified answers to common questions about A2 Cafe: opening hours, dietary options, reservations, Wi-Fi, and parking.",
  alternates: {
    canonical: `${siteUrl}/faq/`,
    languages: {
      en: `${siteUrl}/faq/`,
      hi: `${siteUrl}/hi/faq/`,
    },
  },
};

export default function Page() {
  return <FaqPage locale="en" />;
}
