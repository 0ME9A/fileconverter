import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Multi-Size PNG Exporter - App Icons & Responsive Images | FileConverter",
  description:
    "Export images to multiple PNG files at different sizes. Perfect for creating app icons, favicons, and responsive images. All processing happens locally in your browser.",
  keywords: [
    "app icon exporter",
    "multi-size png generator",
    "responsive image tools",
    "image resizer batch",
  ],
};

export default function MultiSizePngExporterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
