import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Our Story & Roastery Craft",
  description: "Learn about A2 Cafe: our single-origin roasting philosophy, scratch kitchen heritage, and commitment to the neighbourhood.",
  alternates: {
    canonical: `${siteUrl}/about/`,
    languages: {
      en: `${siteUrl}/about/`,
      hi: `${siteUrl}/hi/about/`,
    },
  },
};

export default function Page() {
  return <AboutPage locale="en" />;
}
