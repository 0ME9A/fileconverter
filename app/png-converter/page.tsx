"use client";
import React from "react";
import { TPngConversionOptions } from "./type";
import { AdvancedSettings } from "./advanced-settings";
import { MasterSettings } from "./master-settings";
import ConverterPage from "@/components/converter-page";
import { TConverterImage } from "@/hooks/use-converter";

const defaultOptions: TPngConversionOptions = {
  compressionLevel: 6,
  resize: "keep",
  preserveTransparency: true,
  stripMetadata: true,
};

export default function PngConverter() {
  const convertImage = async (
    imageFile: TConverterImage<TPngConversionOptions>,
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        let width = img.width;
        let height = img.height;

        if (
          imageFile.options.resize === "custom" &&
          imageFile.options.width &&
          imageFile.options.height
        ) {
          width = imageFile.options.width;
          height = imageFile.options.height;
        }

        canvas.width = width;
        canvas.height = height;

        if (!imageFile.options.preserveTransparency) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to convert image"));
            }
          },
          "image/png",
          1.0,
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageFile.preview;
    });
  };

  return (
    <ConverterPage<TPngConversionOptions>
      title="Image to PNG Converter"
      description="Convert your images to PNG format with transparency support. All processing happens locally in your browser for maximum privacy."
      convertedType="image/png"
      extension="png"
      defaultOptions={defaultOptions}
      convertFn={convertImage}
      AdvancedSettings={AdvancedSettings}
      MasterSettings={MasterSettings}
    />
  );
}
