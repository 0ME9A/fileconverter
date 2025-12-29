import { FEATURES } from "../_src/data/features";
import { Card } from "@/components/ui/card";
import { RefObject } from "react";
import SectionHeader from "@/components/ui/section-header";

type TProps = {
  featuresRef: RefObject<HTMLDivElement | null>;
};

export default function Features({ featuresRef }: TProps) {
  return (
    <section ref={featuresRef} id="features" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title={"Why Choose Our Tools?"}
          desc={"Built with privacy and performance in mind"}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.id} className="p-6 feature-card">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
