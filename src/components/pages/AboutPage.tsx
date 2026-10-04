import React from "react";
import Link from "next/link";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { JsonLd } from "@/components/common/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/schema/breadcrumbSchema";
import { ChevronRight, Award, Coffee, Heart, Users, MapPin } from "lucide-react";

interface AboutPageProps {
  locale?: "en" | "hi";
}

export function AboutPage({ locale = "en" }: AboutPageProps) {
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isHi ? "मुख्य पृष्ठ" : "Home", url: isHi ? "/hi/" : "/" },
    { name: isHi ? "हमारी कहानी" : "Our Story", url: isHi ? "/hi/about/" : "/about/" },
  ]);

  return (
    <div className="w-full bg-cafe-bg min-h-screen pt-28 pb-24">
      <JsonLd data={breadcrumbSchema} />

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
            {isHi ? "हमारी कहानी" : "Our Story"}
          </li>
        </ol>
      </nav>

      {/* Header with single H1 */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 text-center">
        <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-3">
          {isHi ? "स्थापना " + cafeConfig.brand.establishedYear : `Est. ${cafeConfig.brand.establishedYear}`}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-cafe-cream tracking-tight mb-6">
          {copy.about.title}
        </h1>
        <p className="text-lg sm:text-xl text-cafe-parchment font-light leading-relaxed max-w-2xl mx-auto">
          {copy.about.subtitle}
        </p>
      </header>

      {/* Quotable Editorial Block (GEO citation ready) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20" aria-label="Founding Quote">
        <blockquote className="p-8 sm:p-12 rounded-3xl bg-cafe-surface border-l-4 border-cafe-caramel border-y border-r border-cafe-border text-center">
          <p className="font-serif italic text-xl sm:text-2xl text-cafe-cream leading-relaxed mb-4">
            &ldquo;{copy.about.quote}&rdquo;
          </p>
          <cite className="text-xs uppercase tracking-widest text-cafe-caramel not-italic font-semibold">
            — {cafeConfig.brand.legalName}
          </cite>
        </blockquote>
      </section>

      {/* Narrative Section 1: Philosophy & Craft */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20 space-y-6" aria-labelledby="philosophy-heading">
        <h2 id="philosophy-heading" className="text-2xl sm:text-3xl font-serif font-bold text-cafe-cream">
          {copy.about.foundingHeading}
        </h2>
        <div className="prose prose-invert prose-lg text-cafe-parchment font-light space-y-4 leading-relaxed">
          <p>{copy.about.foundingP1}</p>
          <p>{copy.about.foundingP2}</p>
        </div>
      </section>

      {/* Narrative Section 2: Location-Aware Local Context (GEO) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20" aria-labelledby="location-context-heading">
        <div className="p-8 rounded-2xl bg-cafe-surface border border-cafe-border">
          <div className="flex items-center gap-3 mb-4 text-cafe-caramel">
            <MapPin className="w-5 h-5" />
            <h2 id="location-context-heading" className="text-xl sm:text-2xl font-serif font-bold text-cafe-cream">
              {copy.about.locationAwareHeading}
            </h2>
          </div>
          <div className="text-cafe-parchment text-base font-light space-y-4 leading-relaxed">
            <p>{copy.about.locationAwareP1}</p>
            <p>{copy.about.locationAwareP2}</p>
          </div>
          <div className="mt-6 pt-6 border-t border-cafe-border/50 flex flex-wrap gap-4 text-xs text-cafe-muted">
            <span>• Specialty Pour-Overs &amp; V60</span>
            <span>• Artisanal Brioche Burgers</span>
            <span>• French Small-Batch Patisserie</span>
            <span>• High-Speed Wi-Fi &amp; Work Desks</span>
          </div>
        </div>
      </section>

      {/* Team / Craft Values Grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-2xl sm:text-3xl font-serif font-bold text-cafe-cream mb-8 text-center">
          {isHi ? "हमारे बुनियादी मूल्य" : "Our Core Pillars"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-cafe-surface border border-cafe-border text-center">
            <Coffee className="w-8 h-8 text-cafe-caramel mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-cafe-cream mb-2">
              {isHi ? "सटीक निष्कर्षण" : "Precision Extraction"}
            </h3>
            <p className="text-xs text-cafe-parchment/80 font-light leading-relaxed">
              {isHi
                ? "प्रत्येक कप का वजन और निष्कर्षण समय डिजिटल स्केल द्वारा नियंत्रित होता है।"
                : "Every pour-over is brewed with milligram-exact ratios and temperature profiling."}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-cafe-surface border border-cafe-border text-center">
            <Heart className="w-8 h-8 text-cafe-caramel mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-cafe-cream mb-2">
              {isHi ? "सच्चा आतिथ्य" : "Genuine Hospitality"}
            </h3>
            <p className="text-xs text-cafe-parchment/80 font-light leading-relaxed">
              {isHi
                ? "हमारे बरिस्ता आपकी पसंद के अनुसार स्वाद सुझाव देने के लिए हमेशा तत्पर हैं।"
                : "Personalized service where your coffee preferences and palate are remembered."}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-cafe-surface border border-cafe-border text-center">
            <Award className="w-8 h-8 text-cafe-caramel mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-cafe-cream mb-2">
              {isHi ? "स्थानीय स्रोत" : "Ethical Sourcing"}
            </h3>
            <p className="text-xs text-cafe-parchment/80 font-light leading-relaxed">
              {isHi
                ? "हम सीधे किसान परिवारों से बीन्स खरीदते हैं, जिससे उचित मूल्य सुनिश्चित होता है।"
                : "Direct farm-gate trade partnerships that ensure fair compensation for growers."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
