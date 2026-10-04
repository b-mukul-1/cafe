import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { cafeConfig, getSiteUrl } from "@/config/cafe.config";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { MobileActionBar } from "@/components/common/MobileActionBar";
import { CookieConsent } from "@/components/common/CookieConsent";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const notoHindi = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-hindi",
  display: "swap",
  weight: ["400", "600", "700"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: cafeConfig.seo.defaultTitleEn,
    template: cafeConfig.seo.titleTemplate,
  },
  description: cafeConfig.seo.defaultDescriptionEn,
  keywords: cafeConfig.seo.keywords,
  authors: [{ name: cafeConfig.brand.name }],
  creator: cafeConfig.brand.name,
  alternates: {
    canonical: `${siteUrl}/`,
    languages: {
      en: `${siteUrl}/`,
      hi: `${siteUrl}/hi/`,
      "x-default": `${siteUrl}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["hi_IN"],
    url: `${siteUrl}/`,
    siteName: cafeConfig.brand.name,
    title: cafeConfig.seo.defaultTitleEn,
    description: cafeConfig.seo.defaultDescriptionEn,
    images: [
      {
        url: `${siteUrl}${cafeConfig.seo.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${cafeConfig.brand.name} - Artisanal Coffee and Kitchen`,
      },
    ],
  },
  twitter: {
    card: cafeConfig.seo.twitterCard,
    title: cafeConfig.seo.defaultTitleEn,
    description: cafeConfig.seo.defaultDescriptionEn,
    creator: cafeConfig.seo.twitterHandle,
    images: [`${siteUrl}${cafeConfig.seo.ogImage}`],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: cafeConfig.brand.colors.bgPrimary,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${notoHindi.variable} bg-cafe-bg text-cafe-cream h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cafe-bg text-cafe-cream selection:bg-cafe-caramel selection:text-cafe-bg">
        <SmoothScrollProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
          <CookieConsent />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
