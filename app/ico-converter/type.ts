import { TBaseImage } from "../_src/ts";

export type TIcoConversionOptions = {
  sizes: number[];
  generateMultipleSizes: boolean;
};

export type TImageFile = TBaseImage & {
  outputBlobs?: Map<number, Blob>;
  options: TIcoConversionOptions;
};
