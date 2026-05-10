import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Universal Image Format Converter - Fast & Private | FileConverter",
  description:
    "Convert any image to JPG, PNG, WebP, BMP, or AVIF instantly. Supports batch conversion, quality control, resizing, and compression. 100% browser-based — no upload, no tracking, completely private.",
  keywords: [
    "image format converter",
    "convert image online",
    "jpg to png",
    "png to webp",
    "image to avif",
    "batch image converter",
    "free image converter",
    "privacy-first converter",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
