"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";
import Tools from "./tools";
import Trust from "./trust";
import Hero from "./hero";
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
      <Hero heroRef={heroRef} />

      <Tools toolsRef={toolsRef} />
      <Trust trustRef={trustRef} />
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
