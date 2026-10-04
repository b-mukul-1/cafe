"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { faqItems, FaqItem } from "@/content/faq";
import { JsonLd } from "@/components/common/JsonLd";
import { generateFaqSchema } from "@/lib/schema/faqSchema";
import { generateBreadcrumbSchema } from "@/lib/schema/breadcrumbSchema";
import { ChevronRight, ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FaqPageProps {
  locale?: "en" | "hi";
}

export function FaqPage({ locale = "en" }: FaqPageProps) {
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;

  // Track expanded question IDs (all open by default for rich content indexing and immediate answers)
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    faqItems.forEach((item) => {
      initial[item.id] = true;
    });
    return initial;
  });

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const faqSchema = generateFaqSchema(locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isHi ? "मुख्य पृष्ठ" : "Home", url: isHi ? "/hi/" : "/" },
    { name: isHi ? "सामान्य प्रश्न" : "FAQ", url: isHi ? "/hi/faq/" : "/faq/" },
  ]);

  return (
    <div className="w-full bg-cafe-bg min-h-screen pt-28 pb-24">
      <JsonLd data={[faqSchema, breadcrumbSchema]} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <ol className="flex items-center gap-2 text-xs text-cafe-muted">
          <li>
            <Link href={isHi ? "/hi/" : "/"} className="hover:text-cafe-caramel transition-colors">
              {isHi ? "मुख्य पृष्ठ" : "Home"}
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5" />
          </li>
          <li className="text-cafe-parchment font-medium" aria-current="page">
            {isHi ? "सामान्य प्रश्न" : "FAQ"}
          </li>
        </ol>
      </nav>

      {/* Header with single H1 */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-cafe-caramel/10 border border-cafe-caramel/25 text-cafe-caramel text-xs tracking-wider uppercase font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isHi ? "स्पष्ट और सत्यापित उत्तर" : "Direct & Factual Answers"}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-cafe-cream tracking-tight mb-4">
          {copy.faqPage.title}
        </h1>
        <p className="text-base sm:text-lg text-cafe-parchment max-w-xl mx-auto font-light leading-relaxed">
          {copy.faqPage.subtitle}
        </p>
      </header>

      {/* FAQ Items List */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {faqItems.map((item: FaqItem) => {
          const isOpen = openIds[item.id];
          const question = isHi ? item.questionHi : item.questionEn;
          const shortAnswer = isHi ? item.shortAnswerHi : item.shortAnswerEn;
          const detailedAnswer = isHi ? item.detailedAnswerHi : item.detailedAnswerEn;

          return (
            <article
              key={item.id}
              className="rounded-2xl bg-cafe-surface border border-cafe-border overflow-hidden transition-all hover:border-cafe-border-medium"
            >
              <button
                type="button"
                onClick={() => toggleOpen(item.id)}
                className="w-full p-6 text-left flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cafe-caramel"
                aria-expanded={isOpen}
              >
                <h2 className="text-lg sm:text-xl font-serif font-bold text-cafe-cream leading-snug">
                  {question}
                </h2>
                <div
                  className={`p-1.5 rounded-full bg-cafe-surface-elevated text-cafe-caramel transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 space-y-3">
                  {/* Direct 1-3 sentence answer highlighted for AEO */}
                  <div className="p-4 rounded-xl bg-cafe-surface-elevated/70 border-l-2 border-cafe-caramel text-cafe-cream text-sm sm:text-base font-normal leading-relaxed">
                    {shortAnswer}
                  </div>
                  {/* Detailed explanation */}
                  <p className="text-sm text-cafe-parchment/80 font-light leading-relaxed">
                    {detailedAnswer}
                  </p>
                </div>
              )}
            </article>
          );
        })}

        {/* Still have questions banner */}
        <div className="mt-16 p-8 rounded-2xl bg-cafe-surface border border-cafe-border text-center">
          <h3 className="text-xl font-serif font-bold text-cafe-cream mb-2">
            {isHi ? "क्या आपके पास कोई अन्य प्रश्न है?" : "Have Another Question?"}
          </h3>
          <p className="text-sm text-cafe-parchment font-light mb-6">
            {isHi
              ? "हमारी हेल्पडेस्क टीम से व्हाट्सएप या फोन द्वारा सीधे बात करें।"
              : "Our host desk is always available to assist with custom requests and reservations."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${cafeConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg font-semibold text-sm transition-all min-h-[44px] flex items-center justify-center"
            >
              {isHi ? "व्हाट्सएप पर पूछें" : "Chat on WhatsApp"}
            </a>
            <a
              href={cafeConfig.ctaLinks.callNow}
              className="px-6 py-3 rounded-lg border border-cafe-border hover:border-cafe-caramel text-cafe-cream font-medium text-sm transition-all min-h-[44px] flex items-center justify-center"
            >
              {isHi ? "सीधा कॉल करें" : "Call the Cafe"}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
