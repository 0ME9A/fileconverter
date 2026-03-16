import { TToolCard } from "@/app/_src/ts";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type TProps = {
  tool: TToolCard;
  className?: string;
};

export default function ToolListCard({ tool }: TProps) {
  return (
    <div className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 group transition-all text-left border border-transparent hover:border-primary/20 relative cursor-pointer">
      {tool.href && <Link href={tool.href} className="inset-0 absolute z-10" />}
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "size-10 rounded-lg bg-linear-to-br flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shrink-0",
            tool.gradient,
          )}
        >
          <tool.icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
            {tool.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {tool.description}
          </p>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
    </div>
  );
}
