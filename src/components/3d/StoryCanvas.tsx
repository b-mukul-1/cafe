"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { SceneContent } from "./SceneContent";
import { Fallback2D } from "./Fallback2D";

interface StoryCanvasProps {
  progress: number;
  locale?: "en" | "hi";
}

// Client-safe capability detection
function checkIsFallback(): boolean {
  if (typeof window === "undefined") return false;

  // 1. Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return true;

  // 2. Check save-data mode
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return true;

  // 3. Check WebGL support
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return true;
  } catch {
    return true;
  }

  // 4. Check low-end device heuristics (hardwareConcurrency <= 2 or deviceMemory <= 2)
  const navHardware = navigator as Navigator & { deviceMemory?: number };
  if (navHardware.deviceMemory && navHardware.deviceMemory <= 2) return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;

  return false;
}

export function StoryCanvas({ progress, locale = "en" }: StoryCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [posterFaded, setPosterFaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const fallback = checkIsFallback();
    setIsFallback(fallback);

    // Pause rendering when tab is hidden
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && !document.hidden);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  // Compute mobile-capped DPR
  const dpr = typeof window !== "undefined"
    ? window.innerWidth < 768
      ? Math.min(window.devicePixelRatio, 1.5)
      : Math.min(window.devicePixelRatio, 2.0)
    : 1;

  if (mounted && isFallback) {
    return <Fallback2D progress={progress} locale={locale} />;
  }

  return (
    <div ref={containerRef} className="story-stage-container w-full h-full relative overflow-hidden bg-cafe-bg">
      {/* 1. Instant LCP Hero Poster (Zero layout shift, server-rendered/pre-rendered) */}
      {!posterFaded && (
        <div className={`story-poster ${canvasReady ? "faded-out" : ""}`}>
          <Image
            src="/images/hero-poster.webp"
            alt="A2 Cafe Artisanal Brew"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* 2. Three.js Canvas Layer with seamless opacity fade-in */}
      <div className={`story-canvas-layer ${canvasReady ? "canvas-active" : ""}`}>
        {mounted && (
          <Canvas
            dpr={dpr}
            frameloop={isVisible ? "always" : "never"}
            gl={{
              powerPreference: "high-performance",
              antialias: true,
              alpha: true,
              stencil: false,
              depth: true,
            }}
            camera={{ position: [0, 1.2, 4.2], fov: 45 }}
            onCreated={() => {
              // Ensure first WebGL frame is rendered before triggering crossfade
              requestAnimationFrame(() => {
                setCanvasReady(true);
                setTimeout(() => {
                  setPosterFaded(true);
                }, 850);
              });
            }}
          >
            <SceneContent progress={progress} />
          </Canvas>
        )}
      </div>
    </div>
  );
}
