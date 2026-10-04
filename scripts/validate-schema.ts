import { generateCafeSchema, generateWebSiteSchema } from "../src/lib/schema/cafeSchema";
import { generateMenuSchema } from "../src/lib/schema/menuSchema";
import { generateFaqSchema } from "../src/lib/schema/faqSchema";
import { generateBreadcrumbSchema } from "../src/lib/schema/breadcrumbSchema";

console.log("\n=======================================================");
console.log("   A2 CAFE: STRUCTURED DATA (JSON-LD) VALIDATION CHECK ");
console.log("=======================================================\n");

let errors = 0;

// 1. Cafe Schema Check
try {
  const cafe = generateCafeSchema("en");
  if (cafe["@context"] !== "https://schema.org") throw new Error("Invalid @context");
  if (cafe["@type"] !== "CafeOrCoffeeShop") throw new Error("Invalid @type for Cafe");
  if (!cafe.name || !cafe.telephone) throw new Error("Missing NAP requirements");
  console.log("✓ [PASS] CafeOrCoffeeShop Schema verified.");
} catch (err) {
  errors++;
  console.error("❌ [FAIL] CafeOrCoffeeShop Schema error:", err);
}

// 2. WebSite Schema Check
try {
  const webSite = generateWebSiteSchema();
  if (webSite["@type"] !== "WebSite") throw new Error("Invalid WebSite schema");
  console.log("✓ [PASS] WebSite Schema verified.");
} catch (err) {
  errors++;
  console.error("❌ [FAIL] WebSite Schema error:", err);
}

// 3. Menu Schema Check
try {
  const menu = generateMenuSchema("en");
  if (menu["@type"] !== "Menu") throw new Error("Invalid Menu schema");
  if (!Array.isArray(menu.hasMenuSection) || menu.hasMenuSection.length === 0) {
    throw new Error("Menu contains no MenuSection entries");
  }
  console.log(`✓ [PASS] Menu Schema verified (${menu.hasMenuSection.length} sections).`);
} catch (err) {
  errors++;
  console.error("❌ [FAIL] Menu Schema error:", err);
}

// 4. FAQ Schema Check
try {
  const faq = generateFaqSchema("en");
  if (faq["@type"] !== "FAQPage") throw new Error("Invalid FAQPage schema");
  if (!Array.isArray(faq.mainEntity) || faq.mainEntity.length === 0) {
    throw new Error("FAQ contains no question entities");
  }
  console.log(`✓ [PASS] FAQPage Schema verified (${faq.mainEntity.length} questions).`);
} catch (err) {
  errors++;
  console.error("❌ [FAIL] FAQPage Schema error:", err);
}

// 5. Breadcrumb Schema Check
try {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Menu", url: "/menu/" },
  ]);
  if (breadcrumb["@type"] !== "BreadcrumbList") throw new Error("Invalid BreadcrumbList");
  console.log("✓ [PASS] BreadcrumbList Schema verified.");
} catch (err) {
  errors++;
  console.error("❌ [FAIL] BreadcrumbList Schema error:", err);
}

console.log("\n-------------------------------------------------------");
if (errors > 0) {
  console.error(`❌ Structured data validation failed with ${errors} error(s).\n`);
  process.exit(1);
} else {
  console.log("✓ All JSON-LD structured schemas are compliant with Schema.org standards!\n");
}
