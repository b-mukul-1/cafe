import { cafeConfig, getSiteUrl } from "@/config/cafe.config";

export function generateCafeSchema(locale: "en" | "hi" = "en") {
  const siteUrl = getSiteUrl();

  const openingHoursSpec = cafeConfig.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.dayOfWeek,
    opens: h.opens,
    closes: h.closes,
  }));

  const sameAsLinks = [
    cafeConfig.contact.googleBusinessUrl,
    cafeConfig.socialLinks.instagram,
    cafeConfig.socialLinks.facebook,
    cafeConfig.socialLinks.twitter,
    cafeConfig.socialLinks.youtube,
  ].filter((url): url is string => Boolean(url && !url.startsWith("[[")));

  // Base Cafe Schema
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${siteUrl}/#cafe`,
    name: cafeConfig.brand.name,
    legalName: cafeConfig.brand.legalName,
    description: locale === "hi" ? cafeConfig.brand.shortDescriptionHi : cafeConfig.brand.shortDescription,
    url: siteUrl,
    telephone: cafeConfig.contact.phone,
    email: cafeConfig.contact.email,
    image: `${siteUrl}${cafeConfig.seo.ogImage}`,
    logo: `${siteUrl}${cafeConfig.brand.logo.light}`,
    priceRange: cafeConfig.details.priceRange,
    servesCuisine: cafeConfig.details.servesCuisine,
    hasMenu: `${siteUrl}/menu/`,
    menu: `${siteUrl}/menu/`,
    areaServed: {
      "@type": "AdministrativeArea",
      name: cafeConfig.details.areaServed,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: cafeConfig.contact.address.streetAddress,
      addressLocality: cafeConfig.contact.address.addressLocality,
      addressRegion: cafeConfig.contact.address.addressRegion,
      postalCode: cafeConfig.contact.address.postalCode,
      addressCountry: cafeConfig.contact.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: cafeConfig.contact.geo.latitude,
      longitude: cafeConfig.contact.geo.longitude,
    },
    openingHoursSpecification: openingHoursSpec,
    sameAs: sameAsLinks,
  };

  // Only include ratings if real reviews exist in config. NEVER fabricate.
  if (cafeConfig.reviews.hasRealRatings && cafeConfig.reviews.ratingValue && cafeConfig.reviews.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: cafeConfig.reviews.ratingValue,
      reviewCount: cafeConfig.reviews.reviewCount,
    };
  }

  return schema;
}

export function generateWebSiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: cafeConfig.brand.name,
    description: cafeConfig.brand.tagline,
    publisher: {
      "@id": `${siteUrl}/#cafe`,
    },
    inLanguage: ["en", "hi"],
  };
}
