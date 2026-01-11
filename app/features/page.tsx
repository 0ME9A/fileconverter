import type { Metadata } from "next";
import {
  Lock,
  Zap,
  Upload,
  Settings,
  Layers,
  CheckCircle,
  Shield,
  Gauge,
  FileStack,
  Download,
  Palette,
  Code,
} from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import HomeButton from "@/components/ui/home-button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features | FileConverter",
  description:
    "Discover all the powerful features of FileConverter: client-side processing, batch conversion, advanced options, and more.",
};

export default function FeaturesPage() {
  const features = [
    {
      icon: Lock,
      title: "100% Private & Secure",
      description:
        "All conversions happen directly in your browser. Your files never leave your device, ensuring complete privacy and security.",
      highlights: [
        "No file uploads",
        "Zero data collection",
        "Client-side processing",
      ],
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Convert files instantly using your device's processing power. No waiting for uploads or server processing queues.",
      highlights: [
        "Instant conversion",
        "No server delays",
        "Local processing",
      ],
    },
    {
      icon: FileStack,
      title: "Batch Processing",
      description:
        "Convert multiple files at once with our batch processing feature. Save time by processing dozens of files simultaneously.",
      highlights: ["Multiple files", "Parallel processing", "Time-saving"],
    },
    {
      icon: Settings,
      title: "Advanced Options",
      description:
        "Fine-tune your conversions with advanced settings: quality control, compression levels, resizing, and more.",
      highlights: ["Quality control", "Custom compression", "Image resizing"],
    },
    {
      icon: Download,
      title: "Flexible Download",
      description:
        "Download converted files individually or all at once. Choose what works best for your workflow.",
      highlights: ["Individual downloads", "Bulk download", "Instant access"],
    },
    {
      icon: Palette,
      title: "Master Settings",
      description:
        "Set default conversion options that apply to all files, or customize settings for individual files as needed.",
      highlights: [
        "Master presets",
        "Per-file customization",
        "Save preferences",
      ],
    },
    {
      icon: Shield,
      title: "No File Limits",
      description:
        "Convert as many files as you want, as large as your browser can handle. No artificial limits or subscriptions required.",
      highlights: [
        "Unlimited conversions",
        "Large file support",
        "No subscriptions",
      ],
    },
    {
      icon: Gauge,
      title: "High Quality Output",
      description:
        "Maintain excellent image quality with customizable compression settings. Balance file size and quality perfectly.",
      highlights: [
        "Adjustable quality",
        "Lossless options",
        "Optimal compression",
      ],
    },
    {
      icon: Code,
      title: "Modern Technology",
      description:
        "Built with cutting-edge web technologies for optimal performance and reliability across all modern browsers.",
      highlights: [
        "Latest web APIs",
        "Progressive enhancement",
        "Cross-browser support",
      ],
    },
    {
      icon: Layers,
      title: "Multiple Formats",
      description:
        "Support for various image formats with more converters coming soon. One tool for all your conversion needs.",
      highlights: ["WebP conversion", "More formats soon", "Versatile tool"],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <HomeButton />

        <div className="space-y-12">
          {/* Header */}
          <PageHeader
            title={"Powerful Features for Effortless Conversion"}
            desc={
              "FileConverter is packed with features designed to make file conversion fast, secure, and hassle-free."
            }
          />

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                    <ul className="space-y-1">
                      {feature.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-linear-to-br from-primary/10 via-primary/5 to-background border rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Converting?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Experience all these features for free. No sign-up, no
              subscriptions, no hassle.
            </p>
            <Link
              href="/webp-converter"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Upload className="w-5 h-5" />
              Start Converting Now
            </Link>
          </div>

          {/* Privacy Highlight */}
          <div className="bg-muted/30 border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-green-500 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Privacy-First Design
                </h3>
                <p className="text-muted-foreground">
                  Unlike other converters that require file uploads,
                  FileConverter processes everything locally in your browser.
                  This means your files never travel over the internet, ensuring
                  maximum privacy and security. We couldn&apos;t access your
                  files even if we wanted to—that&apos;s our commitment to your
                  privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
