"use client";

import React, { useState, useEffect } from "react";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { ShieldCheck } from "lucide-react";

interface CookieConsentProps {
  locale?: "en" | "hi";
}

export function CookieConsent({ locale = "en" }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const copy = locale === "hi" ? copyHi : copyEn;

  useEffect(() => {
    // Only display if analytics is active and consent is required
    if (cafeConfig.analytics.provider === "none" || !cafeConfig.analytics.requireConsent) {
      return;
    }

    const consentGiven = localStorage.getItem("a2_cafe_cookie_consent");
    if (!consentGiven) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("a2_cafe_cookie_consent", "granted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("a2_cafe_cookie_consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-16 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-4 rounded-xl bg-cafe-surface border border-cafe-border shadow-2xl animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cafe-caramel shrink-0 mt-0.5" />
        <div className="space-y-3">
          <p className="text-xs text-cafe-parchment leading-relaxed">
            {copy.cookies.message}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="px-3.5 py-1.5 rounded-lg bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg text-xs font-semibold transition-all min-h-[36px]"
            >
              {copy.cookies.accept}
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="px-3.5 py-1.5 rounded-lg border border-cafe-border hover:border-cafe-parchment text-cafe-cream text-xs font-medium transition-all min-h-[36px]"
            >
              {copy.cookies.decline}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
