"use client";

import React, { useState } from "react";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { MapPin, Navigation, ExternalLink, Compass } from "lucide-react";

interface ClickToLoadMapProps {
  locale?: "en" | "hi";
}

export function ClickToLoadMap({ locale = "en" }: ClickToLoadMapProps) {
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;
  const [mapLoaded, setMapLoaded] = useState(false);

  // If no valid embed URL provided, fallback to directions link
  const embedUrl = cafeConfig.contact.googleMapsEmbedUrl.startsWith("[[")
    ? `https://maps.google.com/maps?q=${cafeConfig.contact.geo.latitude},${cafeConfig.contact.geo.longitude}&z=15&output=embed`
    : cafeConfig.contact.googleMapsEmbedUrl;

  return (
    <div className="relative w-full aspect-video sm:aspect-21/9 min-h-[340px] rounded-2xl overflow-hidden border border-cafe-border bg-cafe-surface">
      {mapLoaded ? (
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="A2 Cafe Google Maps Location"
          className="w-full h-full"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-cafe-surface via-cafe-surface-elevated to-cafe-bg">
          <div className="w-14 h-14 rounded-full bg-cafe-caramel/15 border border-cafe-caramel/30 flex items-center justify-center text-cafe-caramel mb-4 shadow-lg">
            <Compass className="w-7 h-7" />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-cafe-cream mb-2">
            {isHi ? "इंटरैक्टिव गूगल मैप" : "Interactive Location Map"}
          </h3>
          <p className="text-sm text-cafe-parchment max-w-md mx-auto mb-6 font-light">
            {isHi ? cafeConfig.contact.address.fullDisplayHi : cafeConfig.contact.address.fullDisplay}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setMapLoaded(true)}
              className="px-5 py-2.5 rounded-lg bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg font-semibold text-sm transition-all shadow-md min-h-[44px] flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>{copy.visit.mapPrompt}</span>
            </button>

            <a
              href={cafeConfig.contact.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg border border-cafe-border hover:border-cafe-caramel text-cafe-cream font-medium text-sm transition-all min-h-[44px] flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-cafe-caramel" />
              <span>{copy.visit.directionsCta}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>

          <span className="text-[11px] text-cafe-muted mt-4">
            {isHi ? "क्लिक करने पर ही मैप स्क्रिप्ट्स लोड होंगी" : "Loads map resources on demand to preserve page speed"}
          </span>
        </div>
      )}
    </div>
  );
}
