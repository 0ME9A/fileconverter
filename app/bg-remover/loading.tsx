import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background">
      <div className="relative">
        <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse" />
        <Loader2 className="w-12 h-12 text-primary animate-spin relative" />
      </div>
      <h2 className="mt-6 text-xl font-bold tracking-tight">Loading AI Tools...</h2>
      <p className="mt-2 text-muted-foreground max-w-xs">
        Preparing our smart engine for high-quality background removal.
      </p>
    </div>
  );
}
