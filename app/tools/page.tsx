import type { Metadata } from "next";
import {
  FileImage,
  ImageIcon,
  FileType,
  Minimize,
  CheckCircle,
  Clock,
} from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import HomeButton from "@/components/ui/home-button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Tools | FileConverter",
  description:
    "Browse all available file conversion tools and see what's coming soon.",
};

export default function AllToolsPage() {
  const tools = [
    {
      name: "Image to WebP Converter",
      description:
        "Convert any image format to WebP for better compression and quality",
      icon: FileImage,
      href: "/webp-converter",
      available: true,
      features: ["Batch conversion", "Quality control", "Advanced options"],
    },
    {
      name: "Image to JPG Converter",
      description:
        "Convert images to JPG format with customizable quality settings",
      icon: ImageIcon,
      href: "#",
      available: false,
      features: ["Coming soon", "Quality control", "Batch processing"],
    },
    {
      name: "Image to PNG Converter",
      description: "Convert images to PNG format with transparency support",
      icon: FileType,
      href: "#",
      available: false,
      features: ["Coming soon", "Transparency", "Lossless"],
    },
    {
      name: "Image Compression Tool",
      description:
        "Compress images to reduce file size while maintaining quality",
      icon: Minimize,
      href: "#",
      available: false,
      features: ["Coming soon", "Multiple formats", "Quality control"],
    },
    {
      name: "Batch Image Resizer",
      description: "Resize multiple images at once to specific dimensions",
      icon: ImageIcon,
      href: "#",
      available: false,
      features: ["Coming soon", "Batch processing", "Custom dimensions"],
    },
    {
      name: "Image Format Converter",
      description:
        "Convert between various image formats (JPG, PNG, WebP, GIF)",
      icon: FileImage,
      href: "#",
      available: false,
      features: ["Coming soon", "Multiple formats", "High quality"],
    },
  ];

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
            {tools.map((tool, index) => (
              <div
                key={index}
                className={`bg-card border rounded-lg p-6 transition-all ${
                  tool.available
                    ? "hover:shadow-lg hover:border-primary cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                {tool.available ? (
                  <Link href={tool.href} className="block space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950 px-2 py-1 rounded">
                        <CheckCircle className="w-3 h-3" />
                        Available
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                    <ul className="space-y-1">
                      {tool.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle className="w-3 h-3 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Link>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950 px-2 py-1 rounded">
                        <Clock className="w-3 h-3" />
                        Coming Soon
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                    <ul className="space-y-1">
                      {tool.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <Clock className="w-3 h-3" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
              href="/contact-us"
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
