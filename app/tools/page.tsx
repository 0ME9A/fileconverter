import type { Metadata } from "next";
import { TOOLS } from "../_src/data/tools";
import PageHeader from "@/components/ui/page-header";
import HomeButton from "@/components/ui/home-button";
import ToolCard from "@/components/ui/tool-card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Tools | FileConverter",
  description:
    "Browse all available file conversion tools and see what's coming soon.",
};

export default function page() {
  return (
    <div className="min-h-screen bg-background">
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
                {tool.status === "available" && tool.href ? (
                  <Link href={tool.href}>
                    <ToolCard data={tool} />
                  </Link>
                ) : (
                  <ToolCard data={tool} />
                )}
              </div>
            ))}
          </div>

          {/* Request Feature Section */}
          <div className="bg-linear-to-br from-primary/10 via-primary/5 to-background border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a Different Tool?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We&apos;re constantly adding new conversion tools. Let us know
              what you need and we&apos;ll prioritize it!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Request a Feature
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
