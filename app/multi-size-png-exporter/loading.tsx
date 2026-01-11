import { Loader2, FileImage } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <FileImage className="w-12 h-12 text-primary" />
            <Loader2 className="w-6 h-6 animate-spin text-primary absolute -bottom-1 -right-1" />
          </div>
        </div>
        <p className="text-muted-foreground">
          Loading Multi-Size PNG Exporter...
        </p>
      </div>
    </div>
  );
}
