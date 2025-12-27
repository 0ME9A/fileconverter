"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConversionOptions } from "@/app/webp-converter/page";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Settings2 } from "lucide-react";
import { useState } from "react";

interface AdvancedOptionsDialogProps {
  image: { id: string; file: File; options: ConversionOptions };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (options: ConversionOptions) => void;
}

export function AdvancedOptionsDialog({
  image,
  open,
  onOpenChange,
  onSave,
}: AdvancedOptionsDialogProps) {
  const [options, setOptions] = useState<ConversionOptions>(image.options);

  const handleSave = () => {
    onSave(options);
    onOpenChange(false);
  };

  const handleReset = () => {
    setOptions({
      quality: 80,
      resize: "keep",
      backgroundColor: "#FFFFFF",
      compression: "none",
      autoOrient: true,
      stripMetadata: true,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            <DialogTitle>Advanced Options</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-sm text-muted-foreground">
            File name:{" "}
            <span className="font-medium text-foreground">
              {image.file.name}
            </span>{" "}
            ({formatFileSize(image.file.size)})
          </div>

          {/* Image Options Section */}
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <h3 className="font-semibold mb-3">Image Options</h3>
            </div>

            {/* Quality Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Quality</Label>
                <span className="text-sm text-muted-foreground">
                  {options.quality}%
                </span>
              </div>
              <Slider
                value={[options.quality]}
                onValueChange={([value]) =>
                  setOptions((prev) => ({ ...prev, quality: value }))
                }
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Higher quality means larger file size but better image quality.
              </p>
            </div>

            {/* Resize Output Image */}
            <div className="space-y-2">
              <Label>Resize Output Image</Label>
              <Select
                value={options.resize}
                onValueChange={(value: "keep" | "custom") =>
                  setOptions((prev) => ({ ...prev, resize: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keep">Keep original size</SelectItem>
                  <SelectItem value="custom">Custom size</SelectItem>
                </SelectContent>
              </Select>
              {options.resize === "custom" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Width (px)</Label>
                    <Input
                      type="number"
                      placeholder="Width"
                      value={options.width || ""}
                      onChange={(e) =>
                        setOptions((prev) => ({
                          ...prev,
                          width: Number.parseInt(e.target.value) || undefined,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Height (px)</Label>
                    <Input
                      type="number"
                      placeholder="Height"
                      value={options.height || ""}
                      onChange={(e) =>
                        setOptions((prev) => ({
                          ...prev,
                          height: Number.parseInt(e.target.value) || undefined,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Choose a method if you want to resize the output image.
              </p>
            </div>

            {/* Background Color */}
            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={options.backgroundColor}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      backgroundColor: e.target.value,
                    }))
                  }
                  placeholder="#FFFFFF"
                />
                <Input
                  type="color"
                  value={
                    options.backgroundColor === "transparent"
                      ? "#FFFFFF"
                      : options.backgroundColor
                  }
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      backgroundColor: e.target.value,
                    }))
                  }
                  className="w-16 h-10 p-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                We will replace the transparent areas of your image with this
                color. Choose a color using the color picker or enter a hex
                color value.
              </p>
            </div>

            {/* Compress Output Image */}
            <div className="space-y-2">
              <Label>Compress Output Image</Label>
              <Select
                value={options.compression}
                onValueChange={(value: "none" | "low" | "medium" | "high") =>
                  setOptions((prev) => ({ ...prev, compression: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Compression</SelectItem>
                  <SelectItem value="low">Low Compression</SelectItem>
                  <SelectItem value="medium">Medium Compression</SelectItem>
                  <SelectItem value="high">High Compression</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose a compression method if you want to reduce the output
                file size.
              </p>
            </div>

            {/* Auto Orient */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="auto-orient"
                checked={options.autoOrient}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, autoOrient: !!checked }))
                }
              />
              <div className="space-y-1">
                <label
                  htmlFor="auto-orient"
                  className="text-sm font-medium cursor-pointer"
                >
                  Auto Orient
                </label>
                <p className="text-xs text-muted-foreground">
                  Correctly orient the image using the gravity sensor data
                  stored in EXIF
                </p>
              </div>
            </div>

            {/* Strip Metadata */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="strip-metadata"
                checked={options.stripMetadata}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, stripMetadata: !!checked }))
                }
              />
              <div className="space-y-1">
                <label
                  htmlFor="strip-metadata"
                  className="text-sm font-medium cursor-pointer"
                >
                  Strip Metadata
                </label>
                <p className="text-xs text-muted-foreground">
                  Strip the image of any profiles, EXIF, and comments to reduce
                  size
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={handleReset}>
              Reset all options
            </Button>
            <Button onClick={handleSave}>Apply Settings</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
