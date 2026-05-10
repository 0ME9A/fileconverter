import { TBaseImage } from "../_src/ts";

export type TOutputFormat =
  | "jpg"
  | "png"
  | "webp"
  | "bmp"
  | "avif";

export const FORMAT_OPTIONS: {
  value: TOutputFormat;
  label: string;
  mime: string;
  supportsTransparency: boolean;
}[] = [
  { value: "jpg", label: "JPG", mime: "image/jpeg", supportsTransparency: false },
  { value: "png", label: "PNG", mime: "image/png", supportsTransparency: true },
  { value: "webp", label: "WebP", mime: "image/webp", supportsTransparency: true },
  { value: "bmp", label: "BMP", mime: "image/bmp", supportsTransparency: false },
  { value: "avif", label: "AVIF", mime: "image/avif", supportsTransparency: true },
];

export type TConversionOptions = {
  outputFormat: TOutputFormat;
  quality: number;
  resize: "keep" | "custom";
  width?: number;
  height?: number;
  backgroundColor: string;
};

export type TImageFile = TBaseImage & {
  outputBlob?: Blob;
  options: TConversionOptions;
};
