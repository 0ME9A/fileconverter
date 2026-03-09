import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Image to WebP Converter - High Quality & Secure | FileConverter",
  description:
    "Convert any image format to WebP with advanced options. Batch processing, quality control, and compression settings. All processing happens locally in your browser - no uploads required.",
  keywords: [
    "high quality webp",
    "browser-based webp conversion",
    "fast webp converter",
    "privacy-first converter",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
