import type { Metadata } from "next";
import Link from "next/link";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";
import { ShoppingBag, ArrowLeft, Phone, MessageCircle } from "lucide-react";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Online Ordering | A2 Cafe",
  description: "Direct online takeaway and delivery ordering system for A2 Cafe.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/order/`,
  },
};

export default function OrderPage() {
  return (
    <div className="w-full bg-cafe-bg min-h-screen pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-cafe-surface border border-cafe-border text-center">
        <div className="w-16 h-16 rounded-full bg-cafe-caramel/15 text-cafe-caramel flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8" />
        </div>

        <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2">
          Ordering Desk
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-cafe-cream mb-4">
          Online Ordering
        </h1>

        <p className="text-cafe-parchment text-base font-light leading-relaxed mb-8">
          Our online direct ordering gateway is ready to link to your POS or delivery provider (Swiggy, Zomato, UberEats, or proprietary order engine). In the meantime, place takeaway or pre-orders directly with our barista desk below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href={`https://wa.me/${cafeConfig.contact.whatsappNumber}?text=Takeaway%20Order%20Request`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-cafe-surface-elevated hover:bg-cafe-border border border-cafe-border text-cafe-cream flex items-center justify-center gap-2 font-semibold text-sm transition-all min-h-[48px]"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>Order on WhatsApp</span>
          </a>

          <a
            href={cafeConfig.ctaLinks.callNow}
            className="p-4 rounded-xl bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg flex items-center justify-center gap-2 font-bold text-sm transition-all min-h-[48px]"
          >
            <Phone className="w-5 h-5" />
            <span>Call Barista Desk</span>
          </a>
        </div>

        <div className="pt-6 border-t border-cafe-border/50">
          <Link
            href="/menu/"
            className="inline-flex items-center gap-2 text-sm text-cafe-parchment hover:text-cafe-caramel transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Full Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
