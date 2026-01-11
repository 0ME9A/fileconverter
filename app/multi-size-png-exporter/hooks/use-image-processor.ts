import { ImageFile, PngConversionOptions } from "../type";
import { convertImageToPngs } from "../utils";
import { useState } from "react";

export function useImageProcessor() {
  const [images, setImages] = useState<ImageFile[]>([]);

  const addImages = (
    files: File[],
    MasterSettings: PngConversionOptions
  ) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImages: ImageFile[] = imageFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: "pending",
      outputBlobs: new Map(),
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

  const updateImageSettings = (id: string, options: PngConversionOptions) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, options, useCustomSettings: true, status: "pending" }
          : img
      )
    );
  };

  const applyMasterSettings = (options: PngConversionOptions) => {
    setImages((prev) =>
      prev.map((img) =>
        img.useCustomSettings
          ? img
          : { ...img, options: { ...options }, status: "pending" }
      )
    );
  };

  const processAllImages = async () => {
    for (const image of images) {
      if (image.status === "pending") {
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id ? { ...img, status: "processing" } : img
          )
        );

        try {
          const blobs = await convertImageToPngs(image);
          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id
                ? { ...img, status: "completed", outputBlobs: blobs }
                : img
            )
          );
        } catch (error) {
          console.error("Conversion error:", error);
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
