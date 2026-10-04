import type { Metadata } from "next";
import { MenuPage } from "@/components/pages/MenuPage";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "हमारा मेनू | कॉफ़ी और स्वादिष्ट बर्गर",
  description: "A2 कैफे का संपूर्ण मेनू देखें: विशेष अरेबिका पोर-ओवर, हस्तनिर्मित ब्रियोश बर्गर और ताज़ी पेस्ट्री।",
  alternates: {
    canonical: `${siteUrl}/hi/menu/`,
    languages: {
      en: `${siteUrl}/menu/`,
      hi: `${siteUrl}/hi/menu/`,
    },
  },
};

export default function Page() {
  return <MenuPage locale="hi" />;
}
