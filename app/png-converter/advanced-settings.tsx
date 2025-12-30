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
import { formatFileSize } from "../_src/utils";
import { TPngConversionOptions } from "./type";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Settings2 } from "lucide-react";
import { useState } from "react";

type TProps = {
  image: { id: string; file: File; options: TPngConversionOptions };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (options: TPngConversionOptions) => void;
};

export function AdvancedSettings({
  image,
  open,
  onOpenChange,
  onSave,
}: TProps) {
  const [options, setOptions] = useState<TPngConversionOptions>(image.options);

  const defaultOptions: TPngConversionOptions = {
    compressionLevel: 6,
    resize: "keep",
    preserveTransparency: true,
    stripMetadata: true,
  };

  const handleSave = () => {
    onSave(options);
    onOpenChange(false);
  };

  const handleReset = () => {
    setOptions(defaultOptions);
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
            ( ({formatFileSize(image.file.size)}) )
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <h3 className="font-semibold mb-3">Image Options</h3>
            </div>

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
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="preserve-transparency"
                checked={options.preserveTransparency}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({
                    ...prev,
                    preserveTransparency: !!checked,
                  }))
                }
              />
              <div className="space-y-1">
                <label
                  htmlFor="preserve-transparency"
                  className="text-sm font-medium cursor-pointer"
                >
                  Preserve Transparency
                </label>
                <p className="text-xs text-muted-foreground">
                  Keep transparent areas transparent in the output image
                </p>
              </div>
            </div>

            {/* Strip Metadata */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="strip-metadata"
                checked={options.stripMetadata}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({
                    ...prev,
                    stripMetadata: !!checked,
                  }))
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
                  Remove EXIF and metadata to reduce file size
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={handleReset}>
              Reset options
            </Button>
            <Button onClick={handleSave}>Apply Settings</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
