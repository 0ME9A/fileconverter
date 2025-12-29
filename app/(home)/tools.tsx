"use client";
import { Card } from "@/components/ui/card";
import { TOOLS } from "../_src/data/tools";
import { RefObject } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isAvailable = tool.status === "available";

            const content = (
              <Card
                className={`p-6 h-full transition-shadow tool-card ${
                  isAvailable
                    ? "hover:shadow-lg cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-linear-to-br ${tool.gradient} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {isAvailable ? "Available" : "Coming Soon"}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </Card>
            );

            return isAvailable && tool.href ? (
              <Link key={tool.id} href={tool.href}>
                {content}
              </Link>
            ) : (
              <div key={tool.id}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
