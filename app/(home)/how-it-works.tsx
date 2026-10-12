"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Upload, Sliders, Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    icon: Upload,
    title: "Drop Your Files",
    description:
      "Drag & drop or click to select one or multiple files. Any format, any size — no restrictions.",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
    glow: "shadow-blue-500/20",
  },
  {
    number: "02",
    icon: Sliders,
    title: "Choose Your Settings",
    description:
      "Pick the output format and fine-tune quality, dimensions, and advanced options — or use smart defaults.",
    color: "from-primary/20 to-primary/10",
    border: "border-primary/30",
    iconColor: "text-primary",
    glow: "shadow-primary/20",
  },
  {
    number: "03",
    icon: Download,
    title: "Download Instantly",
    description:
      "Your files are converted directly in the browser at blazing speed. Download individually or as a ZIP.",
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-500/30",
    iconColor: "text-green-400",
    glow: "shadow-green-500/20",
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".how-step",
        {
          opacity: 0,
          y: 40,
        },
        {
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      );
    },
    { scope: container },
  );

  return (
    <section ref={container} className="py-24 relative overflow-hidden bg-linear-to-b from-primary/5">
      {/* Background glow */}
      {/* <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/3 to-transparent pointer-events-none" /> */}

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary/70 bg-primary/10 px-4 py-1.5 rounded-full">
            How it works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Convert in{" "}
            <span className="text-gradient">3 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No signup. No uploads. No waiting. Everything happens locally in
            your browser.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`how-step relative group flex flex-col items-center text-center p-8 rounded-3xl border hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white dark:bg-black`}
              >
                {/* Step number */}
                <span className="absolute top-0 right-2 font-black text-muted-foreground/10 text-7xl leading-none select-none pointer-events-none">
                  {step.number}
                </span>

                {/* Icon circle */}
                <div
                  className={`relative z-10 w-20 h-20 rounded-2xl bg-background/60 backdrop-blur flex items-center justify-center mb-6 border ${step.border} group-hover:scale-110 transition-transform duration-300 shadow-lg ${step.glow}`}
                >
                  <Icon className={`w-9 h-9 ${step.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
