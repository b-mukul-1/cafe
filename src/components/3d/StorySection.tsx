"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { ChevronDown, Coffee, Utensils, Sparkles, MapPin, Phone, ShoppingBag } from "lucide-react";

// Lazy-load Canvas so zero 3D JS blocks the initial HTML paint
const StoryCanvas = dynamic(
  () => import("./StoryCanvas").then((mod) => mod.StoryCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-cafe-bg relative">
        <img
          src="/images/hero-poster.webp"
          alt="A2 Cafe Hero"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  }
);

interface StorySectionProps {
  locale?: "en" | "hi";
}

export function StorySection({ locale = "en" }: StorySectionProps) {
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;
  const steps = cafeConfig.scene3D.steps;

  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current) return;
          const rect = trackRef.current.getBoundingClientRect();
          const totalScrollable = trackRef.current.clientHeight - window.innerHeight;
          if (totalScrollable <= 0) return;

          const currentScroll = Math.max(0, -rect.top);
          const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Compute active scene step index based on scrollProgress
  const getSceneOpacity = (start: number, end: number, current: number) => {
    // Smooth fade in and out curve
    const midpoint = (start + end) / 2;
    const halfWidth = (end - start) / 2;
    if (current < start || current > end) return 0;
    const dist = Math.abs(current - midpoint);
    return Math.max(0, 1 - dist / halfWidth);
  };

  return (
    <section
      ref={trackRef}
      className="relative w-full bg-cafe-bg"
      style={{ height: `${cafeConfig.scene3D.scrollDurationVh}vh` }}
      aria-label="3D Storytelling Experience"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Background 3D Canvas / Poster Layer */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <StoryCanvas progress={scrollProgress} locale={locale} />
        </div>

        {/* Subtle Vignette Gradient Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-cafe-bg via-transparent to-cafe-bg/40" />

        {/* Real HTML Story Text Overlays (Server and client rendered with high contrast) */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 h-full flex items-center pointer-events-none">
          {/* SCENE 1: Hero */}
          <div
            className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-300"
            style={{
              opacity: getSceneOpacity(0, 0.20, scrollProgress),
              transform: `translateY(${(0.1 - scrollProgress) * 50}px)`,
              pointerEvents: scrollProgress <= 0.18 ? "auto" : "none",
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-cafe-caramel/15 border border-cafe-caramel/30 text-cafe-caramel text-xs tracking-widest uppercase font-semibold">
              <Coffee className="w-3.5 h-3.5" />
              <span>{isHi ? "दस्तकारी कॉफ़ी रोस्टरी" : "Artisanal Coffee Lounge"}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-cafe-cream tracking-tight mb-4 drop-shadow-md">
              {cafeConfig.brand.name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-cafe-parchment font-light max-w-xl mx-auto mb-8 drop-shadow">
              {isHi ? cafeConfig.brand.taglineHi : cafeConfig.brand.tagline}
            </p>
            <div className="flex items-center gap-2 text-cafe-caramel text-xs sm:text-sm uppercase tracking-widest animate-pulse font-medium">
              <span>{copy.home.heroScrollIndicator}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* SCENE 2: Beans & Roast */}
          <div
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 max-w-md transition-all duration-300"
            style={{
              opacity: getSceneOpacity(0.18, 0.38, scrollProgress),
              transform: `translateY(${(0.28 - scrollProgress) * 60}px)`,
              pointerEvents: scrollProgress >= 0.18 && scrollProgress <= 0.38 ? "auto" : "none",
            }}
          >
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2">
              01 / {isHi ? "स्रोत और भूनना" : "Origin & Roast"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-cafe-cream mb-4 leading-tight">
              {steps[1].titleEn && (isHi ? steps[1].titleHi : steps[1].titleEn)}
            </h2>
            <p className="text-cafe-parchment text-base sm:text-lg font-light leading-relaxed">
              {isHi ? steps[1].subtitleHi : steps[1].subtitleEn}
            </p>
          </div>

          {/* SCENE 3: Burger Deconstructed */}
          <div
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 max-w-md text-right transition-all duration-300"
            style={{
              opacity: getSceneOpacity(0.38, 0.60, scrollProgress),
              transform: `translateY(${(0.49 - scrollProgress) * 60}px)`,
              pointerEvents: scrollProgress >= 0.38 && scrollProgress <= 0.60 ? "auto" : "none",
            }}
          >
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2">
              02 / {isHi ? "कारीगरी रसोई" : "Artisanal Kitchen"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-cafe-cream mb-4 leading-tight">
              {steps[2].titleEn && (isHi ? steps[2].titleHi : steps[2].titleEn)}
            </h2>
            <p className="text-cafe-parchment text-base sm:text-lg font-light leading-relaxed">
              {isHi ? steps[2].subtitleHi : steps[2].subtitleEn}
            </p>
          </div>

          {/* SCENE 4: Dessert */}
          <div
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 max-w-md transition-all duration-300"
            style={{
              opacity: getSceneOpacity(0.60, 0.80, scrollProgress),
              transform: `translateY(${(0.70 - scrollProgress) * 60}px)`,
              pointerEvents: scrollProgress >= 0.60 && scrollProgress <= 0.80 ? "auto" : "none",
            }}
          >
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2">
              03 / {isHi ? "ताज़ी पेस्ट्री" : "Daily Patisserie"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-cafe-cream mb-4 leading-tight">
              {steps[3].titleEn && (isHi ? steps[3].titleHi : steps[3].titleEn)}
            </h2>
            <p className="text-cafe-parchment text-base sm:text-lg font-light leading-relaxed">
              {isHi ? steps[3].subtitleHi : steps[3].subtitleEn}
            </p>
          </div>

          {/* SCENE 5: Symphony */}
          <div
            className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-300"
            style={{
              opacity: getSceneOpacity(0.80, 0.93, scrollProgress),
              transform: `translateY(${(0.86 - scrollProgress) * 60}px)`,
              pointerEvents: scrollProgress >= 0.80 && scrollProgress <= 0.93 ? "auto" : "none",
            }}
          >
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2">
              04 / {isHi ? "संगम" : "Symphony"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-cafe-cream mb-4">
              {steps[4].titleEn && (isHi ? steps[4].titleHi : steps[4].titleEn)}
            </h2>
            <p className="text-cafe-parchment text-base sm:text-lg font-light max-w-lg mx-auto">
              {isHi ? steps[4].subtitleHi : steps[4].subtitleEn}
            </p>
          </div>

          {/* SCENE 6: Closing Invitation & Action CTAs */}
          <div
            className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-300 pointer-events-auto"
            style={{
              opacity: getSceneOpacity(0.92, 1.0, scrollProgress),
              transform: `translateY(${(0.96 - scrollProgress) * 50}px)`,
              pointerEvents: scrollProgress >= 0.92 ? "auto" : "none",
            }}
          >
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2">
              {isHi ? "पधारें" : "The Invitation"}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-cafe-cream mb-4">
              {steps[5].titleEn && (isHi ? steps[5].titleHi : steps[5].titleEn)}
            </h2>
            <p className="text-cafe-parchment text-lg sm:text-xl font-light max-w-xl mx-auto mb-8">
              {isHi ? steps[5].subtitleHi : steps[5].subtitleEn}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href={isHi ? "/hi/menu" : "/menu"}
                className="px-6 py-3.5 rounded-lg bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg font-semibold text-sm transition-all shadow-lg hover:shadow-cafe-caramel/25 min-h-[44px] flex items-center gap-2"
              >
                <Utensils className="w-4 h-4" />
                <span>{isHi ? "मेनू देखें" : "View Full Menu"}</span>
              </a>
              <a
                href={cafeConfig.ctaLinks.orderOnline}
                className="px-6 py-3.5 rounded-lg bg-cafe-surface hover:bg-cafe-surface-elevated text-cafe-cream border border-cafe-border hover:border-cafe-caramel font-semibold text-sm transition-all min-h-[44px] flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-cafe-caramel" />
                <span>{isHi ? "ऑनलाइन ऑर्डर" : "Order Online"}</span>
              </a>
              <a
                href={isHi ? "/hi/visit" : "/visit"}
                className="px-6 py-3.5 rounded-lg bg-transparent hover:bg-cafe-surface text-cafe-cream border border-cafe-border hover:border-cafe-parchment font-medium text-sm transition-all min-h-[44px] flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-cafe-caramel" />
                <span>{isHi ? "दिशा-निर्देश" : "Get Directions"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
