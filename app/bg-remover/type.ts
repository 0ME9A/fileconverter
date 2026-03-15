export type TConversionOptions = {
  quality: number;
  backgroundColor: string; // "transparent" or hex color
};

export type TImageFile = {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "processing" | "completed";
  options: TConversionOptions;
  useCustomSettings: boolean;
  outputBlob?: Blob;
  outputSize?: number;
};
