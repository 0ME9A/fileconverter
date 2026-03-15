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
import { TConversionOptions, TImageFile } from "./type";
import { Settings2, Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type Props = {
  image: TImageFile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (options: TConversionOptions) => void;
};

const PRESET_COLORS = [
  { name: "Transparent", value: "transparent" },
  { name: "White", value: "#FFFFFF" },
  { name: "Blue", value: "#0033a0" },
  { name: "Sky Blue", value: "#87ceeb" },
  { name: "Red", value: "#ff0000" },
];

export function AdvancedSettings({
  image,
  open,
  onOpenChange,
  onSave,
}: Props) {
  const [localOptions, setLocalOptions] = useState<TConversionOptions>(image.options);

  useEffect(() => {
    if (open) {
      setLocalOptions(image.options);
    }
  }, [open, image.options]);

  const handleSave = () => {
    onSave(localOptions);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            <DialogTitle>Image Settings</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Customize settings for this specific image.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center bg-muted/30 rounded-lg p-4 overflow-hidden">
            <img
              src={image.preview}
              alt="Preview"
              className="max-h-48 object-contain rounded shadow-sm"
            />
          </div>

          <div className="space-y-4">
            <Label>Background Color</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setLocalOptions(prev => ({ ...prev, backgroundColor: color.value }))}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center overflow-hidden",
                    localOptions.backgroundColor === color.value
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
                  {localOptions.backgroundColor === color.value && (
                    <Check className={cn("w-5 h-5", color.value === "#FFFFFF" || color.value === "transparent" ? "text-black" : "text-white")} />
                  )}
                </button>
              ))}
              
              <div className="relative w-10 h-10 rounded-full border-2 shadow-sm overflow-hidden flex items-center justify-center bg-zinc-800 hover:scale-110 transition-all cursor-pointer">
                <input
                  type="color"
                  value={localOptions.backgroundColor.startsWith("#") ? localOptions.backgroundColor : "#ffffff"}
                  onChange={(e) => setLocalOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full scale-150"
                />
                <Plus className="w-5 h-5 text-white pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Quality</Label>
              <span className="text-sm text-muted-foreground">
                {localOptions.quality}%
              </span>
            </div>
            <Slider
              value={[localOptions.quality]}
              onValueChange={([value]) =>
                setLocalOptions((prev) => ({ ...prev, quality: value }))
              }
              min={1}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
