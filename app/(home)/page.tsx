"use client";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Tools from "./tools";
import Trust from "./trust";
import Hero from "./hero";
import GlobalImpact from "./global-impact";
import CTASection from "./cta";
import gsap from "gsap";
import FAQSection from "@/components/faq-section";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Navbar animation
      gsap.from(".navbar", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <Hero />
      <GlobalImpact />
      <Tools />
      <Trust />
      <FAQSection />

      <CTASection />

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
