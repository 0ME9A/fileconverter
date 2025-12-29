import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";
import Link from "next/link";

type TProps = {
  heroRef: RefObject<HTMLDivElement | null>;
};

export default function Hero({ heroRef }: TProps) {
  return (
    <section ref={heroRef} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-background to-background" />
      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium hero-badge">
            <Sparkles className="w-4 h-4" />
            Free File Conversion Tools
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight hero-title">
            Convert Your Files
            <br />
            <span className="text-primary">Instantly & Free</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto hero-subtitle">
            Transform your images with professional-grade tools. All processing
            happens in your browser - no uploads, no waiting, completely private
            and secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center hero-cta">
            <Button size="lg" asChild className="gap-2">
              <Link href="/webp-converter">
                Start Converting
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#tools">Browse Tools</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
