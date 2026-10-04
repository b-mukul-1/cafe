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

  // Compute active scene step index based on scrollProgress with an extended readability plateau
  const getSceneOpacity = (start: number, end: number, current: number, plateauRatio = 0.65) => {
    if (current < start || current > end) return 0;

    // Special case for Scene 1 (Hero): 100% visible on load, holds steady, then fades out smoothly
    if (start === 0) {
      const fadeOutStart = end * 0.70;
      if (current <= fadeOutStart) return 1;
      const t = (end - current) / (end - fadeOutStart);
      return Math.max(0, Math.min(1, t * t * (3 - 2 * t)));
    }

    // Special case for Scene 6 (Final Invitation & CTAs): eases in smoothly and remains 100% locked
    if (end >= 0.99) {
      const fadeInEnd = start + (end - start) * 0.25;
      if (current >= fadeInEnd) return 1;
      const t = (current - start) / (fadeInEnd - start);
      return Math.max(0, Math.min(1, t * t * (3 - 2 * t)));
    }

    // Intermediate chapters: smooth cubic ease-in, solid 100% reading plateau, smooth ease-out
    const duration = end - start;
    const progress = (current - start) / duration;
    const fadeEdge = (1 - plateauRatio) / 2;

    if (progress < fadeEdge) {
      const t = progress / fadeEdge;
      return Math.max(0, Math.min(1, t * t * (3 - 2 * t)));
    } else if (progress > 1 - fadeEdge) {
      const t = (1 - progress) / fadeEdge;
      return Math.max(0, Math.min(1, t * t * (3 - 2 * t)));
    } else {
      return 1;
    }
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
        {/* Background 3D Canvas / Poster Layer (pointer-events-none ensures frictionless touch scroll on mobile) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <StoryCanvas progress={scrollProgress} locale={locale} />
        </div>

        {/* Subtle Vignette Gradient Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-cafe-bg via-transparent to-cafe-bg/40" />

        {/* Real HTML Story Text Overlays (Server and client rendered with high contrast) */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center pointer-events-none">
          {/* SCENE 1: Hero - Guaranteed horizontal center without translate clipping */}
          <div
            className="absolute left-0 right-0 mx-auto w-[92%] sm:w-full max-w-xl top-[10%] sm:top-[12%] md:top-[14%] flex flex-col items-center text-center transition-all duration-300 p-6 sm:p-8 rounded-3xl bg-cafe-bg/75 backdrop-blur-md border border-cafe-border/50 shadow-2xl"
            style={{
              opacity: getSceneOpacity(0, 0.20, scrollProgress),
              transform: `translateY(${(0.08 - scrollProgress) * 40}px)`,
              pointerEvents: scrollProgress <= 0.18 ? "auto" : "none",
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 sm:mb-4 rounded-full bg-cafe-caramel/20 border border-cafe-caramel/40 text-cafe-caramel text-xs tracking-widest uppercase font-semibold">
              <Coffee className="w-3.5 h-3.5" />
              <span>{isHi ? "दस्तकारी कॉफ़ी रोस्टरी" : "Artisanal Coffee Lounge"}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-cafe-cream tracking-tight mb-3 sm:mb-4 drop-shadow-md">
              {cafeConfig.brand.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-cafe-parchment font-light max-w-lg mx-auto mb-6 sm:mb-8 drop-shadow">
              {isHi ? cafeConfig.brand.taglineHi : cafeConfig.brand.tagline}
            </p>
            <div className="flex items-center gap-2 text-cafe-caramel text-xs sm:text-sm uppercase tracking-widest animate-pulse font-medium">
              <span>{copy.home.heroScrollIndicator}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* SCENE 2: Beans & Roast - Safe on-screen left margin */}
          <div
            className="absolute left-4 sm:left-8 md:left-12 lg:left-16 w-[calc(100%-2rem)] sm:w-auto max-w-sm sm:max-w-md top-[24%] sm:top-[28%] md:top-[32%] transition-all duration-300 p-6 sm:p-8 rounded-2xl bg-cafe-bg/85 backdrop-blur-md border border-cafe-border/60 shadow-2xl"
            style={{
              opacity: getSceneOpacity(0.18, 0.38, scrollProgress),
              transform: `translateY(${(0.28 - scrollProgress) * 40}px)`,
              pointerEvents: scrollProgress >= 0.18 && scrollProgress <= 0.38 ? "auto" : "none",
            }}
          >
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2 font-semibold">
              01 / {isHi ? "स्रोत और भूनना" : "Origin & Roast"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-cafe-cream mb-2 sm:mb-4 leading-tight">
              {steps[1].titleEn && (isHi ? steps[1].titleHi : steps[1].titleEn)}
            </h2>
            <p className="text-cafe-parchment text-sm sm:text-base font-light leading-relaxed">
              {isHi ? steps[1].subtitleHi : steps[1].subtitleEn}
            </p>
          </div>

          {/* SCENE 3: Bakery Croissant - Safe on-screen right margin */}
          <div
            className="absolute right-4 sm:right-8 md:right-12 lg:right-16 w-[calc(100%-2rem)] sm:w-auto max-w-sm sm:max-w-md text-left sm:text-right top-[24%] sm:top-[28%] md:top-[32%] transition-all duration-300 p-6 sm:p-8 rounded-2xl bg-cafe-bg/85 backdrop-blur-md border border-cafe-border/60 shadow-2xl"
            style={{
              opacity: getSceneOpacity(0.38, 0.58, scrollProgress),
              transform: `translateY(${(0.48 - scrollProgress) * 40}px)`,
              pointerEvents: scrollProgress >= 0.38 && scrollProgress <= 0.58 ? "auto" : "none",
            }}
          >
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2 font-semibold">
              02 / {isHi ? "कारीगरी बेकरी" : "Artisanal Bakery"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-cafe-cream mb-2 sm:mb-4 leading-tight">
              {steps[2].titleEn && (isHi ? steps[2].titleHi : steps[2].titleEn)}
            </h2>
            <p className="text-cafe-parchment text-sm sm:text-base font-light leading-relaxed">
              {isHi ? steps[2].subtitleHi : steps[2].subtitleEn}
            </p>
          </div>

          {/* SCENE 4: Dessert - Safe on-screen left margin */}
          <div
            className="absolute left-4 sm:left-8 md:left-12 lg:left-16 w-[calc(100%-2rem)] sm:w-auto max-w-sm sm:max-w-md text-left top-[24%] sm:top-[28%] md:top-[32%] transition-all duration-300 p-6 sm:p-8 rounded-2xl bg-cafe-bg/85 backdrop-blur-md border border-cafe-border/60 shadow-2xl"
            style={{
              opacity: getSceneOpacity(0.58, 0.76, scrollProgress),
              transform: `translateY(${(0.67 - scrollProgress) * 40}px)`,
              pointerEvents: scrollProgress >= 0.58 && scrollProgress <= 0.76 ? "auto" : "none",
            }}
          >
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2 font-semibold">
              03 / {isHi ? "स्वादिष्ट पेस्ट्री" : "Gourmet Patisserie"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-cafe-cream mb-2 sm:mb-4 leading-tight">
              {steps[3].titleEn && (isHi ? steps[3].titleHi : steps[3].titleEn)}
            </h2>
            <p className="text-cafe-parchment text-sm sm:text-base font-light leading-relaxed">
              {isHi ? steps[3].subtitleHi : steps[3].subtitleEn}
            </p>
          </div>

          {/* SCENE 5: Symphony - Guaranteed horizontal center */}
          <div
            className="absolute left-0 right-0 mx-auto w-[92%] sm:w-full max-w-lg top-[22%] sm:top-[26%] flex flex-col items-center text-center transition-all duration-300 p-6 sm:p-8 rounded-2xl bg-cafe-bg/85 backdrop-blur-md border border-cafe-border/60 shadow-2xl"
            style={{
              opacity: getSceneOpacity(0.76, 0.88, scrollProgress),
              transform: `translateY(${(0.82 - scrollProgress) * 40}px)`,
              pointerEvents: scrollProgress >= 0.76 && scrollProgress <= 0.88 ? "auto" : "none",
            }}
          >
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-2 font-semibold">
              04 / {isHi ? "संगम" : "Symphony"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-cafe-cream mb-2 sm:mb-3">
              {steps[4].titleEn && (isHi ? steps[4].titleHi : steps[4].titleEn)}
            </h2>
            <p className="text-cafe-parchment text-sm sm:text-base font-light max-w-md mx-auto">
              {isHi ? steps[4].subtitleHi : steps[4].subtitleEn}
            </p>
          </div>

          {/* SCENE 6: Closing Invitation & Action CTAs - Guaranteed horizontal center in upper zone */}
          <div
            className="absolute left-0 right-0 mx-auto w-[92%] sm:w-full max-w-xl top-[10%] sm:top-[12%] md:top-[14%] flex flex-col items-center text-center transition-all duration-500 pointer-events-auto p-5 sm:p-7 rounded-3xl bg-cafe-bg/80 backdrop-blur-md border border-cafe-border/50 shadow-2xl"
            style={{
              opacity: getSceneOpacity(0.88, 1.0, scrollProgress),
              transform: `translateY(${(0.92 - Math.max(0.88, scrollProgress)) * 25}px)`,
              pointerEvents: scrollProgress >= 0.88 ? "auto" : "none",
            }}
          >
            <span className="text-cafe-caramel font-mono text-xs uppercase tracking-widest block mb-1.5 font-semibold">
              {isHi ? "पधारें" : "The Invitation"}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-cafe-cream mb-2 drop-shadow-md">
              {steps[5].titleEn && (isHi ? steps[5].titleHi : steps[5].titleEn)}
            </h2>
            <p className="text-cafe-parchment text-sm sm:text-base font-light max-w-md mx-auto mb-5 drop-shadow">
              {isHi ? steps[5].subtitleHi : steps[5].subtitleEn}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3 w-full">
              <a
                href={isHi ? "/hi/menu" : "/menu"}
                className="px-5 py-2.5 rounded-lg bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-cafe-caramel/25 min-h-[42px] flex items-center justify-center gap-2"
              >
                <Utensils className="w-4 h-4" />
                <span>{isHi ? "मेनू देखें" : "View Full Menu"}</span>
              </a>
              <a
                href={cafeConfig.ctaLinks.orderOnline}
                className="px-5 py-2.5 rounded-lg bg-cafe-surface hover:bg-cafe-surface-elevated text-cafe-cream border border-cafe-border hover:border-cafe-caramel font-semibold text-xs sm:text-sm transition-all min-h-[42px] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-cafe-caramel" />
                <span>{isHi ? "ऑनलाइन ऑर्डर" : "Order Online"}</span>
              </a>
              <a
                href={isHi ? "/hi/visit" : "/visit"}
                className="px-5 py-2.5 rounded-lg bg-transparent hover:bg-cafe-surface text-cafe-cream border border-cafe-border hover:border-cafe-parchment font-medium text-xs sm:text-sm transition-all min-h-[42px] flex items-center justify-center gap-2"
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
