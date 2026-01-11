export type IcoPresetType = "favicon" | "windows" | "android" | number;

export interface IcoOptions {
  preset: IcoPresetType;
  customSize?: number; // Used if user selects "Custom"
  autoOrient: boolean;
  stripMetadata: boolean;
}

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "processing" | "completed";
  outputBlob: Blob | null;
  options: IcoOptions;
  useCustomSettings: boolean;
}

// Default is now the "Favicon" preset
export const DEFAULT_ICO_OPTIONS: IcoOptions = {
  preset: "favicon",
  autoOrient: true,
  stripMetadata: true,
};

// Map for the Dropdown UI
export const PRESET_OPTIONS = [
  { value: "favicon", label: "Favicon for websites" }, // Bundles 16, 32, 48
  { value: "windows", label: "ICO for Windows 7, 8, 10, Vista" }, // Bundles standard win sizes
  { value: 16, label: "16 x 16" },
  { value: 24, label: "24 x 24" },
  { value: 32, label: "32 x 32" },
  { value: 48, label: "48 x 48" },
  { value: 64, label: "64 x 64" },
  { value: 96, label: "96 x 96" },
  { value: 128, label: "128 x 128" },
  { value: 192, label: "192 x 192" },
  { value: 256, label: "256 x 256" },
];
