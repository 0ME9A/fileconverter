export interface PngConversionOptions {
  sizes: number[];
}

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "processing" | "completed";
  outputBlobs: Map<number, Blob>;
  options: PngConversionOptions;
  useCustomSettings: boolean;
}

export const DEFAULT_OPTIONS: PngConversionOptions = {
  sizes: [16, 32, 48],
};

export const PRESET_SIZES = [16, 24, 32, 48, 64, 72, 96, 128, 192, 256, 512];
