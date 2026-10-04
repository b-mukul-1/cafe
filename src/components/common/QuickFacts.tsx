import React from "react";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { Utensils, MapPin, Clock, CreditCard, Car, ShoppingBag, Sparkles } from "lucide-react";

interface QuickFactsProps {
  locale?: "en" | "hi";
}

export function QuickFacts({ locale = "en" }: QuickFactsProps) {
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;

  const facts = [
    {
      icon: Utensils,
      label: copy.quickFacts.whatWeServe,
      value: copy.quickFacts.whatWeServeAnswer,
    },
    {
      icon: MapPin,
      label: copy.quickFacts.whereToFindUs,
      value: isHi ? cafeConfig.contact.address.fullDisplayHi : cafeConfig.contact.address.fullDisplay,
    },
    {
      icon: Clock,
      label: copy.quickFacts.hoursSummary,
      value: cafeConfig.openingHours.map((h) => (isHi ? h.formattedHi : h.formattedEn)).join(" • "),
    },
    {
      icon: CreditCard,
      label: copy.quickFacts.priceRangeSummary,
      value: `${cafeConfig.details.priceRange} (${
        isHi ? cafeConfig.details.priceRangeDescriptionHi : cafeConfig.details.priceRangeDescription
      })`,
    },
    {
      icon: Car,
      label: copy.quickFacts.parkingSummary,
      value: isHi ? cafeConfig.contact.parkingDetailsHi : cafeConfig.contact.parkingDetails,
    },
    {
      icon: ShoppingBag,
      label: copy.quickFacts.howToOrder,
      value: copy.quickFacts.howToOrderAnswer,
    },
  ];

  return (
    <section className="py-12 bg-cafe-surface/60 border-y border-cafe-border" aria-label="Cafe Quick Facts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-cafe-caramel/10 border border-cafe-caramel/25 text-cafe-caramel text-xs tracking-wider uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{copy.quickFacts.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-cafe-cream">
              {copy.quickFacts.title}
            </h2>
          </div>
          <p className="text-xs text-cafe-muted max-w-xs sm:text-right">
            {isHi
              ? "सटीक और सत्यापित जानकारी, सीधे हमारे प्रबंधन द्वारा अद्यतन।"
              : "Direct, factual answers for guests and generative search engines."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-xl bg-cafe-surface border border-cafe-border/80 hover:border-cafe-border-medium transition-all"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="p-2 rounded-lg bg-cafe-caramel/10 text-cafe-caramel">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-cafe-cream tracking-wide">
                    {fact.label}
                  </h3>
                </div>
                <p className="text-sm text-cafe-parchment leading-relaxed font-light pl-9">
                  {fact.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
