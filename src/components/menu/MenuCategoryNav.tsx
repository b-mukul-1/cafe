"use client";

import React from "react";
import { MenuCategory } from "@/content/menu";

interface MenuCategoryNavProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  filterVegOnly: boolean;
  onToggleVegOnly: () => void;
  filterSignatureOnly: boolean;
  onToggleSignatureOnly: () => void;
  locale?: "en" | "hi";
}

export function MenuCategoryNav({
  categories,
  activeCategory,
  onSelectCategory,
  filterVegOnly,
  onToggleVegOnly,
  filterSignatureOnly,
  onToggleSignatureOnly,
  locale = "en",
}: MenuCategoryNavProps) {
  const isHi = locale === "hi";

  return (
    <div className="sticky top-20 z-30 bg-cafe-bg/95 backdrop-blur-md border-y border-cafe-border py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills (horizontal scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[38px] ${
              activeCategory === "all"
                ? "bg-cafe-caramel text-cafe-bg shadow-sm"
                : "bg-cafe-surface hover:bg-cafe-surface-elevated text-cafe-parchment border border-cafe-border"
            }`}
          >
            {isHi ? "संपूर्ण मेनू" : "All Categories"}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[38px] ${
                activeCategory === cat.id
                  ? "bg-cafe-caramel text-cafe-bg shadow-sm"
                  : "bg-cafe-surface hover:bg-cafe-surface-elevated text-cafe-parchment border border-cafe-border"
              }`}
            >
              {isHi ? cat.titleHi : cat.titleEn}
            </button>
          ))}
        </div>

        {/* Dietary Filter Toggles */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleVegOnly}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border min-h-[36px] ${
              filterVegOnly
                ? "bg-[#2E7D32]/20 border-[#2E7D32] text-green-400"
                : "bg-cafe-surface border-cafe-border text-cafe-muted hover:text-cafe-cream"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
            <span>{isHi ? "केवल शाकाहारी" : "Veg Only"}</span>
          </button>

          <button
            type="button"
            onClick={onToggleSignatureOnly}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border min-h-[36px] ${
              filterSignatureOnly
                ? "bg-cafe-caramel/20 border-cafe-caramel text-cafe-caramel"
                : "bg-cafe-surface border-cafe-border text-cafe-muted hover:text-cafe-cream"
            }`}
          >
            <span>★</span>
            <span>{isHi ? "सिग्नेचर" : "Signatures"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
