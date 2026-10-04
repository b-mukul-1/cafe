import type { Metadata } from "next";
import Link from "next/link";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Privacy Policy | A2 Cafe",
  description: "Privacy policy detailing data protection, cookie usage, and visitor rights at A2 Cafe.",
  robots: {
    index: false, // Utility page: no-index as requested
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/privacy/`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="w-full bg-cafe-bg min-h-screen pt-28 pb-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2">
            Legal &amp; Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-cafe-cream mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-cafe-muted">
            Last updated: October 2026 • Effective for {cafeConfig.brand.legalName}
          </p>
        </header>

        <div className="prose prose-invert prose-cafe text-cafe-parchment space-y-6 text-sm font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-serif font-bold text-cafe-cream mb-3">1. Our Privacy Commitment</h2>
            <p>
              At {cafeConfig.brand.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we respect your personal privacy. We do not sell, rent, or monetize your personal data. This website is hosted statically to deliver fast performance without invasive user profiling.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-cafe-cream mb-3">2. Information We Collect</h2>
            <p>
              When you browse our website, we collect minimal aggregated telemetry (such as device type and country level metrics) to optimize loading performance. If you choose to contact us via WhatsApp, phone, or email, your communication details are used solely to fulfill your enquiry or reservation request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-cafe-cream mb-3">3. Cookies and Analytics</h2>
            <p>
              We prioritize privacy-friendly, cookieless or consent-governed analytics. We do not use third-party advertising cookies or cross-site tracking beacons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-cafe-cream mb-3">4. Contact Our Privacy Officer</h2>
            <p>
              If you have any questions or requests regarding your personal information, please contact us at{" "}
              <a href={`mailto:${cafeConfig.contact.email}`} className="text-cafe-caramel hover:underline">
                {cafeConfig.contact.email}
              </a>{" "}
              or write to our registered location at {cafeConfig.contact.address.fullDisplay}.
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
