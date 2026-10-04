"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { Menu as MenuIcon, X, Globe, ShoppingBag, ArrowRight } from "lucide-react";

interface HeaderProps {
  locale?: "en" | "hi";
}

export function Header({ locale = "en" }: HeaderProps) {
  const pathname = usePathname() || "/";
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute language toggle target URL
  const getToggleUrl = () => {
    if (isHi) {
      // Remove /hi or /hi/ prefix
      const target = pathname.replace(/^\/hi(\/|$)/, "/");
      return target.startsWith("/") ? target : `/${target}`;
    } else {
      // Prepend /hi
      return pathname === "/" ? "/hi/" : `/hi${pathname.startsWith("/") ? "" : "/"}${pathname}`;
    }
  };

  const navLinks = [
    { label: copy.nav.home, href: isHi ? "/hi/" : "/" },
    { label: copy.nav.menu, href: isHi ? "/hi/menu/" : "/menu/" },
    { label: copy.nav.about, href: isHi ? "/hi/about/" : "/about/" },
    { label: copy.nav.visit, href: isHi ? "/hi/visit/" : "/visit/" },
    { label: copy.nav.faq, href: isHi ? "/hi/faq/" : "/faq/" },
  ];

  return (
    <>
      {/* Accessible skip link */}
      <a href="#main-content" className="skip-to-content">
        {copy.nav.skipToContent}
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cafe-bg/90 backdrop-blur-md border-b border-cafe-border/80 shadow-lg py-3"
            : "bg-gradient-to-b from-cafe-bg/90 via-cafe-bg/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href={isHi ? "/hi/" : "/"}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cafe-caramel"
            aria-label={`${cafeConfig.brand.name} - Home`}
          >
            <div className="relative w-36 sm:w-44 h-10">
              <Image
                src="/images/logo-light.svg"
                alt={cafeConfig.brand.logo.alt}
                fill
                priority
                className="object-contain object-left transition-transform group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide font-medium transition-colors hover:text-cafe-caramel ${
                    isActive ? "text-cafe-caramel font-semibold" : "text-cafe-cream/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Language Switch */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switch */}
            <Link
              href={getToggleUrl()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cafe-border hover:border-cafe-caramel text-xs font-semibold text-cafe-cream tracking-wide transition-all min-h-[38px]"
              aria-label={`Switch to ${isHi ? "English" : "Hindi"}`}
            >
              <Globe className="w-3.5 h-3.5 text-cafe-caramel" />
              <span>{copy.nav.languageSwitch}</span>
            </Link>

            {/* Order Online CTA */}
            <a
              href={cafeConfig.ctaLinks.orderOnline}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-cafe-caramel/25 min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{copy.nav.orderNow}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href={getToggleUrl()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-cafe-border text-xs font-semibold text-cafe-cream"
              aria-label={`Switch to ${isHi ? "English" : "Hindi"}`}
            >
              <Globe className="w-3 h-3 text-cafe-caramel" />
              <span>{isHi ? "EN" : "HI"}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-cafe-cream hover:bg-cafe-surface border border-transparent hover:border-cafe-border min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-cafe-bg/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif text-cafe-cream hover:text-cafe-caramel transition-colors flex items-center justify-between py-2 border-b border-cafe-border/40"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-5 h-5 text-cafe-caramel" />
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={cafeConfig.ctaLinks.orderOnline}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 rounded-xl bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg font-bold text-center flex items-center justify-center gap-2 shadow-lg min-h-[48px]"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{copy.nav.orderNow}</span>
            </a>

            <a
              href={cafeConfig.ctaLinks.callNow}
              className="w-full py-3.5 rounded-xl border border-cafe-border hover:border-cafe-caramel text-cafe-cream font-medium text-center min-h-[48px] flex items-center justify-center"
            >
              {cafeConfig.contact.phoneFormatted}
            </a>
          </div>

          <div className="mt-auto pt-6 text-center text-xs text-cafe-muted">
            <p>{cafeConfig.contact.address.fullDisplay}</p>
          </div>
        </div>
      )}
    </>
  );
}
