import type { Metadata, Viewport } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export const siteName = "FileConverter";

export const twitter: Metadata["twitter"] = {
  card: "summary_large_image",
  title: "Free File Converter - Convert Images Online",
  description:
    "Free online file converter tools. All processing happens in your browser - fast, secure, and completely private.",
  images: [`${siteUrl}/og-image.png`],
  creator: "@omegaStrikes",
};

export const openGraph: Metadata["openGraph"] = {
  type: "website",
  locale: "en_US",
  url: siteUrl,
  title: "Free File Converter - Convert Images Online",
  description:
    "Free online file converter tools. Convert images to WebP, JPG, PNG and more. All processing happens in your browser - fast, secure, and completely private.",
  siteName,
  images: [
    {
      url: `${siteUrl}/og-image.png`,
      width: 1200,
      height: 630,
      alt: "FileConverter - Free Online File Conversion Tools",
    },
  ],
};

export const metadataDefault: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Free File Converter - Convert Images Online | FileConverter",
    template: "%s | FileConverter",
  },

  description:
    "Free online file converter tools. Convert images to WebP, JPG, PNG and more. All processing happens in your browser - fast, secure, and completely private. No uploads, no limits, no registration required.",

  keywords: [
    "file converter",
    "image converter",
    "webp converter",
    "jpg converter",
    "png converter",
    "free converter",
    "online converter",
    "batch converter",
    "image optimization",
    "compress images",
    "convert images online",
    "privacy-focused converter",
    "browser-based converter",
    "no upload converter",
  ],

  authors: [{ name: `${siteName} Team` }],
  creator: siteName,
  publisher: siteName,

  applicationName: siteName,
  generator: "Next.js",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  twitter,
  openGraph,

  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light dark",
};
