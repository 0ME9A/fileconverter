"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // CTA section animation
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <div className="max-w-6xl mx-auto pb-10" ref={container}>
      <div className="bg-linear-to-br from-primary/10 via-primary/5 to-background border rounded-lg p-8 text-center cta-content">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Convert Your Files?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Start using our free tools today. No signup, no limits, no tracking.
        </p>
        <Button size="lg" asChild className="gap-2">
          <Link href="/webp-converter">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
