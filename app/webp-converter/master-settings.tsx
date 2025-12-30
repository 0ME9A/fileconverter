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

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TConversionOptions } from "./type";
import { Settings2 } from "lucide-react";
import { useState } from "react";

type Props = {
  options: TConversionOptions;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (options: TConversionOptions) => void;
  onReset: () => void;
};

export function MasterSettings({
  options,
  open,
  onOpenChange,
  onSave,
  onReset,
}: Props) {
  const [masterOptions, setMasterOptions] =
    useState<TConversionOptions>(options);

  const handleSave = () => {
    onSave(masterOptions);
    onOpenChange(false);
  };

  const handleReset = () => {
    onReset();
    onOpenChange(false);
  };

  // Update local options when dialog opens with new values
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setMasterOptions(options);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            <DialogTitle>Master Settings</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            These settings will apply to all images by default. Individual
            images can override these settings.
          </p>
        </DialogHeader>

        <div className="space-y-6">
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
                  {masterOptions.quality}%
                </span>
              </div>
              <Slider
                value={[masterOptions.quality]}
                onValueChange={([value]) =>
                  setMasterOptions((prev) => ({ ...prev, quality: value }))
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
                value={masterOptions.resize}
                onValueChange={(value: "keep" | "custom") =>
                  setMasterOptions((prev) => ({ ...prev, resize: value }))
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
              {masterOptions.resize === "custom" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Width (px)</Label>
                    <Input
                      type="number"
                      placeholder="Width"
                      value={masterOptions.width || ""}
                      onChange={(e) =>
                        setMasterOptions((prev) => ({
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
                      value={masterOptions.height || ""}
                      onChange={(e) =>
                        setMasterOptions((prev) => ({
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
                  value={masterOptions.backgroundColor}
                  onChange={(e) =>
                    setMasterOptions((prev) => ({
                      ...prev,
                      backgroundColor: e.target.value,
                    }))
                  }
                  placeholder="#FFFFFF"
                />
                <Input
                  type="color"
                  value={
                    masterOptions.backgroundColor === "transparent"
                      ? "#FFFFFF"
                      : masterOptions.backgroundColor
                  }
                  onChange={(e) =>
                    setMasterOptions((prev) => ({
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
                value={masterOptions.compression}
                onValueChange={(value: "none" | "low" | "medium" | "high") =>
                  setMasterOptions((prev) => ({ ...prev, compression: value }))
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
                id="universal-auto-orient"
                checked={masterOptions.autoOrient}
                onCheckedChange={(checked) =>
                  setMasterOptions((prev) => ({
                    ...prev,
                    autoOrient: !!checked,
                  }))
                }
              />
              <div className="space-y-1">
                <label
                  htmlFor="universal-auto-orient"
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
                id="universal-strip-metadata"
                checked={masterOptions.stripMetadata}
                onCheckedChange={(checked) =>
                  setMasterOptions((prev) => ({
                    ...prev,
                    stripMetadata: !!checked,
                  }))
                }
              />
              <div className="space-y-1">
                <label
                  htmlFor="universal-strip-metadata"
                  className="text-sm font-medium cursor-pointer"
                >
                  Strip Metadata
                </label>
                <p className="text-xs text-muted-foreground">
                  Remove EXIF and metadata to reduce file size
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="destructive" onClick={handleReset}>
              Reset All Settings
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Apply to All Images</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
