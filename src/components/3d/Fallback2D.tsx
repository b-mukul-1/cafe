"use client";

import React from "react";
import Image from "next/image";
import { cafeConfig } from "@/config/cafe.config";

interface Fallback2DProps {
  progress?: number;
  locale?: "en" | "hi";
}

export function Fallback2D({ progress = 0, locale = "en" }: Fallback2DProps) {
  const isHi = locale === "hi";

  return (
    <div className="relative w-full min-h-screen bg-cafe-bg flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-radial from-cafe-caramel/10 via-transparent to-transparent pointer-events-none" />

      {/* High-res static hero poster */}
      <div className="relative w-full max-w-lg aspect-square mb-8 rounded-2xl overflow-hidden border border-cafe-border shadow-2xl">
        <Image
          src="/images/hero-poster.webp"
          alt="A2 Cafe Artisanal Brew"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cafe-bg via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-cafe-caramel/15 border border-cafe-caramel/30 text-cafe-caramel text-xs tracking-widest uppercase font-semibold">
          {isHi ? "दस्तकारी अनुभव" : "Artisanal Experience"}
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cafe-cream mb-4 tracking-tight">
          {isHi ? cafeConfig.brand.name : cafeConfig.brand.name}
        </h1>
        <p className="text-lg md:text-xl text-cafe-parchment font-light mb-8">
          {isHi ? cafeConfig.brand.taglineHi : cafeConfig.brand.tagline}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={isHi ? "/hi/menu" : "/menu"}
            className="px-6 py-3 rounded-lg bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg font-semibold transition-all shadow-lg hover:shadow-cafe-caramel/20 min-h-[44px] flex items-center justify-center"
          >
            {isHi ? "मेनू देखें" : "Explore Menu"}
          </a>
          <a
            href={isHi ? "/hi/visit" : "/visit"}
            className="px-6 py-3 rounded-lg border border-cafe-border hover:border-cafe-caramel text-cafe-cream font-medium transition-all min-h-[44px] flex items-center justify-center"
          >
            {isHi ? "पधारें" : "Visit Us"}
          </a>
        </div>
      </div>
    </div>
  );
}
