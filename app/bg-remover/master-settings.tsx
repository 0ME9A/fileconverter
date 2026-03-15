"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TConversionOptions } from "./type";
import { Settings2, Plus, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  options: TConversionOptions;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (options: TConversionOptions) => void;
  onReset: () => void;
};

const PRESET_COLORS = [
  { name: "Transparent", value: "transparent" },
  { name: "White", value: "#FFFFFF" },
  { name: "Blue", value: "#0033a0" },
  { name: "Sky Blue", value: "#87ceeb" },
  { name: "Red", value: "#ff0000" },
];

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
            Apply these background and quality settings to all images in the batch.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <h3 className="font-semibold mb-3">Background Settings</h3>
            </div>

            <div className="space-y-4">
              <Label>Background Color</Label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setMasterOptions(prev => ({ ...prev, backgroundColor: color.value }))}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center overflow-hidden",
                      masterOptions.backgroundColor === color.value
                        ? "border-primary scale-110"
                        : "border-transparent shadow-sm"
                    )}
                    style={{
                      background: color.value === "transparent"
                        ? "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACBJREFUGF5jZEACDAwM/0AYmYAIGIkKMAIRMCADAwMDXyQDALB4Aw+0D/kIAAAAAElFTkSuQmCC')"
                        : color.value,
                    }}
                    title={color.name}
                  >
                    {masterOptions.backgroundColor === color.value && (
                      <Check className={cn("w-5 h-5", color.value === "#FFFFFF" || color.value === "transparent" ? "text-black" : "text-white")} />
                    )}
                  </button>
                ))}
                
                {/* Custom Color Picker */}
                <div className="relative w-10 h-10 rounded-full border-2 shadow-sm overflow-hidden flex items-center justify-center bg-zinc-800 hover:scale-110 transition-all cursor-pointer">
                  <input
                    type="color"
                    value={masterOptions.backgroundColor.startsWith("#") ? masterOptions.backgroundColor : "#ffffff"}
                    onChange={(e) => setMasterOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full scale-150"
                  />
                  <Plus className="w-5 h-5 text-white pointer-events-none" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Images with transparent backgrounds will be saved as <strong>PNG</strong>. Color-filled backgrounds will be saved as <strong>JPG</strong>.
              </p>
            </div>

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
              <Button onClick={handleSave}>Apply to All</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
