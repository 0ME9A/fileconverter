"use client";

import { useRef } from "react";
import {
  ArrowRight,
  Zap,
  Shield,
  FileImage,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Navbar animation
      gsap.from(".navbar", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.out",
      });

      // Hero animations with timeline for better sequencing
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-badge", {
          opacity: 0,
          y: 30,
          duration: 0.8,
        })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 50,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.4"
        );

      // Features animation with improved ScrollTrigger
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      // Tools animation with scale effect
      gsap.from(".tool-card", {
        scrollTrigger: {
          trigger: toolsRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
      });

      // Trust section animation
      gsap.from(".trust-item", {
        scrollTrigger: {
          trigger: trustRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });

      // CTA section animation
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium hero-badge">
              <Sparkles className="w-4 h-4" />
              Free File Conversion Tools
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight hero-title">
              Convert Your Files
              <br />
              <span className="text-primary">Instantly & Free</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto hero-subtitle">
              Transform your images with professional-grade tools. All
              processing happens in your browser - no uploads, no waiting,
              completely private and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center hero-cta">
              <Button size="lg" asChild className="gap-2">
                <Link href="/webp-converter">
                  Start Converting
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#tools">Browse Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Tools?
            </h2>
            <p className="text-muted-foreground text-lg">
              Built with privacy and performance in mind
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 feature-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Private</h3>
              <p className="text-muted-foreground">
                All conversions happen locally in your browser. Your files never
                leave your device.
              </p>
            </Card>

            <Card className="p-6 feature-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                No server uploads means instant processing. Convert hundreds of
                files in seconds.
              </p>
            </Card>

            <Card className="p-6 feature-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileImage className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Options</h3>
              <p className="text-muted-foreground">
                Full control over quality, compression, resizing, and more
                professional features.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section ref={toolsRef} id="tools" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Available Tools
            </h2>
            <p className="text-muted-foreground text-lg">
              More converters coming soon
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/webp-converter" className="tool-card">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <FileImage className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Available
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Image to WebP</h3>
                <p className="text-sm text-muted-foreground">
                  Convert any image format to WebP with advanced compression and
                  quality controls
                </p>
              </Card>
            </Link>

            <Card className="p-6 opacity-60 tool-card">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Image to JPG</h3>
              <p className="text-sm text-muted-foreground">
                Convert images to optimized JPG format with quality control
              </p>
            </Card>

            <Card className="p-6 opacity-60 tool-card">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Image to PNG</h3>
              <p className="text-sm text-muted-foreground">
                Convert to PNG format with transparency support and lossless
                compression
              </p>
            </Card>

            <Card className="p-6 opacity-60 tool-card">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Image Compression</h3>
              <p className="text-sm text-muted-foreground">
                Reduce image file sizes while maintaining visual quality
              </p>
            </Card>

            <Card className="p-6 opacity-60 tool-card">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Batch Resize</h3>
              <p className="text-sm text-muted-foreground">
                Resize multiple images at once to custom dimensions
              </p>
            </Card>

            <Card className="p-6 opacity-60 tool-card">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Format Converter</h3>
              <p className="text-sm text-muted-foreground">
                Universal image format converter supporting 10+ formats
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section ref={trustRef} className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Privacy & Performance
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need in a modern file converter
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 trust-item">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">No File Size Limits</h3>
                <p className="text-sm text-muted-foreground">
                  Convert files of any size. No artificial restrictions or
                  premium tiers.
                </p>
              </div>
            </div>

            <div className="flex gap-4 trust-item">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Batch Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Convert multiple files simultaneously with universal or
                  individual settings.
                </p>
              </div>
            </div>

            <div className="flex gap-4 trust-item">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">No Registration Required</h3>
                <p className="text-sm text-muted-foreground">
                  Start converting immediately. No accounts, no tracking, no
                  hassle.
                </p>
              </div>
            </div>

            <div className="flex gap-4 trust-item">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Open Source</h3>
                <p className="text-sm text-muted-foreground">
                  Built with modern web technologies. Transparent and
                  trustworthy.
                </p>
              </div>
            </div>

            <div className="flex gap-4 trust-item">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Cross-Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Works on any device with a modern browser. Desktop, mobile, or
                  tablet.
                </p>
              </div>
            </div>

            <div className="flex gap-4 trust-item">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Professional Results</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms ensure the highest quality output for your
                  files.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center cta-content">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Convert Your Files?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start using our free tools today. No signup, no limits, no tracking.
          </p>
          <Button size="lg" asChild className="gap-2">
            <Link href="/webp-converter">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Built with privacy and performance in mind. All processing happens
              locally in your browser.
            </p>
            <p className="mt-2">
              No data collection. No tracking. No uploads to servers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
