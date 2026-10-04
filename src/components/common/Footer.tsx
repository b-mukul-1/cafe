import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { MapPin, Phone, Mail, Clock, Compass } from "lucide-react";

interface FooterProps {
  locale?: "en" | "hi";
}

export function Footer({ locale = "en" }: FooterProps) {
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;

  return (
    <footer className="bg-cafe-surface border-t border-cafe-border text-cafe-parchment pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & NAP */}
          <div className="space-y-4">
            <div className="relative w-40 h-12 mb-4">
              <Image
                src="/images/logo-light.svg"
                alt={cafeConfig.brand.logo.alt}
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-cafe-parchment/80 leading-relaxed font-light">
              {isHi ? copyHi.footer.brandDescription : copyEn.footer.brandDescription}
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4 pt-2">
              {cafeConfig.socialLinks.instagram && (
                <a
                  href={cafeConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cafe-border hover:border-cafe-caramel flex items-center justify-center text-cafe-parchment hover:text-cafe-caramel transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
              )}
              {cafeConfig.socialLinks.facebook && (
                <a
                  href={cafeConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cafe-border hover:border-cafe-caramel flex items-center justify-center text-cafe-parchment hover:text-cafe-caramel transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              )}
              <a
                href={cafeConfig.contact.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-cafe-border hover:border-cafe-caramel flex items-center justify-center text-cafe-parchment hover:text-cafe-caramel transition-colors"
                aria-label="Google Business Profile"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Hours & Hospitality */}
          <div>
            <h3 className="text-base font-serif font-bold text-cafe-cream tracking-wider uppercase mb-5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cafe-caramel" />
              <span>{copy.footer.hours}</span>
            </h3>
            <ul className="space-y-3 text-sm">
              {cafeConfig.openingHours.map((h, i) => (
                <li key={i} className="flex flex-col border-b border-cafe-border/40 pb-2">
                  <span className="text-cafe-cream font-medium">
                    {isHi ? h.formattedHi : h.formattedEn}
                  </span>
                  <span className="text-xs text-cafe-muted mt-0.5">
                    {isHi ? "ताज़ा कॉफ़ी और डाइन-इन" : "Full kitchen & espresso bar"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & NAP (Name, Address, Phone) */}
          <div>
            <h3 className="text-base font-serif font-bold text-cafe-cream tracking-wider uppercase mb-5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cafe-caramel" />
              <span>{copy.footer.contact}</span>
            </h3>
            <address className="not-italic space-y-3 text-sm">
              <p className="text-cafe-cream leading-relaxed font-light">
                {isHi ? cafeConfig.contact.address.fullDisplayHi : cafeConfig.contact.address.fullDisplay}
              </p>
              <p className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-cafe-caramel shrink-0" />
                <a
                  href={cafeConfig.ctaLinks.callNow}
                  className="hover:text-cafe-caramel transition-colors font-medium text-cafe-cream"
                >
                  {cafeConfig.contact.phoneFormatted}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cafe-caramel shrink-0" />
                <a
                  href={`mailto:${cafeConfig.contact.email}`}
                  className="hover:text-cafe-caramel transition-colors"
                >
                  {cafeConfig.contact.email}
                </a>
              </p>
              <div className="pt-2">
                <a
                  href={cafeConfig.contact.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cafe-caramel hover:underline"
                >
                  <span>{isHi ? "गूगल मैप्स पर दिशा-निर्देश" : "Get Google Maps Directions"}</span>
                  <span>→</span>
                </a>
              </div>
            </address>
          </div>

          {/* Column 4: Quick Links & Legal */}
          <div>
            <h3 className="text-base font-serif font-bold text-cafe-cream tracking-wider uppercase mb-5">
              {copy.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href={isHi ? "/hi/menu/" : "/menu/"}
                  className="hover:text-cafe-caramel transition-colors"
                >
                  {copy.nav.menu}
                </Link>
              </li>
              <li>
                <Link
                  href={isHi ? "/hi/about/" : "/about/"}
                  className="hover:text-cafe-caramel transition-colors"
                >
                  {copy.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={isHi ? "/hi/visit/" : "/visit/"}
                  className="hover:text-cafe-caramel transition-colors"
                >
                  {copy.nav.visit}
                </Link>
              </li>
              <li>
                <Link
                  href={isHi ? "/hi/faq/" : "/faq/"}
                  className="hover:text-cafe-caramel transition-colors"
                >
                  {copy.nav.faq}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy/"
                  className="hover:text-cafe-caramel transition-colors text-xs text-cafe-muted pt-2 block"
                >
                  {copy.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms/"
                  className="hover:text-cafe-caramel transition-colors text-xs text-cafe-muted block"
                >
                  {copy.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and engine credit */}
        <div className="pt-8 border-t border-cafe-border/50 flex flex-col sm:flex-row items-center justify-between text-xs text-cafe-muted gap-4">
          <p>
            © {new Date().getFullYear()} {cafeConfig.brand.legalName}. {copy.footer.allRightsReserved}
          </p>
          <p className="text-cafe-muted/70">
            {copy.footer.templateCredit}
          </p>
        </div>
      </div>
    </footer>
  );
}
