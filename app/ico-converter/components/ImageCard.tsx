/* eslint-disable @next/next/no-img-element */
import { Check, Download, Settings2, X, FileImage } from "lucide-react";
import { downloadIco } from "../utils";
import { ImageFile, PRESET_OPTIONS } from "../types"; // Import options to lookup labels
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatFileSize } from "@/app/_src/utils";

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
  // Helper to get display label
  const getPresetLabel = () => {
    const found = PRESET_OPTIONS.find((p) => p.value === image.options.preset);
    return found ? found.label : "Custom";
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden border">
          <img
            src={image.preview || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium truncate">{image.file.name}</p>
            {image.useCustomSettings && (
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                Custom
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span>{formatFileSize(image.file.size)}</span>

            <span>→</span>

            <span className="text-foreground font-medium flex items-center gap-1">
              <FileImage className="w-3 h-3" /> {getPresetLabel()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {image.status === "completed" && (
            <div className="flex items-center gap-1 text-sm text-green-600 mr-2">
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Converted</span>
            </div>
          )}
          {image.status === "processing" && (
            <div className="text-sm text-muted-foreground mr-2">
              Processing...
            </div>
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
              onClick={() => downloadIco(image)}
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
