"use client";

import { faqs } from "@/app/_src/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { useRef } from "react";

interface FAQSectionProps {
  limit?: number;
  title?: string;
  description?: string;
  className?: string;
  showViewAll?: boolean;
}

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection({
  limit = 5,
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our file conversion tools and privacy features.",
  className,
  showViewAll = true,
}: FAQSectionProps) {
  const displayFaqs = faqs.slice(0, limit);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // FAQ Section animation
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 30,
        stagger: {
          each: 0.1,
          from: "start",
        },
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={cn("py-20 faq-section", className)}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {displayFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border rounded-lg px-6 overflow-hidden faq-item"
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

        {showViewAll && (
          <div className="text-center mt-12">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/faq">
                View All FAQs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
