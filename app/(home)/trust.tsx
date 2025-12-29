import { TRUST_ITEMS } from "../_src/data/trust";
import { RefObject } from "react";
import SectionHeader from "@/components/ui/section-header";

type TProps = {
  trustRef: RefObject<HTMLDivElement | null>;
};

export default function Trust({ trustRef }: TProps) {
  return (
    <section ref={trustRef} className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
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
