import { ImageFile, IcoOptions } from "../types";
import { convertToIco } from "../utils";
import { useState } from "react";

export function useIcoProcessor() {
  const [images, setImages] = useState<ImageFile[]>([]);

  const addImages = (files: File[], MasterSettings: IcoOptions) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImages: ImageFile[] = imageFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: "pending",
      outputBlob: null,
      options: { ...MasterSettings },
      useCustomSettings: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  const updateImageSettings = (id: string, options: IcoOptions) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, options, useCustomSettings: true, status: "pending" }
          : img,
      ),
    );
  };

  const applyMasterSettings = (options: IcoOptions) => {
    setImages((prev) =>
      prev.map((img) =>
        img.useCustomSettings
          ? img
          : { ...img, options: { ...options }, status: "pending" },
      ),
    );
  };

  const processAllImages = async () => {
    for (const image of images) {
      if (image.status === "pending") {
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id ? { ...img, status: "processing" } : img,
          ),
        );

        try {
          const startTime = performance.now();
          const blob = await convertToIco(image);
          const endTime = performance.now();

          // Log stats
          import("@/lib/stats-client").then(({ logConversionStat }) => {
            logConversionStat({
              originalType: image.file.type,
              convertedType: "image/x-icon",
              processingTime: Math.round(endTime - startTime),
              fileSize: image.file.size,
            });
          });

          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id
                ? { ...img, status: "completed", outputBlob: blob }
                : img,
            ),
          );
        } catch (error) {
          console.error("Conversion error:", error);
          // Ideally handle error state here
        }
      }
    }
  };

  return {
    images,
    addImages,
    removeImage,
    clearAll,
    updateImageSettings,
    applyMasterSettings,
    processAllImages,
  };
}
