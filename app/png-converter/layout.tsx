import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Image to PNG Converter - Transparent & Secure | FileConverter",
  description:
    "Convert any image format to PNG with advanced options. Batch processing, transparency support, and more. All processing happens locally in your browser - no uploads required.",
  keywords: [
    "convert image to png",
    "transparent png conversion",
    "batch png converter",
    "secure image conversion",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
