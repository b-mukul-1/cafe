import type { Metadata } from "next";
import Link from "next/link";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Terms of Service | A2 Cafe",
  description: "Terms and conditions governing the use of the A2 Cafe website and table reservation services.",
  robots: {
    index: false, // Utility page: no-index
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/terms/`,
  },
};

export default function TermsPage() {
  return (
    <div className="w-full bg-cafe-bg min-h-screen pt-28 pb-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2">
            Legal &amp; Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-cafe-cream mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-cafe-muted">
            Effective as of October 2026 • Governing {cafeConfig.brand.legalName}
          </p>
        </header>

        <div className="prose prose-invert prose-cafe text-cafe-parchment space-y-6 text-sm font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-serif font-bold text-cafe-cream mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-cafe-cream mb-3">2. Menu Pricing and Availability</h2>
            <p>
              All menu offerings, seasonal specials, and prices displayed on this site are indicative and subject to change without prior notice based on seasonal availability and market conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-cafe-cream mb-3">3. Reservations and Conduct</h2>
            <p>
              Table reservations requested through WhatsApp or telephone are confirmed subject to seating capacity and table availability. We request prompt arrival within 15 minutes of your reserved window.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-cafe-cream mb-3">4. Intellectual Property</h2>
            <p>
              All trademarks, logos, copy, 3D presentations, and visual assets are proprietary to {cafeConfig.brand.legalName} or licensed to the A2 Cafe Template engine.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-cafe-border">
          <Link href="/" className="text-sm font-semibold text-cafe-caramel hover:underline">
            ← Return to Home
          </Link>
        </div>
      </article>
    </div>
  );
}
