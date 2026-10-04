import React from "react";
import Link from "next/link";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { menuCategories } from "@/content/menu";
import { StorySection } from "@/components/3d/StorySection";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { QuickFacts } from "@/components/common/QuickFacts";
import { JsonLd } from "@/components/common/JsonLd";
import { generateCafeSchema, generateWebSiteSchema } from "@/lib/schema/cafeSchema";
import { Coffee, ArrowRight, ShieldCheck, Clock, MapPin, Phone, ShoppingBag, Sparkles } from "lucide-react";

interface HomePageProps {
  locale?: "en" | "hi";
}

export function HomePage({ locale = "en" }: HomePageProps) {
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;

  // Extract top signature items across categories
  const signatureItems = menuCategories
    .flatMap((cat) => cat.items)
    .filter((item) => item.isSignature)
    .slice(0, 3);

  const cafeSchema = generateCafeSchema(locale);
  const websiteSchema = generateWebSiteSchema();

  return (
    <div className="w-full bg-cafe-bg">
      <JsonLd data={[cafeSchema, websiteSchema]} />

      {/* 1. 3D Scroll Storytelling Hero Section (The signature feature) */}
      <StorySection locale={locale} />

      {/* 2. Signature Items Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-labelledby="signature-heading">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-cafe-caramel/10 border border-cafe-caramel/25 text-cafe-caramel text-xs tracking-wider uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHi ? "हमारी पहचान" : "Our Signatures"}</span>
          </div>
          <h2 id="signature-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-cafe-cream mb-4">
            {copy.home.signatureSectionTitle}
          </h2>
          <p className="text-cafe-parchment text-base sm:text-lg font-light leading-relaxed">
            {copy.home.signatureSectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {signatureItems.map((item) => (
            <MenuItemCard key={item.id} item={item} locale={locale} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href={isHi ? "/hi/menu/" : "/menu/"}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cafe-surface hover:bg-cafe-surface-elevated border border-cafe-border hover:border-cafe-caramel text-cafe-cream font-semibold text-sm transition-all shadow-lg min-h-[48px]"
          >
            <span>{copy.home.viewFullMenu}</span>
            <ArrowRight className="w-4 h-4 text-cafe-caramel" />
          </Link>
        </div>
      </section>

      {/* 3. The A2 Standard (Why Us) */}
      <section className="py-24 bg-cafe-surface border-y border-cafe-border" aria-labelledby="why-choose-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2">
              {isHi ? "शुद्ध गुणवत्ता" : "Uncompromising Quality"}
            </span>
            <h2 id="why-choose-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-cafe-cream mb-4">
              {copy.home.whyChooseTitle}
            </h2>
            <p className="text-cafe-parchment text-base sm:text-lg font-light">
              {copy.home.whyChooseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {copy.home.pillars.map((pillar, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-cafe-bg border border-cafe-border/80 hover:border-cafe-caramel/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-bold text-cafe-caramel/40 mb-4 block">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-cafe-cream mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-cafe-parchment/80 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Experience & How to Order */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="experience-heading">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2">
            {isHi ? "आतिथ्य सत्कार" : "Hospitality"}
          </span>
          <h2 id="experience-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-cafe-cream mb-4">
            {copy.home.experienceTitle}
          </h2>
          <p className="text-cafe-parchment text-base sm:text-lg font-light">
            {copy.home.experienceSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {copy.home.experienceSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-cafe-surface border border-cafe-border hover:border-cafe-border-medium transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-cafe-caramel/10 text-cafe-caramel font-mono text-xs font-bold mb-6">
                  Step {step.step}
                </span>
                <h3 className="text-2xl font-serif font-bold text-cafe-cream mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-cafe-parchment font-light leading-relaxed mb-8">
                  {step.description}
                </p>
              </div>

              <a
                href={step.ctaHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cafe-caramel hover:text-cafe-gold transition-colors pt-4 border-t border-cafe-border/50 min-h-[44px]"
              >
                <span>{step.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Quick Facts Block (AEO / GEO optimized) */}
      <QuickFacts locale={locale} />

      {/* 6. Closing Call to Action Banner */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center" aria-labelledby="cta-banner-heading">
        <div className="p-10 sm:p-16 rounded-3xl bg-radial from-cafe-surface-elevated via-cafe-surface to-cafe-bg border border-cafe-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cafe-caramel/10 rounded-full blur-3xl pointer-events-none" />

          <h2 id="cta-banner-heading" className="text-3xl sm:text-5xl font-serif font-bold text-cafe-cream mb-4">
            {copy.home.ctaBannerTitle}
          </h2>
          <p className="text-base sm:text-xl text-cafe-parchment font-light max-w-xl mx-auto mb-10">
            {copy.home.ctaBannerSubtitle}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href={cafeConfig.ctaLinks.orderOnline}
              className="px-8 py-4 rounded-xl bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg font-bold text-sm transition-all shadow-lg hover:shadow-cafe-caramel/25 min-h-[48px] flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{copy.nav.orderNow}</span>
            </a>
            <Link
              href={isHi ? "/hi/visit/" : "/visit/"}
              className="px-8 py-4 rounded-xl bg-cafe-surface hover:bg-cafe-surface-elevated border border-cafe-border hover:border-cafe-caramel text-cafe-cream font-semibold text-sm transition-all min-h-[48px] flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-cafe-caramel" />
              <span>{copy.nav.visit}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
