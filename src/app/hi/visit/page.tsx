import type { Metadata } from "next";
import { VisitPage } from "@/components/pages/VisitPage";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "पधारें | पता, समय और दिशा-निर्देश",
  description: "A2 कैफे आने की योजना बनाएं: पूरा पता, दिशा-निर्देश, पार्किंग सुविधा और संपर्क विवरण।",
  alternates: {
    canonical: `${siteUrl}/hi/visit/`,
    languages: {
      en: `${siteUrl}/visit/`,
      hi: `${siteUrl}/hi/visit/`,
    },
  },
};

export default function Page() {
  return <VisitPage locale="hi" />;
}
