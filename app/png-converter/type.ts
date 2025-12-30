import { TBaseImage } from "../_src/ts";

export type TPngConversionOptions = {
  compressionLevel: number;
  resize: "keep" | "custom";
  width?: number;
  height?: number;
  preserveTransparency: boolean;
  stripMetadata: boolean;
};

export type TImageFile = TBaseImage & {
  outputBlob?: Blob;
  options: TPngConversionOptions;
};
