import { Loader2 } from "lucide-react";

export default function PassportPhotoLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in fade-in duration-500">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary/20 rounded-full" />
        <Loader2 className="w-12 h-12 text-primary animate-spin absolute top-0 left-0" />
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold tracking-tight">Passport Photo Maker</h3>
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading professional tools...
        </p>
      </div>
    </div>
  );
}
