"use client";

import { useRef } from "react";
import StatsCounter from "@/components/stats-counter";
import { Zap, Shield, Globe2 } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalImpact() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Global Impact animation
      gsap.from(".impact-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="py-24 bg-card/30 border-y relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <SectionHeader
          title={"Our Growing Impact"}
          desc={
            "Transparently tracking how we help users worldwide process their data securely."
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4 group impact-card">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Shield className="text-primary w-8 h-8" />
            </div>
            <div>
              <StatsCounter
                type="totalFiles"
                className="text-4xl font-extrabold text-primary block mb-2"
              />
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Privacy Preserved
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Files converted locally
              </p>
            </div>
          </div>

          <div className="text-center space-y-4 group impact-card">
            <div className="w-16 h-16 rounded-3xl bg-secondary/30 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Globe2 className="text-primary w-8 h-8" />
            </div>
            <div>
              <StatsCounter
                type="totalSize"
                className="text-4xl font-extrabold text-primary block mb-2"
              />
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Data Handled
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Processed in browser
              </p>
            </div>
          </div>

          <div className="text-center space-y-4 group impact-card">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Zap className="text-primary w-8 h-8" />
            </div>
            <div>
              <StatsCounter
                type="avgTime"
                className="text-4xl font-extrabold text-primary block mb-2"
                showSuffix={true}
              />
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Instant Performance
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Average wait time
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
