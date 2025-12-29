import type { Metadata } from "next";
import {
  ArrowLeft,
  Heart,
  Users,
  Target,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "About Us | FileConverter",
  description:
    "Learn about FileConverter's mission to provide free, private, and fast file conversion tools for everyone.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="space-y-12">
          {/* Header */}
          <PageHeader
            title={"About FileConverter"}
            desc={
              "Free, private, and fast file conversion tools built for everyone."
            }
          />
          {/* Mission Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FileConverter was created with a simple mission: to provide
              powerful, easy-to-use file conversion tools that respect your
              privacy. We believe that file conversion should be free, fast, and
              secure—without compromising on quality or user experience.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In an era where data privacy is increasingly important, we built
              FileConverter to process all files directly in your browser. This
              means your files never leave your device, ensuring complete
              privacy and security.
            </p>
          </section>

          {/* Values Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Privacy First
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your privacy is non-negotiable. All processing happens
                      client-side, ensuring your files remain private and
                      secure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Speed & Performance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      No uploads, no waiting. Convert files instantly using your
                      device&apos;s processing power.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      User-Centric Design
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We design with you in mind, creating intuitive interfaces
                      that make file conversion effortless.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Accessible to All
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Free forever, no subscriptions, no limits. File conversion
                      should be accessible to everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Built with Modern Technology</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FileConverter is built using cutting-edge web technologies
              including Next.js, React, and the latest browser APIs. Our
              client-side processing approach leverages the HTML5 Canvas API and
              modern JavaScript to provide fast, efficient file conversions
              without any server-side processing.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This technological approach not only ensures your privacy but also
              means faster conversions with no upload or download delays. Your
              files stay on your device throughout the entire process.
            </p>
          </section>

          {/* Team Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Our Commitment</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We&apos;re committed to continuously improving FileConverter by
              adding new features, supporting more file formats, and enhancing
              performance. Our roadmap includes additional conversion tools,
              advanced editing features, and improved batch processing
              capabilities.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Most importantly, we&apos;ll never compromise on privacy.
              FileConverter will always process files client-side, ensuring your
              data remains yours alone.
            </p>
          </section>

          {/* CTA Section */}
          <div className="bg-linear-to-br from-primary/10 via-primary/5 to-background border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Join Thousands of Happy Users
            </h2>
            <p className="text-muted-foreground mb-6">
              Start converting your files with privacy and speed.
            </p>
            <Link
              href="/webp-converter"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Try FileConverter Now
            </Link>
          </div>

          {/* Contact */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions, suggestions, or feedback? We&apos;d love to hear
              from you.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Contact Us
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
