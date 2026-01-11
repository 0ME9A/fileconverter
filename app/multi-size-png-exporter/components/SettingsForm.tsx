import { useState } from "react";
import { Plus, X } from "lucide-react"; // 1. Added RotateCcw icon
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_OPTIONS, PngConversionOptions, PRESET_SIZES } from "../type";

interface SettingsFormProps {
  initialOptions: PngConversionOptions;
  onSave: (options: PngConversionOptions) => void;
  onCancel: () => void;
}

export function SettingsForm({
  initialOptions,
  onSave,
  onCancel,
}: SettingsFormProps) {
  const [options, setOptions] = useState<PngConversionOptions>(initialOptions);
  const [customSizeInput, setCustomSizeInput] = useState("");

  const toggleSize = (size: number) => {
    setOptions((prev) => ({
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b),
    }));
  };

  const addCustomSize = () => {
    const size = parseInt(customSizeInput);
    if (size > 0 && size <= 512 && !options.sizes.includes(size)) {
      setOptions((prev) => ({
        sizes: [...prev.sizes, size].sort((a, b) => a - b),
      }));
      setCustomSizeInput("");
    }
  };

  const addAllPresets = () => {
    const allSizes = Array.from(
      new Set([...options.sizes, ...PRESET_SIZES])
    ).sort((a, b) => a - b);
    setOptions({ sizes: allSizes });
  };

  // 3. New Reset Handler
  const handleReset = () => {
    setOptions(DEFAULT_OPTIONS);
    setCustomSizeInput("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-3 flex justify-between items-start">
        <div>
          <h3 className="font-semibold mb-1">Export Sizes</h3>
          <p className="text-xs text-muted-foreground">
            Width = Height. Each size is a separate PNG.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Preset Icon Sizes</Label>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_SIZES.map((size) => (
            <Button
              key={size}
              variant={options.sizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSize(size)}
            >
              {size}x{size}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={addAllPresets}
          className="w-full mt-2"
        >
          Add All Presets
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Custom Size</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="e.g. 512"
            value={customSizeInput}
            onChange={(e) => setCustomSizeInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomSize()}
            min="1"
            max="512"
          />
          <Button onClick={addCustomSize} variant="outline" className="gap-2">
            <Plus className="w-4 h-4" /> Add
          </Button>
        </div>
      </div>

      {options.sizes.length > 0 && (
        <div className="space-y-2">
          <Label>Selected Sizes ({options.sizes.length})</Label>
          <div className="flex flex-wrap gap-2">
            {options.sizes.map((size) => (
              <div
                key={size}
                className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                <span>
                  {size}x{size}
                </span>
                <button
                  onClick={() => toggleSize(size)}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="destructive" onClick={handleReset} className="mr-auto">
          Reset All Settings
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(options)}>Apply Settings</Button>
      </div>
    </div>
  );
}
