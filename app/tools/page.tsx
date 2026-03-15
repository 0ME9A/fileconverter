import type { Metadata } from "next";
import { TOOLS } from "../_src/data/tools";
import PageHeader from "@/components/ui/page-header";
import HomeButton from "@/components/ui/home-button";
import ToolCard from "@/components/ui/tool-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "All Conversion Tools | FileConverter - Free & Private",
  description:
    "Browse our complete collection of free, privacy-focused file conversion tools. Convert to WebP, JPG, PNG, ICO, and more instantly.",
  keywords: [
    "image tools",
    "online converters",
    "free conversion webp",
    "ico maker",
    "jpg optimizer",
  ],
};

export default function page() {
  return (
    <div className="min-h-screen bg-background space-y-8">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <HomeButton />

        <div className="space-y-12">
          {/* Header */}
          <PageHeader
            title={"All Conversion Tools"}
            desc={
              "Explore our growing collection of free, privacy-focused file conversion tools. All processing happens directly in your browser."
            }
          />

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool, index) => (
              <div key={index}>
                <ToolCard data={tool} />
              </div>
            ))}
          </div>
          <div className="mx-auto bg-linear-to-br from-primary/10 via-primary/5 to-background border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a Different Tool?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We&apos;re constantly adding new conversion tools. Let us know
              what you need and we&apos;ll prioritize it!
            </p>
            <Button asChild>
              <Link href="/contact">Request a Feature</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
