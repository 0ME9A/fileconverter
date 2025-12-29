import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { faqs } from "../_src/data/faq";
import HomeButton from "@/components/ui/home-button";
import PageHeader from "@/components/ui/page-header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | FileConverter",
  description:
    "Frequently asked questions about FileConverter's file conversion tools and privacy features.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <HomeButton />

        <div className="space-y-8">
          {/* Header */}
          <PageHeader
            title={"Frequently Asked Questions"}
            desc={
              "Find answers to common questions about FileConverter and our services."
            }
          />

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-card border rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-lg hover:text-primary transition-colors">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="bg-linear-to-br from-primary/10 via-primary/5 to-background border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find the answer you&apos;re looking for? Feel free to
              reach out to us directly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
