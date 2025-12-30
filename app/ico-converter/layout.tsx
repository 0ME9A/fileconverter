import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Image to ICO Converter – Free Online Tool | FileConvert",
  description:
    "Convert images to ICO format online with batch processing, size and quality control, and compression options. All conversions run locally in your browser for fast, secure, and private results — no uploads required.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
