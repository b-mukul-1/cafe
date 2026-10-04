import type { Metadata } from "next";
import { MenuPage } from "@/components/pages/MenuPage";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Artisanal Menu | Specialty Coffee & Brioche Burgers",
  description: "Explore the A2 Cafe menu: single-origin pour-overs, handcrafted brioche burgers, all-day breakfasts, and fresh patisserie.",
  alternates: {
    canonical: `${siteUrl}/menu/`,
    languages: {
      en: `${siteUrl}/menu/`,
      hi: `${siteUrl}/hi/menu/`,
    },
  },
};

export default function Page() {
  return <MenuPage locale="en" />;
}
