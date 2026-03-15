import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "AI Background Remover - Batch Remove & Custom BG | FileConverter",
  description:
    "Remove backgrounds from multiple images at once using advanced AI. Support for custom background colors, batch processing, and high-quality JPG/PNG output.",
  keywords: [
    "ai background remover",
    "batch background removal",
    "remove bg online",
    "custom background color",
    "transparent png converter",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
