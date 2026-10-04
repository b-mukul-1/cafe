import React from "react";
import Link from "next/link";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { ClickToLoadMap } from "@/components/common/ClickToLoadMap";
import { QuickFacts } from "@/components/common/QuickFacts";
import { JsonLd } from "@/components/common/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/schema/breadcrumbSchema";
import { generateCafeSchema } from "@/lib/schema/cafeSchema";
import {
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  Car,
  Train,
  Navigation,
  Compass,
} from "lucide-react";

interface VisitPageProps {
  locale?: "en" | "hi";
}

export function VisitPage({ locale = "en" }: VisitPageProps) {
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isHi ? "मुख्य पृष्ठ" : "Home", url: isHi ? "/hi/" : "/" },
    { name: isHi ? "पधारें" : "Visit Us", url: isHi ? "/hi/visit/" : "/visit/" },
  ]);
  const cafeSchema = generateCafeSchema(locale);

  return (
    <div className="w-full bg-cafe-bg min-h-screen pt-28 pb-24">
      <JsonLd data={[cafeSchema, breadcrumbSchema]} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
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
            {isHi ? "पधारें" : "Visit Us"}
          </li>
        </ol>
      </nav>

      {/* Header with single H1 */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-3">
          {isHi ? "आतिथ्य और संपर्क" : "Hospitality & Directions"}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-cafe-cream tracking-tight mb-4">
          {copy.visit.title}
        </h1>
        <p className="text-base sm:text-lg text-cafe-parchment max-w-xl mx-auto font-light">
          {copy.visit.subtitle}
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Click-to-load interactive Google Map */}
        <section aria-label="Interactive Map Location">
          <ClickToLoadMap locale={locale} />
        </section>

        {/* Contact and Hours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Address & Transit */}
          <div className="p-8 rounded-2xl bg-cafe-surface border border-cafe-border flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cafe-caramel/10 text-cafe-caramel flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-cafe-cream mb-4">
                {copy.visit.findUsHeading}
              </h2>
              <p className="text-base text-cafe-parchment font-light leading-relaxed mb-6">
                {isHi ? cafeConfig.contact.address.fullDisplayHi : cafeConfig.contact.address.fullDisplay}
              </p>

              <div className="space-y-3 pt-4 border-t border-cafe-border/50 text-xs text-cafe-muted">
                <div className="flex items-start gap-2">
                  <Train className="w-4 h-4 text-cafe-caramel shrink-0 mt-0.5" />
                  <span>{isHi ? cafeConfig.contact.transitDetailsHi : cafeConfig.contact.transitDetails}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-cafe-caramel shrink-0 mt-0.5" />
                  <span>{isHi ? cafeConfig.contact.parkingDetailsHi : cafeConfig.contact.parkingDetails}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cafe-border/50">
              <a
                href={cafeConfig.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg font-semibold text-sm transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Navigation className="w-4 h-4" />
                <span>{copy.visit.directionsCta}</span>
              </a>
            </div>
          </div>

          {/* Card 2: Operating Hours */}
          <div className="p-8 rounded-2xl bg-cafe-surface border border-cafe-border flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cafe-caramel/10 text-cafe-caramel flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-cafe-cream mb-4">
                {copy.visit.hoursHeading}
              </h2>

              <ul className="space-y-4 mb-6">
                {cafeConfig.openingHours.map((h, i) => (
                  <li key={i} className="pb-3 border-b border-cafe-border/40">
                    <span className="text-sm font-semibold text-cafe-cream block">
                      {isHi ? h.formattedHi : h.formattedEn}
                    </span>
                    <span className="text-xs text-cafe-muted">
                      {isHi ? "नाश्ता, लंच और देर शाम की कॉफ़ी" : "Pour-over bar & full kitchen service"}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-cafe-muted italic">
                {isHi
                  ? "रसोई बंद होने से 30 मिनट पहले तक अंतिम भोजन ऑर्डर स्वीकार किए जाते हैं।"
                  : "Last hot kitchen food order accepted 30 minutes before closing time."}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-cafe-border/50">
              <a
                href={cafeConfig.ctaLinks.reserveTable}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg bg-cafe-surface-elevated hover:bg-cafe-border border border-cafe-border text-cafe-cream font-semibold text-sm transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{copy.nav.reserveTable}</span>
              </a>
            </div>
          </div>

          {/* Card 3: Direct Contact */}
          <div className="p-8 rounded-2xl bg-cafe-surface border border-cafe-border flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cafe-caramel/10 text-cafe-caramel flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-cafe-cream mb-4">
                {copy.visit.contactHeading}
              </h2>

              <div className="space-y-5 text-sm mb-6">
                <div>
                  <span className="text-xs text-cafe-muted uppercase tracking-wider block mb-1">
                    {isHi ? "सीधा फोन" : "Phone Line"}
                  </span>
                  <a
                    href={cafeConfig.ctaLinks.callNow}
                    className="text-lg font-medium text-cafe-cream hover:text-cafe-caramel transition-colors"
                  >
                    {cafeConfig.contact.phoneFormatted}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-cafe-muted uppercase tracking-wider block mb-1">
                    {isHi ? "व्हाट्सएप हेल्पडेस्क" : "WhatsApp Concierge"}
                  </span>
                  <a
                    href={`https://wa.me/${cafeConfig.contact.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-cafe-cream hover:text-cafe-caramel transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>+{cafeConfig.contact.whatsappNumber}</span>
                  </a>
                </div>

                <div>
                  <span className="text-xs text-cafe-muted uppercase tracking-wider block mb-1">
                    {isHi ? "ईमेल संपर्क" : "Email Enquiries"}
                  </span>
                  <a
                    href={`mailto:${cafeConfig.contact.email}`}
                    className="text-sm text-cafe-parchment hover:text-cafe-caramel transition-colors break-all"
                  >
                    {cafeConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cafe-border/50">
              <a
                href={cafeConfig.ctaLinks.callNow}
                className="w-full py-3 rounded-lg border border-cafe-border hover:border-cafe-caramel text-cafe-cream font-medium text-sm transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-cafe-caramel" />
                <span>{copy.visit.callCta}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Facts Block (AEO) */}
        <QuickFacts locale={locale} />
      </main>
    </div>
  );
}
