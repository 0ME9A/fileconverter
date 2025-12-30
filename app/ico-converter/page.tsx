"use client";
import type React from "react";
import { TIcoConversionOptions, TImageFile } from "./type";
import { AdvancedSettings } from "./advanced-settings";
import { formatFileSize } from "../_src/utils";
import { useState } from "react";
import EmptyStateCard from "@/components/ui/empty-state-card";
import ImageActionArea from "@/components/image-action-area";
import ImageListCard from "@/components/ui/image-list-card";
import PageHeader from "@/components/ui/page-header";
import UploadArea from "@/components/upload-area";
import MasterSettings from "./master-settings";

const defaultOptions: TIcoConversionOptions = {
  sizes: [16, 32, 48],
  generateMultipleSizes: true,
};

const availableSizes = [16, 24, 32, 48, 64, 128, 256];

export default function IcoConverter() {
  const [images, setImages] = useState<TImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [masterSettings, setMasterSettings] = useState<TIcoConversionOptions>({
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

  const convertImage = async (
    imageFile: TImageFile
  ): Promise<Map<number, Blob>> => {
    const outputBlobs = new Map<number, Blob>();

    for (const size of imageFile.options.sizes) {
      const blob = await new Promise<Blob>((resolve, reject) => {
        const img = document.createElement("img");
        img.crossOrigin = "anonymous";

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          canvas.width = size;
          canvas.height = size;

          ctx.drawImage(img, 0, 0, size, size);

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

      outputBlobs.set(size, blob);
    }

    return outputBlobs;
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
          const blobs = await convertImage(image);
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

  const downloadImage = (image: TImageFile, size?: number) => {
    if (!image.outputBlobs) return;

    if (size) {
      const blob = image.outputBlobs.get(size);
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        image.file.name.replace(/\.[^/.]+$/, "") + `_${size}x${size}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Download all sizes
      image.outputBlobs.forEach((blob, size) => {
        setTimeout(() => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download =
            image.file.name.replace(/\.[^/.]+$/, "") + `_${size}x${size}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, size * 10);
      });
    }
  };

  const downloadAll = () => {
    const completedImages = images.filter((img) => img.status === "completed");
    completedImages.forEach((image, index) => {
      setTimeout(() => downloadImage(image), index * 500);
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

  const handleMasterSettingsSave = (options: TIcoConversionOptions) => {
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
          title={"Image to ICO Converter"}
          desc={
            "Convert your images to ICO format with multiple sizes. Perfect for favicons and app icons."
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
            <ImageActionArea<TImageFile>
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
                  downloadImage={downloadImage}
                  removeImage={removeImage}
                />
              ))}
            </div>
          </div>
        )}
        {images.length === 0 && <EmptyStateCard />}
      </div>

      {/* Advanced Options Dialog */}
      {selectedImage && (
        <AdvancedSettings
          image={images.find((img) => img.id === selectedImage)!}
          open={!!selectedImage}
          onOpenChange={(open) => !open && setSelectedImage(null)}
          sizes={availableSizes}
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

      {/* Universal Settings Dialog */}
      <MasterSettings
        options={masterSettings}
        open={showMasterSettings}
        onOpenChange={setShowMasterSettings}
        onSave={handleMasterSettingsSave}
        onReset={resetAllSettings}
        sizes={availableSizes}
      />
    </main>
  );
}
