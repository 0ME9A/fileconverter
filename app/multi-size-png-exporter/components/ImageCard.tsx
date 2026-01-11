/* eslint-disable @next/next/no-img-element */
import { formatFileSize, downloadImageBlobs } from "../utils";
import { Check, Download, Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageFile } from "../type";

interface ImageCardProps {
  image: ImageFile;
  onRemove: (id: string) => void;
  onSettingsClick: (id: string) => void;
}

export function ImageCard({
  image,
  onRemove,
  onSettingsClick,
}: ImageCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
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
            {image.status === "completed" && (
              <>
                <span>→</span>
                <span className="text-primary">
                  {image.options.sizes.length} PNG files
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
            onClick={() => onSettingsClick(image.id)}
          >
            <Settings2 className="w-4 h-4" />
          </Button>
          {image.status === "completed" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => downloadImageBlobs(image)}
            >
              <Download className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(image.id)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
