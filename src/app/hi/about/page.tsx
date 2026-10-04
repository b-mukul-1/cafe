import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "हमारी कहानी और रोस्टरी दर्शन",
  description: "A2 कैफे की कहानी: कॉफ़ी रोस्टिंग की लगन, फ्रेंच बेकरी की शुद्धता और सच्चे आतिथ्य का संगम।",
  alternates: {
    canonical: `${siteUrl}/hi/about/`,
    languages: {
      en: `${siteUrl}/about/`,
      hi: `${siteUrl}/hi/about/`,
    },
  },
};

export default function Page() {
  return <AboutPage locale="hi" />;
}
