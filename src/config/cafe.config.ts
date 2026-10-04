import { z } from "zod";

/**
 * Single source of truth for site URL.
 * Never hardcode domain: reads from SITE_URL environment variable.
 */
export const getSiteUrl = (): string => {
  const url = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://a2cafe.example.com";
  return url.replace(/\/+$/, "");
};

/**
 * Zod schema defining the complete structure of any cafe configured with this template.
 */
export const CafeConfigSchema = z.object({
  brand: z.object({
    name: z.string().min(1),
    legalName: z.string().min(1),
    tagline: z.string().min(1),
    taglineHi: z.string().min(1),
    shortDescription: z.string().min(1),
    shortDescriptionHi: z.string().min(1),
    establishedYear: z.number().int().min(1900).max(2100),
    logo: z.object({
      light: z.string(),
      dark: z.string(),
      alt: z.string(),
      width: z.number().int(),
      height: z.number().int(),
    }),
    colors: z.object({
      bgPrimary: z.string(),
      bgSurface: z.string(),
      bgSurfaceElevated: z.string(),
      borderSubtle: z.string(),
      borderMedium: z.string(),
      textPrimary: z.string(),
      textSecondary: z.string(),
      textMuted: z.string(),
      accentPrimary: z.string(),
      accentHover: z.string(),
      accentLight: z.string(),
      vegBadge: z.string(),
      nonvegBadge: z.string(),
    }),
    fonts: z.object({
      displaySerif: z.string(),
      sansBody: z.string(),
      devanagariSerif: z.string(),
    }),
  }),
  contact: z.object({
    address: z.object({
      streetAddress: z.string(),
      addressLocality: z.string(),
      addressRegion: z.string(),
      postalCode: z.string(),
      addressCountry: z.string(),
      fullDisplay: z.string(),
      fullDisplayHi: z.string(),
    }),
    geo: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    phone: z.string(),
    phoneFormatted: z.string(),
    whatsappNumber: z.string(),
    whatsappMessage: z.string(),
    email: z.string().refine((val) => val.startsWith("[[") || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Must be a valid email or [[PLACEHOLDER]]",
    }),
    googleBusinessUrl: z.string(),
    googleMapsDirectionsUrl: z.string(),
    googleMapsEmbedUrl: z.string(),
    parkingDetails: z.string(),
    parkingDetailsHi: z.string(),
    transitDetails: z.string(),
    transitDetailsHi: z.string(),
  }),
  openingHours: z.array(
    z.object({
      dayOfWeek: z.array(z.string()),
      opens: z.string(),
      closes: z.string(),
      formattedEn: z.string(),
      formattedHi: z.string(),
    })
  ),
  details: z.object({
    priceRange: z.string(),
    priceRangeDescription: z.string(),
    priceRangeDescriptionHi: z.string(),
    servesCuisine: z.array(z.string()),
    areaServed: z.string(),
    paymentAccepted: z.array(z.string()),
    hasWifi: z.boolean(),
    hasOutdoorSeating: z.boolean(),
    isPetFriendly: z.boolean(),
  }),
  socialLinks: z.object({
    instagram: z.string().refine((val) => val === "" || val.startsWith("[[") || /^https?:\/\//.test(val), {
      message: "Must be a valid URL, empty, or [[PLACEHOLDER]]",
    }),
    facebook: z.string().refine((val) => val === "" || val.startsWith("[[") || /^https?:\/\//.test(val), {
      message: "Must be a valid URL, empty, or [[PLACEHOLDER]]",
    }),
    twitter: z.string().refine((val) => val === "" || val.startsWith("[[") || /^https?:\/\//.test(val), {
      message: "Must be a valid URL, empty, or [[PLACEHOLDER]]",
    }),
    youtube: z.string().refine((val) => val === "" || val.startsWith("[[") || /^https?:\/\//.test(val), {
      message: "Must be a valid URL, empty, or [[PLACEHOLDER]]",
    }),
  }),
  ctaLinks: z.object({
    orderOnline: z.string(),
    viewMenu: z.string(),
    visitUs: z.string(),
    callNow: z.string(),
    reserveTable: z.string(),
    getDirections: z.string(),
  }),
  scene3D: z.object({
    enabled: z.boolean(),
    scrollDurationVh: z.number().int().min(200).max(1000),
    steps: z.array(
      z.object({
        id: z.string(),
        titleEn: z.string(),
        titleHi: z.string(),
        subtitleEn: z.string(),
        subtitleHi: z.string(),
        scrollProgressStart: z.number().min(0).max(1),
        scrollProgressEnd: z.number().min(0).max(1),
        cameraPosition: z.tuple([z.number(), z.number(), z.number()]),
        cameraLookAt: z.tuple([z.number(), z.number(), z.number()]),
        bgColor: z.string(),
      })
    ),
    models: z.object({
      cupPath: z.string(),
      beansPath: z.string(),
      burgerPath: z.string(),
      dessertPath: z.string(),
    }),
  }),
  seo: z.object({
    defaultTitleEn: z.string().max(65),
    defaultTitleHi: z.string().max(75),
    titleTemplate: z.string(),
    defaultDescriptionEn: z.string().max(160),
    defaultDescriptionHi: z.string().max(170),
    ogImage: z.string(),
    twitterCard: z.enum(["summary", "summary_large_image"]),
    twitterHandle: z.string().optional(),
    keywords: z.array(z.string()),
  }),
  aiCrawlers: z.object({
    allowAll: z.boolean(),
    userAgents: z.array(z.string()),
  }),
  analytics: z.object({
    provider: z.enum(["none", "plausible", "ga4"]),
    domainOrId: z.string().optional(),
    requireConsent: z.boolean(),
  }),
  reviews: z.object({
    hasRealRatings: z.boolean(),
    ratingValue: z.number().optional(),
    reviewCount: z.number().int().optional(),
    items: z.array(
      z.object({
        author: z.string(),
        rating: z.number(),
        datePublished: z.string(),
        reviewBody: z.string(),
        reviewBodyHi: z.string(),
      })
    ),
  }),
});

export type CafeConfig = z.infer<typeof CafeConfigSchema>;

/**
 * ACTIVE CAFE CONFIGURATION
 * Note: Real cafe details that must be supplied by the cafe owner use clearly marked placeholders [[...]].
 * NEVER invent addresses, phone numbers, ratings, reviews, or awards.
 */
export const cafeConfig: CafeConfig = CafeConfigSchema.parse({
  brand: {
    name: "A2 Cafe",
    legalName: "A2 Cafe & Roastery",
    tagline: "Artisanal Coffee & Handcrafted Culinary Moments",
    taglineHi: "दस्तकारी कॉफ़ी और हस्तनिर्मित स्वादिष्ट अनुभव",
    shortDescription: "A premier artisanal cafe blending specialty pour-overs, handcrafted brioche burgers, and small-batch patisserie in an intimate, modern espresso lounge.",
    shortDescriptionHi: "एक प्रमुख विशेष कैफे जो हस्तनिर्मित पोर-ओवर, कारीगरी ब्रियोश बर्गर और ताज़ी पेस्ट्री को एक शांत, आधुनिक वातावरण में प्रस्तुत करता है।",
    establishedYear: 2024,
    logo: {
      light: "/images/logo-light.svg",
      dark: "/images/logo-dark.svg",
      alt: "A2 Cafe Emblem",
      width: 160,
      height: 48,
    },
    colors: {
      bgPrimary: "#1A120B",         // Deep Mocha Luxe Espresso
      bgSurface: "#2B1B14",         // Warm Dark Roast Surface
      bgSurfaceElevated: "#3D2B1F", // Elevated Card Container Roast
      borderSubtle: "#3F2F23",      // Subtle Roast Border
      borderMedium: "#5C3D2E",      // Distinct Border Line
      textPrimary: "#FAF5EE",       // Steamed Latte Cream
      textSecondary: "#F5EBD8",     // Warm Oat Parchment
      textMuted: "#A39282",         // Roasted Crema Grey
      accentPrimary: "#C9913A",     // Rich Warm Caramel
      accentHover: "#DBA94F",       // Golden Caramel Amber
      accentLight: "#B8975C",       // Antique Gold Sheen
      vegBadge: "#2E7D32",          // Fresh Farm Herb Green
      nonvegBadge: "#C62828",       // Classic Terracotta Crust
    },
    fonts: {
      displaySerif: "Playfair Display",
      sansBody: "Plus Jakarta Sans",
      devanagariSerif: "Noto Serif Devanagari",
    },
  },
  contact: {
    address: {
      streetAddress: "[[A2_STREET_ADDRESS]]",
      addressLocality: "[[A2_CITY]]",
      addressRegion: "[[A2_STATE]]",
      postalCode: "[[A2_POSTAL_CODE]]",
      addressCountry: "IN",
      fullDisplay: "[[A2_FULL_ADDRESS]]",
      fullDisplayHi: "[[A2_FULL_ADDRESS_HI]]",
    },
    geo: {
      latitude: 28.6139,  // [[A2_LATITUDE]]
      longitude: 77.2090, // [[A2_LONGITUDE]]
    },
    phone: "[[A2_PHONE]]",
    phoneFormatted: "[[A2_PHONE_FORMATTED]]",
    whatsappNumber: "[[A2_WHATSAPP_NUMBER]]",
    whatsappMessage: "Hello A2 Cafe! I would like to reserve a table / place an order.",
    email: "[[A2_EMAIL]]",
    googleBusinessUrl: "[[A2_GOOGLE_BUSINESS_URL]]",
    googleMapsDirectionsUrl: "[[A2_GOOGLE_MAPS_DIRECTIONS_URL]]",
    googleMapsEmbedUrl: "[[A2_GOOGLE_MAPS_EMBED_URL]]",
    parkingDetails: "Valet parking and dedicated cafe parking spots available right out front.",
    parkingDetailsHi: "कैफे के ठीक सामने वैले पार्किंग और समर्पित पार्किंग स्थान उपलब्ध है।",
    transitDetails: "Located 5 minutes walking distance from [[A2_TRANSIT_STATION]].",
    transitDetailsHi: "[[A2_TRANSIT_STATION_HI]] से पैदल केवल 5 मिनट की दूरी पर स्थित।",
  },
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "23:00",
      formattedEn: "Mon – Fri: 8:00 AM – 11:00 PM",
      formattedHi: "सोम – शुक्र: सुबह 8:00 – रात 11:00",
    },
    {
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:00",
      closes: "23:30",
      formattedEn: "Sat – Sun: 8:00 AM – 11:30 PM",
      formattedHi: "शनि – रवि: सुबह 8:00 – रात 11:30",
    },
  ],
  details: {
    priceRange: "₹₹ (Moderate)",
    priceRangeDescription: "₹300 – ₹700 per person",
    priceRangeDescriptionHi: "₹300 – ₹700 प्रति व्यक्ति",
    servesCuisine: ["Artisanal Coffee", "Gourmet Burgers", "Continental", "Specialty Desserts", "Breakfast"],
    areaServed: "[[A2_CITY_NEIGHBORHOOD]]",
    paymentAccepted: ["Cash", "Credit Card", "Debit Card", "UPI", "Apple Pay", "Google Pay"],
    hasWifi: true,
    hasOutdoorSeating: true,
    isPetFriendly: true,
  },
  socialLinks: {
    instagram: "[[A2_INSTAGRAM_URL]]",
    facebook: "[[A2_FACEBOOK_URL]]",
    twitter: "",
    youtube: "",
  },
  ctaLinks: {
    orderOnline: "/order", // Configurable link: point to /order or external delivery partner
    viewMenu: "/menu",
    visitUs: "/visit",
    callNow: "tel:[[A2_PHONE]]",
    reserveTable: "https://wa.me/[[A2_WHATSAPP_NUMBER]]?text=Table%20Reservation%20Request",
    getDirections: "[[A2_GOOGLE_MAPS_DIRECTIONS_URL]]",
  },
  scene3D: {
    enabled: true,
    scrollDurationVh: 650,
    steps: [
      {
        id: "hero",
        titleEn: "A2 CAFE",
        titleHi: "A2 कैफे",
        subtitleEn: "Artisanal Coffee & Crafted Flavour",
        subtitleHi: "दस्तकारी कॉफ़ी और अनूठा स्वाद",
        scrollProgressStart: 0,
        scrollProgressEnd: 0.18,
        cameraPosition: [0, 1.2, 4.2],
        cameraLookAt: [0, 0.4, 0],
        bgColor: "#0D0907",
      },
      {
        id: "beans",
        titleEn: "Fresh Every Morning",
        titleHi: "हर सुबह ताज़ा भुनी कॉफ़ी",
        subtitleEn: "100% Single-Origin Arabica roasted to peak aroma",
        subtitleHi: "100% सिंगल-ओरिजिन अरेबिका बीन्स, बेहतरीन सुगंध के लिए भुनी हुई",
        scrollProgressStart: 0.18,
        scrollProgressEnd: 0.38,
        cameraPosition: [1.8, 1.6, 3.8],
        cameraLookAt: [0, 0.5, 0],
        bgColor: "#140D08",
      },
      {
        id: "burger",
        titleEn: "Artisanal Bakery & Kitchen",
        titleHi: "कारीगरी बेकरी और रसोई",
        subtitleEn: "Flaky golden butter croissants and handcrafted morning specialties, baked fresh daily",
        subtitleHi: "हर सुबह ताज़ा बेक किए गए सुनहरे परतदार क्रोइसैन्ट और स्वादिष्ट व्यंजन",
        scrollProgressStart: 0.38,
        scrollProgressEnd: 0.58,
        cameraPosition: [-1.8, 1.2, 3.5],
        cameraLookAt: [0, 0.2, 0],
        bgColor: "#160F0A",
      },
      {
        id: "dessert",
        titleEn: "Decadence in Every Bite",
        titleHi: "हर निवाले में मिठास का जादू",
        subtitleEn: "Decadent chocolate mirror glaze, fresh berries, and small-batch daily patisserie",
        subtitleHi: "शानदार चॉकलेट मिरर ग्लेज़, ताज़े फल और रोज़ सुबह तैयार की जाने वाली स्वादिष्ट पेस्ट्री",
        scrollProgressStart: 0.58,
        scrollProgressEnd: 0.76,
        cameraPosition: [0, 1.8, 3.6],
        cameraLookAt: [0, 0.3, 0],
        bgColor: "#120B07",
      },
      {
        id: "symphony",
        titleEn: "Crafted for Every Moment",
        titleHi: "हर पल के लिए तैयार",
        subtitleEn: "From quiet morning sips to lively evening gatherings",
        subtitleHi: "शांत सुबह की पहली घूंट से लेकर शाम की महफ़िल तक",
        scrollProgressStart: 0.76,
        scrollProgressEnd: 0.88,
        cameraPosition: [0, 2.5, 5.0],
        cameraLookAt: [0, 0.5, 0],
        bgColor: "#0D0907",
      },
      {
        id: "closing",
        titleEn: "Welcome to A2 Cafe",
        titleHi: "A2 कैफे में आपका स्वागत है",
        subtitleEn: "Pull up a chair. Your table and coffee await.",
        subtitleHi: "आइए बैठिए, आपकी मेज़ और ताज़ा कॉफ़ी तैयार है।",
        scrollProgressStart: 0.88,
        scrollProgressEnd: 1.0,
        cameraPosition: [0, 1.2, 3.8],
        cameraLookAt: [0, 0.4, 0],
        bgColor: "#0D0907",
      },
    ],
    models: {
      cupPath: "/textures/crema.png",
      beansPath: "/textures/steam-noise.png",
      burgerPath: "/models/croissant/croissant.gltf",
      dessertPath: "/models/cake/strawberry_chocolate_cake.gltf",
    },
  },
  seo: {
    defaultTitleEn: "A2 Cafe | Artisanal Coffee & Handcrafted Culinary Lounge",
    defaultTitleHi: "A2 कैफे | दस्तकारी कॉफ़ी और स्वादिष्ट अनुभव",
    titleTemplate: "%s | A2 Cafe",
    defaultDescriptionEn: "Discover A2 Cafe: artisanal pour-overs, single-origin espresso, gourmet handcrafted burgers, and fresh daily patisserie in a modern luxury lounge.",
    defaultDescriptionHi: "A2 कैफे: ताज़ा कॉफ़ी, स्वादिष्ट कारीगरी बर्गर और शानदार पेस्ट्री का बेहतरीन संगम। आज ही पधारें।",
    ogImage: "/images/og-image.jpg",
    twitterCard: "summary_large_image",
    twitterHandle: "@a2cafe",
    keywords: [
      "A2 Cafe",
      "specialty coffee",
      "artisanal cafe",
      "gourmet burgers",
      "best cafe near me",
      "espresso lounge",
      "handcrafted breakfast",
      "patisserie",
    ],
  },
  aiCrawlers: {
    allowAll: true,
    userAgents: [
      "GPTBot",
      "ChatGPT-User",
      "Google-Extended",
      "PerplexityBot",
      "ClaudeBot",
      "anthropic-ai",
      "Applebot-Extended",
      "CCBot",
    ],
  },
  analytics: {
    provider: "none",
    domainOrId: "",
    requireConsent: true,
  },
  reviews: {
    // Strictly zero fabrication: no fake ratings or review counts
    hasRealRatings: false,
    items: [],
  },
});
