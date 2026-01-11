import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to .ICO Converter - Free Online Tool",
  description:
    "Convert PNG, JPG, and WEBP images to standard Windows .ICO format. Create multi-size icon bundles for Windows applications or website favicons. Features include auto-orientation and metadata stripping. All processing happens locally in your browser.",
};

export default function IcoConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
