import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have this or use standard input
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  IcoOptions,
  DEFAULT_ICO_OPTIONS,
  PRESET_OPTIONS,
  IcoPresetType,
} from "../types";

interface SettingsFormProps {
  initialOptions: IcoOptions;
  onSave: (options: IcoOptions) => void;
  onCancel: () => void; // Kept for prop compatibility, though usually handled by dialog
}

export function SettingsForm({
  initialOptions,
  onSave,
  onCancel,
}: SettingsFormProps) {
  const [options, setOptions] = useState<IcoOptions>(initialOptions);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    // Convert string back to number if it's a numeric preset
    const presetValue: IcoPresetType = isNaN(Number(val))
      ? (val as IcoPresetType)
      : Number(val);

    setOptions((prev) => ({ ...prev, preset: presetValue }));
  };

  const handleReset = () => {
    setOptions(DEFAULT_ICO_OPTIONS);
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-4 space-y-6">
        <h3 className="font-semibold text-base text-foreground/90">
          Image Options
        </h3>

        {/* Format Dropdown */}
        <div className="grid grid-cols-[140px_1fr] items-center gap-4">
          <Label
            htmlFor="format-select"
            className="text-right font-medium text-sm"
          >
            Format and Size
          </Label>
          <div className="relative">
            <select
              id="format-select"
              value={options.preset}
              onChange={handlePresetChange}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            >
              {PRESET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Custom Arrow for Styling */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.26618 11.9026 7.38064 11.95 7.49999 11.95C7.61933 11.95 7.73379 11.9026 7.81819 11.8182L10.0682 9.56819Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Auto Orient */}
        <div className="grid grid-cols-[140px_1fr] items-start gap-4">
          <Label
            htmlFor="auto-orient"
            className="text-right font-medium text-sm pt-1"
          >
            Auto Orient
          </Label>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="auto-orient"
              checked={options.autoOrient}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({
                  ...prev,
                  autoOrient: checked === true,
                }))
              }
              className="mt-0.5 border-primary text-primary focus:ring-primary"
            />
            <label
              htmlFor="auto-orient"
              className="text-sm text-muted-foreground leading-snug cursor-pointer"
            >
              Correctly orient the image using the gravity sensor data stored in
              EXIF
            </label>
          </div>
        </div>

        {/* Strip Metadata */}
        <div className="grid grid-cols-[140px_1fr] items-start gap-4">
          <Label
            htmlFor="strip-metadata"
            className="text-right font-medium text-sm pt-1"
          >
            Strip Metadata
          </Label>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="strip-metadata"
              checked={options.stripMetadata}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({
                  ...prev,
                  stripMetadata: checked === true,
                }))
              }
              className="mt-0.5 border-primary text-primary focus:ring-primary"
            />
            <label
              htmlFor="strip-metadata"
              className="text-sm text-muted-foreground leading-snug cursor-pointer"
            >
              Strip the image of any profiles, EXIF, and comments to reduce size
            </label>
          </div>
        </div>
      </div>

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
