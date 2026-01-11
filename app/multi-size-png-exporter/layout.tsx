import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Size PNG Exporter - Free Online Tool",
  description:
    "Export images to multiple PNG files at different sizes. Perfect for creating app icons, favicons, and responsive images. All processing happens locally in your browser.",
};

export default function MultiSizePngExporterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
