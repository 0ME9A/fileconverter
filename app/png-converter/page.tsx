"use client";
import type React from "react";
import { TImageFile, TPngConversionOptions } from "./type";
import { AdvancedSettings } from "./advanced-settings";
import { MasterSettings } from "./master-settings";
import { formatFileSize } from "../_src/utils";
import { useState } from "react";
import EmptyStateCard from "@/components/ui/empty-state-card";
import ImageActionArea from "@/components/image-action-area";
import ImageListCard from "@/components/ui/image-list-card";
import PageHeader from "@/components/ui/page-header";
import UploadArea from "@/components/upload-area";

const defaultOptions: TPngConversionOptions = {
  compressionLevel: 6,
  resize: "keep",
  preserveTransparency: true,
  stripMetadata: true,
};

export default function PngConverter() {
  const [images, setImages] = useState<TImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [masterSettings, setMasterSettings] = useState<TPngConversionOptions>({
    ...defaultOptions,
  });
  const [showMasterSettings, setShowMasterSettings] = useState(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImages: TImageFile[] = imageFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: "pending",
      options: { ...masterSettings },
      useCustomSettings: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const convertImage = async (imageFile: TImageFile): Promise<Blob> => {
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

        // PNG compression is lossless, quality is always 1.0
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to convert image"));
            }
          },
          "image/png",
          1.0
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageFile.preview;
    });
  };

  const handleConvertAll = async () => {
    for (const image of images) {
      if (image.status === "pending") {
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id ? { ...img, status: "processing" } : img
          )
        );

        try {
          const blob = await convertImage(image);
          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id
                ? {
                    ...img,
                    status: "completed",
                    outputBlob: blob,
                    outputSize: blob.size,
                  }
                : img
            )
          );
        } catch (error) {
          console.error("Conversion error:", error);
        }
      }
    }
  };

  const downloadImage = (image: TImageFile) => {
    if (!image.outputBlob) return;

    const url = URL.createObjectURL(image.outputBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = image.file.name.replace(/\.[^/.]+$/, "") + ".png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    const completedImages = images.filter((img) => img.status === "completed");
    completedImages.forEach((image, index) => {
      setTimeout(() => downloadImage(image), index * 100);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  const resetAllSettings = () => {
    const resetOptions = { ...defaultOptions };
    setMasterSettings(resetOptions);
    setImages((prev) =>
      prev.map((img) =>
        img.useCustomSettings
          ? img
          : { ...img, options: resetOptions, status: "pending" }
      )
    );
  };

  const handleMasterSettingsSave = (options: TPngConversionOptions) => {
    setMasterSettings(options);
    setImages((prev) =>
      prev.map((img) =>
        img.useCustomSettings
          ? img
          : { ...img, options: { ...options }, status: "pending" }
      )
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        <PageHeader
          title={"Image to PNG Converter"}
          desc={
            "Convert your images to PNG format with transparency support. All processing happens locally in your browser."
          }
        />

        <UploadArea
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          handleFiles={handleFiles}
          handleFileInput={handleFileInput}
        />

        {images.length > 0 && (
          <div className="space-y-4">
            <ImageActionArea
              images={images}
              setShowMasterSettings={setShowMasterSettings}
              handleConvertAll={handleConvertAll}
              downloadAll={downloadAll}
              clearAll={clearAll}
            />
            <div className="space-y-2">
              {images.map((image) => (
                <ImageListCard<TImageFile>
                  key={image.id}
                  image={image}
                  formatFileSize={formatFileSize}
                  setSelectedImage={setSelectedImage}
                  downloadImage={downloadAll}
                  removeImage={removeImage}
                />
              ))}
            </div>
          </div>
        )}

        {images.length === 0 && <EmptyStateCard />}
      </div>

      {selectedImage && (
        <AdvancedSettings
          image={images.find((img) => img.id === selectedImage)!}
          open={!!selectedImage}
          onOpenChange={(open) => !open && setSelectedImage(null)}
          onSave={(options) => {
            setImages((prev) =>
              prev.map((img) =>
                img.id === selectedImage
                  ? {
                      ...img,
                      options,
                      status: "pending",
                      useCustomSettings: true,
                    }
                  : img
              )
            );
            setSelectedImage(null);
          }}
        />
      )}

      <MasterSettings
        options={masterSettings}
        open={showMasterSettings}
        onOpenChange={setShowMasterSettings}
        onSave={handleMasterSettingsSave}
        onReset={resetAllSettings}
      />
    </main>
  );
}
