import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Clock, ArrowRight } from "lucide-react";
import { TToolCard } from "@/app/_src/ts";
import clsx from "clsx";
import Link from "next/link";

type TProps = {
  data: TToolCard;
  className?: string;
};

export default function ToolCard({ data, className }: TProps) {
  const Icon = data.icon;
  const isAvailable = data.status === "available";

  return (
    <Card
      aria-disabled={!isAvailable}
      className={clsx(
        "glass group h-full transition-all duration-500 hover:-translate-y-2 tool-card",
        !isAvailable && "opacity-50 grayscale cursor-not-allowed",
        className,
      )}
    >
      {data.href && <Link href={data.href} className="absolute inset-0"/>}
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div
            className={clsx(
              "w-14 h-14 rounded-2xl bg-linear-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500",
              data.gradient,
            )}
          >
            <Icon className="size-7 text-white" />
          </div>
          {isAvailable ? (
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Active
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
              <Clock className="w-3 h-3" />
              Later
            </div>
          )}
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {data.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            {data.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="grid grid-cols-1 gap-2">
          {data.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-xs font-medium text-muted-foreground/80"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary/40 transition-colors" />
              {feature}
            </li>
          ))}
        </ul>

        {isAvailable && (
          <div className="pt-2 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
            Open Tool <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
