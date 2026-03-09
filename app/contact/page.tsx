import type { Metadata } from "next";
import { companyInfo } from "../_src/data/site-data";
import { social } from "../_src/data/sitemap";
import { Mail } from "lucide-react";
import HomeButton from "@/components/ui/home-button";
import ContactForm from "./contact-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | FileConverter - Support & Feedback",
  description:
    "Have questions or feedback? Get in touch with the FileConverter team. We're here to help with your file conversion needs.",
  keywords: [
    "contact fileconverter",
    "support",
    "feedback",
    "feature request",
    "image converter help",
  ],
};

export default function ContactUsPage() {
  return (
    <div className="bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <HomeButton />

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Have questions, feedback, or suggestions? We&apos;d love to hear
              from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactForm />

            <div className="space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Email Us Directly</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      General Inquiries
                    </p>
                    <a
                      href={`mailto:${companyInfo.email.primary}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {companyInfo.email.primary}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  {social.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                      aria-label="GitHub"
                    >
                      {item.icon ? <item.icon size={20} /> : item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-muted/30 border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond to all inquiries within 24-48 hours
                  during business days. For urgent technical issues, please
                  include &quot;URGENT&quot; in your subject line.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Before You Contact Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You might find answers to your questions in these resources:
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
              >
                FAQ
              </Link>
              <Link
                href="/privacy-policy"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
