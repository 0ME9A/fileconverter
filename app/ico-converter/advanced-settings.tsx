"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TIcoConversionOptions } from "./type";
import { formatFileSize } from "../_src/utils";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";
import { useState } from "react";

type TProps = {
  image: { id: string; file: File; options: TIcoConversionOptions };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (options: TIcoConversionOptions) => void;
  sizes: number[];
};

export function AdvancedSettings({
  image,
  open,
  onOpenChange,
  onSave,
  sizes,
}: TProps) {
  const [options, setOptions] = useState<TIcoConversionOptions>(image.options);
  const defaultOptions: TIcoConversionOptions = {
    sizes: [16, 32, 48],
    generateMultipleSizes: true,
  };

  const handleSave = () => {
    if (options.sizes.length === 0) return;
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
            ({formatFileSize(image.file.size)})
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <h3 className="font-semibold mb-3">Icon Sizes</h3>
            </div>

            <div className="space-y-2">
              <Label>Select Icon Sizes</Label>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={
                      options.sizes.includes(size) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setOptions((prev) => ({
                        ...prev,
                        sizes: prev.sizes.includes(size)
                          ? prev.sizes.filter((s) => s !== size)
                          : [...prev.sizes, size].sort((a, b) => a - b),
                      }));
                    }}
                  >
                    {size}x{size}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Select one or more sizes for your icon. Common sizes: 16x16
                (favicon), 32x32, 48x48
              </p>
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
