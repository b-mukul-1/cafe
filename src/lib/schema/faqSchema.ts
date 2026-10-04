import { faqItems } from "@/content/faq";
import { getSiteUrl } from "@/config/cafe.config";

export function generateFaqSchema(locale: "en" | "hi" = "en") {
  const siteUrl = getSiteUrl();
  const isHi = locale === "hi";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/faq/#faq`,
    mainEntity: faqItems.map((item) => {
      const q = isHi ? item.questionHi : item.questionEn;
      const shortAns = isHi ? item.shortAnswerHi : item.shortAnswerEn;
      const detailAns = isHi ? item.detailedAnswerHi : item.detailedAnswerEn;
      const combinedAns = `${shortAns} ${detailAns}`.trim();

      return {
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: combinedAns,
        },
      };
    }),
  };
}
