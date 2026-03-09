import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Image to JPG Converter - Fast & Private | FileConverter",
  description:
    "Convert any image format to JPG with advanced options. Batch processing, quality control, and compression settings. All processing happens locally in your browser - fast, secure, and completely private.",
  keywords: [
    "convert image to jpg",
    "jpg compression",
    "privacy-first jpg converter",
    "online image converter",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
