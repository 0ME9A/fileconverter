import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Link from "next/link";
import StatsCounter from "@/components/stats-counter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero parallax blobs
      gsap.to(".hero-blob-1", {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 100,
        x: 50,
      });

      gsap.to(".hero-blob-2", {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        x: -50,
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
          "-=0.4",
        )
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.6",
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.4",
        );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative pt-16 pb-24 md:pt-24 md:pb-40 overflow-hidden bg-mesh"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse hero-blob-1" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700 hero-blob-2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 text-sm font-semibold hero-badge shadow-glow animate-bounce-slow">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-gradient">Next-Gen File Conversion</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight hero-title leading-[1.1]">
              Convert Files with
              <br />
              <span className="text-gradient">Pure Precision</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto hero-subtitle leading-relaxed">
              Experience the future of file processing. Zero server uploads.
              Zero privacy risks.
              <span className="block mt-2 font-medium text-foreground/80 italic">
                100% browser-based performance.
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center hero-cta">
            <Button size="lg" asChild>
              <Link href="/webp-converter" className="gap-3">
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tools">Explore Tools</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto transition-all">
            <div className="glass-card p-6 rounded-lg flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-foreground">100% Private</p>
                <p className="text-xs text-muted-foreground">
                  Local processing
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-lg flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-foreground">Instant Speed</p>
                <p className="text-xs text-muted-foreground">No upload delay</p>
              </div>
            </div>

            <Link
              href="/stats"
              className="glass-card p-6 rounded-lg flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <StatsCounter className="font-bold" />
                </div>
                <p className="text-xs text-muted-foreground">Files globally</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
