"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cafeConfig } from "@/config/cafe.config";
import { copyEn } from "@/content/copy.en";
import { copyHi } from "@/content/copy.hi";
import { menuCategories } from "@/content/menu";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { MenuCategoryNav } from "@/components/menu/MenuCategoryNav";
import { JsonLd } from "@/components/common/JsonLd";
import { generateMenuSchema } from "@/lib/schema/menuSchema";
import { generateBreadcrumbSchema } from "@/lib/schema/breadcrumbSchema";
import { ChevronRight, Sparkles, AlertCircle } from "lucide-react";

interface MenuPageProps {
  locale?: "en" | "hi";
}

export function MenuPage({ locale = "en" }: MenuPageProps) {
  const isHi = locale === "hi";
  const copy = isHi ? copyHi : copyEn;

  const [activeCategory, setActiveCategory] = useState("all");
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterSignatureOnly, setFilterSignatureOnly] = useState(false);

  // Filter logic
  const filteredCategories = menuCategories
    .filter((cat) => (activeCategory === "all" ? true : cat.id === activeCategory))
    .map((cat) => {
      const items = cat.items.filter((item) => {
        if (filterVegOnly && !item.isVegetarian) return false;
        if (filterSignatureOnly && !item.isSignature) return false;
        return true;
      });
      return { ...cat, items };
    })
    .filter((cat) => cat.items.length > 0);

  const menuSchema = generateMenuSchema(locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isHi ? "मुख्य पृष्ठ" : "Home", url: isHi ? "/hi/" : "/" },
    { name: isHi ? "मेनू" : "Menu", url: isHi ? "/hi/menu/" : "/menu/" },
  ]);

  return (
    <div className="w-full bg-cafe-bg min-h-screen pt-28 pb-24">
      <JsonLd data={[menuSchema, breadcrumbSchema]} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <ol className="flex items-center gap-2 text-xs text-cafe-muted">
          <li>
            <Link href={isHi ? "/hi/" : "/"} className="hover:text-cafe-caramel transition-colors">
              {isHi ? "मुख्य पृष्ठ" : "Home"}
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5" />
          </li>
          <li className="text-cafe-parchment font-medium" aria-current="page">
            {isHi ? "मेनू" : "Menu"}
          </li>
        </ol>
      </nav>

      {/* Page Header (Contains exactly one H1) */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-cafe-caramel/10 border border-cafe-caramel/25 text-cafe-caramel text-xs tracking-wider uppercase font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isHi ? "ताज़ा सामग्री और धीमी कारीगरी" : "Scratch Crafted Daily"}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-cafe-cream tracking-tight mb-4">
          {copy.menuPage.title}
        </h1>
        <p className="text-base sm:text-lg text-cafe-parchment max-w-2xl mx-auto font-light leading-relaxed">
          {copy.menuPage.subtitle}
        </p>

        {/* Dietary note notice */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cafe-surface border border-cafe-border text-xs text-cafe-muted">
          <AlertCircle className="w-4 h-4 text-cafe-caramel shrink-0" />
          <span>{copy.menuPage.allergenNotice}</span>
        </div>
      </header>

      {/* Category Navigation & Dietary Filters */}
      <MenuCategoryNav
        categories={menuCategories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        filterVegOnly={filterVegOnly}
        onToggleVegOnly={() => setFilterVegOnly(!filterVegOnly)}
        filterSignatureOnly={filterSignatureOnly}
        onToggleSignatureOnly={() => setFilterSignatureOnly(!filterSignatureOnly)}
        locale={locale}
      />

      {/* Menu Categories and Cards Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {filteredCategories.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-cafe-parchment text-lg">
              {isHi ? "चयनित फिल्टर के लिए कोई व्यंजन नहीं मिला।" : "No items match your selected filters."}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setFilterVegOnly(false);
                setFilterSignatureOnly(false);
              }}
              className="mt-4 px-6 py-2.5 rounded-lg bg-cafe-caramel text-cafe-bg font-semibold text-sm"
            >
              {isHi ? "सभी फ़िल्टर साफ़ करें" : "Reset All Filters"}
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-40">
              <div className="mb-8 border-b border-cafe-border pb-4">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-cafe-cream mb-2">
                  {isHi ? category.titleHi : category.titleEn}
                </h2>
                <p className="text-sm text-cafe-parchment/80 font-light">
                  {isHi ? category.descriptionHi : category.descriptionEn}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}
