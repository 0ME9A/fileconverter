"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const COMPARISON = [
  {
    feature: "Privacy — files never leave your device",
    us: true,
    them: false,
  },
  { feature: "No upload delay", us: true, them: false },
  { feature: "Works offline", us: true, them: false },
  { feature: "No account required", us: true, them: false },
  { feature: "No file size limits", us: true, them: false },
  { feature: "Completely free forever", us: true, them: false },
  { feature: "Batch processing", us: true, them: "Paid only" },
];

export default function WhyBrowser() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".why-col",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      );

      gsap.fromTo(
        ".why-row",
        { opacity: 0, x: -20 },
        {
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          stagger: 0.05,
          duration: 0.45,
          ease: "power2.out",
          delay: 0.15,
          clearProps: "transform,opacity",
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="py-24 bg-linear-to-b from-muted/30 to-transparent relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary/70 bg-primary/10 px-4 py-1.5 rounded-full">
            Why us?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Browser-based beats{" "}
            <span className="text-gradient">cloud every time</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Traditional cloud converters upload your files to remote servers.
            We process everything locally — so your data never leaves your device.
          </p>
        </div>

        {/* Comparison table */}
        <div className="rounded-3xl border bg-card/60 backdrop-blur overflow-hidden shadow-2xl">
          {/* Column headers */}
          <div className="grid grid-cols-12 bg-card/80 border-b">
            <div className="p-5 text-sm font-semibold text-muted-foreground col-span-6">
              Feature
            </div>
            <div className="p-5 text-center why-col col-span-3">
              <span className="inline-flex items-center gap-1.5 text-sm font-black text-primary">
                {/* <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> */}
                File Converter
              </span>
            </div>
            <div className="p-5 text-center why-col  col-span-3">
              <span className="text-sm font-semibold text-muted-foreground/60">
                Cloud Tools
              </span>
            </div>
          </div>

          {/* Rows */}
          {COMPARISON.map((row, i) => (
            <div
              key={i}
              className={`why-row grid grid-cols-12 border-b last:border-0 group hover:bg-primary/5 transition-colors duration-200 ${
                i % 2 === 0 ? "" : "bg-card/30"
              }`}
            >
              <div className="p-4 md:p-5 text-sm flex items-center font-medium col-span-6">
                {row.feature}
              </div>

              {/* Us */}
              <div className="p-4 md:p-5 flex items-center justify-center col-span-3">
                {row.us === true ? (
                  <span className="flex items-center gap-1.5 text-green-500 font-semibold text-sm">
                    <span className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-3" />
                    </span>
                    <span className="hidden md:inline">Yes</span>
                  </span>
                ) : (
                  <span className="text-muted-foreground text-sm">{row.us}</span>
                )}
              </div>

              {/* Them */}
              <div className="p-4 md:p-5 flex items-center justify-center col-span-3">
                {row.them === false ? (
                  <span className="flex items-center gap-1.5 text-red-500 font-semibold text-sm">
                    <span className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center">
                      <X className="w-3.5 h-3.5 stroke-3" />
                    </span>
                    <span className="hidden md:inline">No</span>
                  </span>
                ) : (
                  <span className="text-muted-foreground text-sm">{row.them}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          * Comparisons based on typical cloud-based file converter services
        </p>
      </div>
    </section>
  );
}
