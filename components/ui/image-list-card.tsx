"use client";
/* eslint-disable @next/next/no-img-element */

import { Check, Download, Settings2, X, Loader2 } from "lucide-react";
import { TBaseImage } from "@/app/_src/ts";
import { Button } from "./button";
import React from "react";

type Props<T extends TBaseImage> = {
  image: T;
  formatFileSize: (bytes: number) => string;
  setSelectedImage: (id: string | null) => void;
  downloadImage: (image: T) => void;
  removeImage: (id: string) => void;
};

export default function ImageListCard<T extends TBaseImage>({
  image,
  formatFileSize,
  setSelectedImage,
  downloadImage,
  removeImage,
}: Props<T>) {
  return (
    <div className="glass-card group overflow-hidden transition-all duration-300 hover:shadow-glow hover:shadow-primary/5 hover:-translate-y-0.5 border-border/50">
      <div className="p-4 flex items-center gap-5">
        {/* Preview Container */}
        <div className="relative w-16 h-16 rounded-xl bg-muted/50 overflow-hidden shrink-0 border border-border/50 group-hover:border-primary/30 transition-colors">
          <img
            src={image.preview || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {image.status === "processing" && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground/90 truncate group-hover:text-primary transition-colors">
              {image.file.name}
            </h4>
            {image.useCustomSettings && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                Custom
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
            <span className="bg-muted/50 px-2 py-0.5 rounded text-[11px]">
              {formatFileSize(image.file.size)}
            </span>

            {image.status === "completed" && image.outputSize && (
              <>
                <span className="text-primary/40">→</span>
                <span className="text-primary bg-primary/5 px-2 py-0.5 rounded text-[11px] border border-primary/10">
                  {formatFileSize(image.outputSize)}
                </span>
                <span className="text-[10px] text-green-500 font-bold flex items-center gap-1 ml-1 animate-in fade-in slide-in-from-left-2 duration-500">
                  <Check className="w-3 h-3 stroke-3" />
                  READY
                </span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => setSelectedImage(image.id)}
            title="Advanced Settings"
          >
            <Settings2 className="w-4.5 h-4.5" />
          </Button>

          {image.status === "completed" && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 animate-in zoom-in"
              onClick={() => downloadImage(image)}
              title="Download File"
            >
              <Download className="w-4.5 h-4.5" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors ml-1"
            onClick={() => removeImage(image.id)}
            title="Remove Image"
          >
            <X className="w-4.5 h-4.5" />
          </Button>
        </div>
      </div>

      {/* Progress bar for processing state */}
      {image.status === "processing" && (
        <div className="h-0.5 w-full bg-muted overflow-hidden">
          <div className="h-full bg-primary animate-progress-line" />
        </div>
      )}
    </div>
  );
}
