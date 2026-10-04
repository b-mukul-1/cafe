import React from "react";
import { MenuItem } from "@/content/menu";
import { Star, Sparkles, Wheat } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
  locale?: "en" | "hi";
}

export function MenuItemCard({ item, locale = "en" }: MenuItemCardProps) {
  const isHi = locale === "hi";

  return (
    <article className="group relative p-6 rounded-2xl bg-cafe-surface border border-cafe-border hover:border-cafe-border-medium transition-all duration-300 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between">
      <div>
        {/* Header row: Veg/Non-veg indicator and badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {/* Standard Veg / Non-Veg Marker */}
            <div
              className={`w-5 h-5 rounded-sm border flex items-center justify-center p-0.5 ${
                item.isVegetarian
                  ? "border-[#2E7D32]"
                  : "border-[#C62828]"
              }`}
              title={item.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
              aria-label={item.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  item.isVegetarian ? "bg-[#2E7D32]" : "bg-[#C62828]"
                }`}
              />
            </div>

            {item.isSignature && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cafe-caramel/15 border border-cafe-caramel/30 text-cafe-caramel text-[10px] font-bold uppercase tracking-wider">
                <Star className="w-2.5 h-2.5 fill-cafe-caramel" />
                <span>{isHi ? "सिग्नेचर" : "Signature"}</span>
              </span>
            )}

            {item.isChefSpecial && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cafe-gold/15 border border-cafe-gold/30 text-cafe-gold text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-2.5 h-2.5" />
                <span>{isHi ? "शेफ स्पेशल" : "Chef's Special"}</span>
              </span>
            )}
          </div>

          {/* Dietary tags */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-cafe-muted">
            {item.isVegan && <span className="bg-cafe-surface-elevated px-2 py-0.5 rounded">Vegan</span>}
            {item.isGlutenFree && <span className="bg-cafe-surface-elevated px-2 py-0.5 rounded">GF</span>}
          </div>
        </div>

        {/* Item Title */}
        <h3 className="text-xl font-serif font-bold text-cafe-cream group-hover:text-cafe-caramel transition-colors mb-2">
          {isHi ? item.nameHi : item.nameEn}
        </h3>

        {/* Item Description */}
        <p className="text-sm text-cafe-parchment font-light leading-relaxed mb-4">
          {isHi ? item.descriptionHi : item.descriptionEn}
        </p>

        {/* Allergens Notice if any */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="text-[11px] text-cafe-muted mb-4 flex items-center gap-1">
            <Wheat className="w-3 h-3 text-cafe-muted" />
            <span>Contains: {item.allergens.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Footer: Price and subtle order hint */}
      <div className="pt-4 border-t border-cafe-border/50 flex items-center justify-between mt-auto">
        <span className="text-xl font-serif font-bold text-cafe-caramel">
          {item.priceFormatted}
        </span>
        <span className="text-xs text-cafe-muted group-hover:text-cafe-parchment transition-colors font-medium">
          {isHi ? "ऑर्डर के लिए उपलब्ध" : "Available to order"}
        </span>
      </div>
    </article>
  );
}
