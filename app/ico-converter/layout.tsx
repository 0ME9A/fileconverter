import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to .ICO Converter - Windows Icons & Favicons | FileConverter",
  description:
    "Convert PNG, JPG, and WEBP images to standard Windows .ICO format. Create multi-size icon bundles for Windows applications or website favicons. All processing happens locally in your browser.",
  keywords: [
    "favicon converter",
    "windows icon maker",
    "multi-size ico conversion",
    "ico generator",
  ],
};

export default function IcoConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
