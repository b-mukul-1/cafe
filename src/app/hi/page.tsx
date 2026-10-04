import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: cafeConfig.seo.defaultTitleHi,
  description: cafeConfig.seo.defaultDescriptionHi,
  alternates: {
    canonical: `${siteUrl}/hi/`,
    languages: {
      en: `${siteUrl}/`,
      hi: `${siteUrl}/hi/`,
      "x-default": `${siteUrl}/`,
    },
  },
};

export default function Page() {
  return <HomePage locale="hi" />;
}
