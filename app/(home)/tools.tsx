"use client";
import { Button } from "@/components/ui/button";
import { TOOLS } from "../_src/data/tools";
import { ArrowRight } from "lucide-react";
import { RefObject } from "react";
import SectionHeader from "@/components/ui/section-header";
import ToolCard from "@/components/ui/tool-card";
import Link from "next/link";

type TProps = {
  toolsRef: RefObject<HTMLDivElement | null>;
};

export default function Tools({ toolsRef }: TProps) {
  return (
    <section ref={toolsRef} id="tools" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title={"Available Tools"}
          desc={"More converters coming soon"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool, index) => (
            <div key={index}>
              {tool.status === "available" && tool.href ? (
                <Link href={tool.href}>
                  <ToolCard data={tool} />
                </Link>
              ) : (
                <ToolCard data={tool} />
              )}
            </div>
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
