"use client";
import { Button } from "@/components/ui/button";
import { TOOLS } from "../_src/data/tools";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import SectionHeader from "@/components/ui/section-header";
import ToolCard from "@/components/ui/tool-card";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Tools() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Tools animation with scale effect
      gsap.from(".tool-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
        },
        y: 40,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} id="tools" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title={"Available Tools"}
          desc={"More converters coming soon"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} data={tool} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild className="gap-2">
            <Link href="/tools">
              View All Tools
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
