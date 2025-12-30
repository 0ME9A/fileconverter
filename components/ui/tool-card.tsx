import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { CheckCircle, Clock } from "lucide-react";
import { TToolCard } from "@/app/_src/ts";
import clsx from "clsx";

type TProps = {
  data: TToolCard;
  className?: string;
};

export default function ToolCard({ data, className }: TProps) {
  const Icon = data.icon;
  const isAvailable = data.status === "available";

  return (
    <Card
      aria-disabled={isAvailable}
      tabIndex={isAvailable ? 0 : -1}
      className={clsx(
        "h-full",
        isAvailable
          ? "hover:shadow-lg hover:border-primary cursor-pointer"
          : "opacity-60 cursor-not-allowed",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div
            className={clsx(
              "w-12 h-12 rounded-lg bg-linear-to-b flex items-center justify-center",
              data.gradient
            )}
          >
            <Icon className="size-6 text-white" />
          </div>
          {isAvailable ? (
            <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950 px-2 py-1 rounded">
              <CheckCircle className="w-3 h-3" />
              Available
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950 px-2 py-1 rounded">
              <Clock className="w-3 h-3" />
              Coming Soon
            </div>
          )}
        </div>
        <CardTitle className="text-lg font-semibold mb-2">
          {data.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {data.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span>
                {isAvailable ? (
                  <CheckCircle className={"size-3 text-green-400"} />
                ) : (
                  <Clock className={"size-3 text-muted-foreground"} />
                )}
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
