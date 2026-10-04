import { menuCategories } from "@/content/menu";
import { getSiteUrl } from "@/config/cafe.config";

export function generateMenuSchema(locale: "en" | "hi" = "en") {
  const siteUrl = getSiteUrl();
  const isHi = locale === "hi";

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/menu/#menu`,
    name: isHi ? "A2 कैफे मेनू" : "A2 Cafe Artisanal Menu",
    description: isHi
      ? "कारीगरी कॉफ़ी, हस्तनिर्मित ब्रियोश बर्गर और ताज़ी पेस्ट्री।"
      : "Specialty coffees, handcrafted brioche burgers, all-day breakfasts, and small-batch patisserie.",
    hasMenuSection: menuCategories.map((section) => ({
      "@type": "MenuSection",
      name: isHi ? section.titleHi : section.titleEn,
      description: isHi ? section.descriptionHi : section.descriptionEn,
      hasMenuItem: section.items.map((item) => {
        const itemSchema: Record<string, unknown> = {
          "@type": "MenuItem",
          name: isHi ? item.nameHi : item.nameEn,
          description: isHi ? item.descriptionHi : item.descriptionEn,
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "INR",
          },
        };

        if (item.isVegetarian) {
          itemSchema.suitableForDiet = "https://schema.org/VegetarianDiet";
        }
        if (item.isVegan) {
          itemSchema.suitableForDiet = "https://schema.org/VeganDiet";
        }
        if (item.isGlutenFree) {
          itemSchema.suitableForDiet = "https://schema.org/GlutenFreeDiet";
        }

        return itemSchema;
      }),
    })),
  };
}
