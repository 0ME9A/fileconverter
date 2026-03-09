"use client";
import React from "react";
import { TConversionOptions } from "./type";
import { AdvancedSettings } from "./advanced-settings";
import { MasterSettings } from "./master-settings";
import ConverterPage from "@/components/converter-page";
import { TConverterImage } from "@/hooks/use-converter";

const defaultOptions: TConversionOptions = {
  quality: 80,
  resize: "keep",
  backgroundColor: "#FFFFFF",
  compression: "none",
  autoOrient: true,
  stripMetadata: true,
};

export default function WebpConverter() {
  const convertImage = async (
    imageFile: TConverterImage<TConversionOptions>,
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

        if (imageFile.options.backgroundColor !== "transparent") {
          ctx.fillStyle = imageFile.options.backgroundColor;
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        let quality = imageFile.options.quality / 100;
        switch (imageFile.options.compression) {
          case "low":
            quality *= 0.9;
            break;
          case "medium":
            quality *= 0.7;
            break;
          case "high":
            quality *= 0.5;
            break;
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to convert image"));
            }
          },
          "image/webp",
          quality,
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageFile.preview;
    });
  };

  return (
    <ConverterPage<TConversionOptions>
      title="Image to WebP Converter"
      description="Convert your images to WebP format with advanced options. All processing happens locally in your browser for maximum privacy and speed."
      convertedType="image/webp"
      extension="webp"
      defaultOptions={defaultOptions}
      convertFn={convertImage}
      AdvancedSettings={AdvancedSettings}
      MasterSettings={MasterSettings}
    />
  );
}
