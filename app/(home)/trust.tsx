import { TRUST_ITEMS } from "../_src/data/trust";
import { useRef } from "react";
import SectionHeader from "@/components/ui/section-header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Trust() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Trust section animation
      gsap.from(".trust-item", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title={"Built for Privacy & Performance"}
          desc={"Everything you need in a modern file converter"}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.id} className="flex gap-4 trust-item">
                <div className="shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
