"use client";
import { Download, Settings2, Trash2, Zap } from "lucide-react";
import { TBaseImage } from "@/app/_src/ts";
import { Button } from "./ui/button";

type TProps<T extends TBaseImage> = {
  images: T[];
  setShowMasterSettings: (show: boolean) => void;
  handleConvertAll: () => Promise<void>;
  downloadAll: () => void;
  clearAll: () => void;
};

export default function ImageActionArea<T extends TBaseImage>({
  images,
  setShowMasterSettings,
  handleConvertAll,
  downloadAll,
  clearAll,
}: TProps<T>) {
  const allCompleted = images.every((img) => img.status === "completed");
  const anyCompleted = images.some((img) => img.status === "completed");

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/30 backdrop-blur-md rounded-2xl p-4 border border-border/40 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Zap className="w-5 h-5 fill-primary/20" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight">Images Queue</h2>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {images.length} File{images.length !== 1 ? "s" : ""} Loaded
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
        <Button
          variant="outline"
          onClick={() => setShowMasterSettings(true)}
          className="rounded-full bg-background/50 hover:bg-background border-border/60 gap-2 font-semibold transition-all hover:border-primary/30"
        >
          <Settings2 className="w-4 h-4 text-primary" />
          Master Settings
        </Button>

        <Button
          onClick={handleConvertAll}
          disabled={allCompleted}
          className="rounded-full px-6 bg-primary shadow-glow hover:shadow-primary/40 transition-all font-bold gap-2"
        >
          <Zap className="w-4 h-4 fill-current" />
          Convert All
        </Button>

        <Button
          onClick={downloadAll}
          variant="outline"
          disabled={!anyCompleted}
          className={`rounded-full border-border/60 gap-2 font-semibold transition-all ${
            anyCompleted ? "hover:border-primary/50 text-foreground" : ""
          }`}
        >
          <Download className="w-4 h-4" />
          Download All
        </Button>

        <Button
          onClick={clearAll}
          variant="ghost"
          className="rounded-full hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
          title="Clear all images"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
