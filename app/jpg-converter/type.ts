import { TBaseImage } from "../_src/ts";

export type TConversionOptions = {
  quality: number;
  resize: "keep" | "custom";
  width?: number;
  height?: number;
  backgroundColor: string;
  compression: "none" | "low" | "medium" | "high";
};

export type TImageFile = TBaseImage & {
  outputBlob?: Blob;
  options: TConversionOptions;
};
