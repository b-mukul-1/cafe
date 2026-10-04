import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/FaqPage";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
  description: "A2 कैफे के बारे में अक्सर पूछे जाने वाले प्रश्नों के प्रामाणिक उत्तर: समय, मेनू, पार्किंग और बुकिंग।",
  alternates: {
    canonical: `${siteUrl}/hi/faq/`,
    languages: {
      en: `${siteUrl}/faq/`,
      hi: `${siteUrl}/hi/faq/`,
    },
  },
};

export default function Page() {
  return <FaqPage locale="hi" />;
}
