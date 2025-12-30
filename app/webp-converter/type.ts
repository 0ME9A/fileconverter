import { TBaseImage } from "../_src/ts";

export type TConversionOptions = {
  quality: number;
  resize: "keep" | "custom";
  width?: number;
  height?: number;
  compression: "none" | "low" | "medium" | "high";
  backgroundColor: string;
  autoOrient: boolean;
  stripMetadata: boolean;
};

export type TImageFile = TBaseImage & {
  outputBlob?: Blob;
  options: TConversionOptions;
};
