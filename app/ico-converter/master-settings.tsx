"use client";
import { TIcoConversionOptions } from "./type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";
import { useState } from "react";

type TProps = {
  options: TIcoConversionOptions;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (options: TIcoConversionOptions) => void;
  sizes: number[];
  onReset: () => void;
};

export default function MasterSettings({
  options,
  open,
  onOpenChange,
  onSave,
  onReset,
  sizes,
}: TProps) {
  const [masterOptions, setMasterOptions] =
    useState<TIcoConversionOptions>(options);

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
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <h3 className="font-semibold mb-3">Default Icon Sizes</h3>
            </div>

            <div className="space-y-2">
              <Label>Select Icon Sizes</Label>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={
                      masterOptions.sizes.includes(size) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setMasterOptions((prev) => ({
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
                Select default sizes for all icons. Recommended: 16x16, 32x32,
                48x48
              </p>
            </div>
          </div>

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
