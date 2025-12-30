import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Image to Jpg Converter - Free Online Tool | FileConvert",
  description:
    "Convert any image format to Jpg with advanced options. Batch processing, quality control, compression settings, and more. All processing happens locally in your browser - no uploads required.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
