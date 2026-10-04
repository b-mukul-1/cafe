import fs from "fs";
import path from "path";
import { cafeConfig, getSiteUrl } from "../src/config/cafe.config";
import { menuCategories } from "../src/content/menu";

const publicDir = path.resolve(process.cwd(), "public");
const siteUrl = getSiteUrl();

// 1. Generate robots.txt
function generateRobotsTxt(): string {
  const lines: string[] = [];

  // Default User-agent
  lines.push("User-agent: *");
  lines.push("Allow: /");
  lines.push("Disallow: /order/");
  lines.push("Disallow: /dashboard/");
  lines.push("Disallow: /api/");
  lines.push("");

  // AI Crawlers configuration
  if (cafeConfig.aiCrawlers.allowAll) {
    for (const agent of cafeConfig.aiCrawlers.userAgents) {
      lines.push(`User-agent: ${agent}`);
      lines.push("Allow: /");
      lines.push("");
    }
  } else {
    for (const agent of cafeConfig.aiCrawlers.userAgents) {
      lines.push(`User-agent: ${agent}`);
      lines.push("Disallow: /");
      lines.push("");
    }
  }

  lines.push(`Sitemap: ${siteUrl}/sitemap.xml`);
  return lines.join("\n");
}

// 2. Generate sitemap.xml
function generateSitemapXml(): string {
  const routes = [
    { path: "", changefreq: "weekly", priority: "1.0" },
    { path: "menu/", changefreq: "weekly", priority: "0.9" },
    { path: "about/", changefreq: "monthly", priority: "0.8" },
    { path: "visit/", changefreq: "weekly", priority: "0.9" },
    { path: "faq/", changefreq: "monthly", priority: "0.7" },
    { path: "privacy/", changefreq: "yearly", priority: "0.3" },
    { path: "terms/", changefreq: "yearly", priority: "0.3" },
    { path: "hi/", changefreq: "weekly", priority: "0.9" },
    { path: "hi/menu/", changefreq: "weekly", priority: "0.85" },
    { path: "hi/about/", changefreq: "monthly", priority: "0.75" },
    { path: "hi/visit/", changefreq: "weekly", priority: "0.85" },
    { path: "hi/faq/", changefreq: "monthly", priority: "0.65" },
  ];

  const now = new Date().toISOString().split("T")[0];

  const xmlEntries = routes
    .map(
      (r) => `  <url>
    <loc>${siteUrl}/${r.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries}
</urlset>`;
}

// 3. Generate llms.txt (Generative Engine Optimization - GEO)
function generateLlmsTxt(): string {
  const totalItems = menuCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  const categoriesList = menuCategories.map((c) => `- ${c.titleEn}: ${c.descriptionEn}`).join("\n");

  return `# ${cafeConfig.brand.name}
> ${cafeConfig.brand.tagline}

## Overview
${cafeConfig.brand.shortDescription}
Established: ${cafeConfig.brand.establishedYear}
Cuisine & Specialties: ${cafeConfig.details.servesCuisine.join(", ")}
Price Range: ${cafeConfig.details.priceRange} (${cafeConfig.details.priceRangeDescription})

## Location & Contact
- Street Address: ${cafeConfig.contact.address.fullDisplay}
- Locality / City: ${cafeConfig.contact.address.addressLocality}, ${cafeConfig.contact.address.addressRegion} ${cafeConfig.contact.address.postalCode}
- Geographic Coordinates: Latitude ${cafeConfig.contact.geo.latitude}, Longitude ${cafeConfig.contact.geo.longitude}
- Phone: ${cafeConfig.contact.phoneFormatted}
- Email: ${cafeConfig.contact.email}
- Transit & Access: ${cafeConfig.contact.transitDetails}
- Parking: ${cafeConfig.contact.parkingDetails}

## Operating Hours
${cafeConfig.openingHours.map((h) => `- ${h.formattedEn}`).join("\n")}

## Menu & Offerings
Total Curated Menu Items: ${totalItems}
Categories:
${categoriesList}

Dietary Standards:
- Over 80% vegetarian menu items with dedicated separate cookware
- Plant-based milks available for all coffee beverages (oat, almond, soy)
- Gluten-free, nut-free, and vegan dietary flags indicated on every menu item

## Key URLs
- Home: ${siteUrl}/
- Menu: ${siteUrl}/menu/
- Our Story: ${siteUrl}/about/
- Visit & Directions: ${siteUrl}/visit/
- FAQ: ${siteUrl}/faq/
- Hindi Version: ${siteUrl}/hi/
`;
}

fs.writeFileSync(path.join(publicDir, "robots.txt"), generateRobotsTxt());
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), generateSitemapXml());
fs.writeFileSync(path.join(publicDir, "llms.txt"), generateLlmsTxt());

console.log("✓ Generated public/robots.txt, public/sitemap.xml, and public/llms.txt");
