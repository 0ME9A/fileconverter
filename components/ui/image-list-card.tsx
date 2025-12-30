"use client";
/* eslint-disable @next/next/no-img-element */

import { Check, Download, Settings2, X } from "lucide-react";
import { TBaseImage } from "@/app/_src/ts";
import { Button } from "./button";
import { Card } from "./card";
import React from "react";

type Props<T extends TBaseImage> = {
  image: T;
  formatFileSize: (bytes: number) => string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
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
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden">
          <img
            src={image.preview || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium truncate">{image.file.name}</p>

            {image.useCustomSettings && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Custom
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{formatFileSize(image.file.size)}</span>

            {image.outputSize && (
              <>
                <span>→</span>
                <span className="text-primary">
                  {formatFileSize(image.outputSize)}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {image.status === "completed" && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <Check className="w-4 h-4" />
              <span>Converted</span>
            </div>
          )}

          {image.status === "processing" && (
            <div className="text-sm text-muted-foreground">Processing...</div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedImage(image.id)}
          >
            <Settings2 className="w-4 h-4" />
          </Button>

          {image.status === "completed" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => downloadImage(image)}
            >
              <Download className="w-4 h-4" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeImage(image.id)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
