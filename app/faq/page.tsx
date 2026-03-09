import type { Metadata } from "next";
import { faqs } from "../_src/data/faq";
import HomeButton from "@/components/ui/home-button";
import PageHeader from "@/components/ui/page-header";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ | FileConverter - Common Questions & Answers",
  description:
    "Find answers to frequently asked questions about FileConverter's image conversion tools, privacy features, and local processing technology.",
  keywords: [
    "file conversion faq",
    "is fileconverter safe",
    "how to convert images",
    "private conversion help",
  ],
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
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still Have Questions */}
          <div className="bg-linear-to-br from-primary/10 via-primary/5 to-background border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find the answer you&apos;re looking for? Feel free to
              reach out to us directly.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
