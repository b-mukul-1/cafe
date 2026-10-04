"use client";

import React from "react";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { Phone, MessageCircle, Navigation, ShoppingBag } from "lucide-react";

interface MobileActionBarProps {
  locale?: "en" | "hi";
}

export function MobileActionBar({ locale = "en" }: MobileActionBarProps) {
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cafe-bg/95 backdrop-blur-lg border-t border-cafe-border/80 px-2 py-2 shadow-2xl safe-area-bottom"
      role="region"
      aria-label="Quick Mobile Actions"
    >
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        {/* 1. Call */}
        <a
          href={cafeConfig.ctaLinks.callNow}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-cafe-parchment hover:text-cafe-cream hover:bg-cafe-surface/80 active:bg-cafe-surface transition-colors min-h-[50px] min-w-[48px]"
          aria-label={copy.mobileBar.call}
        >
          <Phone className="w-5 h-5 mb-1 text-cafe-caramel" />
          <span className="text-[11px] font-medium leading-none">{copy.mobileBar.call}</span>
        </a>

        {/* 2. WhatsApp */}
        <a
          href={`https://wa.me/${cafeConfig.contact.whatsappNumber}?text=${encodeURIComponent(
            cafeConfig.contact.whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-cafe-parchment hover:text-cafe-cream hover:bg-cafe-surface/80 active:bg-cafe-surface transition-colors min-h-[50px] min-w-[48px]"
          aria-label={copy.mobileBar.whatsapp}
        >
          <MessageCircle className="w-5 h-5 mb-1 text-[#25D366]" />
          <span className="text-[11px] font-medium leading-none">{copy.mobileBar.whatsapp}</span>
        </a>

        {/* 3. Directions */}
        <a
          href={cafeConfig.contact.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-cafe-parchment hover:text-cafe-cream hover:bg-cafe-surface/80 active:bg-cafe-surface transition-colors min-h-[50px] min-w-[48px]"
          aria-label={copy.mobileBar.directions}
        >
          <Navigation className="w-5 h-5 mb-1 text-cafe-caramel" />
          <span className="text-[11px] font-medium leading-none">{copy.mobileBar.directions}</span>
        </a>

        {/* 4. Order (Highlighted Primary) */}
        <a
          href={cafeConfig.ctaLinks.orderOnline}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-cafe-caramel hover:bg-cafe-caramel-hover active:scale-95 text-cafe-bg font-bold transition-all min-h-[50px] min-w-[48px] shadow-sm"
          aria-label={copy.mobileBar.order}
        >
          <ShoppingBag className="w-5 h-5 mb-1 text-cafe-bg" />
          <span className="text-[11px] font-bold leading-none">{copy.mobileBar.order}</span>
        </a>
      </div>
    </div>
  );
}
