/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Upload,
  Settings2,
  Download,
  X,
  ImageIcon,
  Check,
  Trash2,
} from "lucide-react";
import { UniversalSettingsDialog } from "@/components/universal-settings-dialog";
import { AdvancedOptionsDialog } from "@/components/advanced-options-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import type React from "react";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "processing" | "completed";
  outputBlob?: Blob;
  outputSize?: number;
  options: ConversionOptions;
  useCustomSettings: boolean;
}

export interface ConversionOptions {
  quality: number;
  resize: "keep" | "custom";
  width?: number;
  height?: number;
  backgroundColor: string;
  compression: "none" | "low" | "medium" | "high";
  autoOrient: boolean;
  stripMetadata: boolean;
}

const defaultOptions: ConversionOptions = {
  quality: 80,
  resize: "keep",
  backgroundColor: "#FFFFFF",
  compression: "none",
  autoOrient: true,
  stripMetadata: true,
};

export default function ImageConverter() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [universalSettings, setUniversalSettings] = useState<ConversionOptions>(
    { ...defaultOptions }
  );
  const [showUniversalSettings, setShowUniversalSettings] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImages: ImageFile[] = imageFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: "pending",
      options: { ...universalSettings },
      useCustomSettings: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const convertImage = async (imageFile: ImageFile): Promise<Blob> => {
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
          quality
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

  const downloadImage = (image: ImageFile) => {
    if (!image.outputBlob) {
      return;
    }

    const url = URL.createObjectURL(image.outputBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = image.file.name.replace(/\.[^/.]+$/, "") + ".webp";
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
    setUniversalSettings(resetOptions);
    setImages((prev) =>
      prev.map((img) =>
        img.useCustomSettings
          ? img
          : { ...img, options: resetOptions, status: "pending" }
      )
    );
  };

  const handleUniversalSettingsSave = (options: ConversionOptions) => {
    setUniversalSettings(options);
    setImages((prev) =>
      prev.map((img) =>
        img.useCustomSettings
          ? img
          : { ...img, options: { ...options }, status: "pending" }
      )
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Image to WebP Converter
          </h1>
          <p className="text-muted-foreground">
            Convert your images to WebP format with advanced options. All
            processing happens locally in your browser.
          </p>
        </div>

        {/* Upload Area */}
        <Card
          className={`border-2 border-dashed transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="p-12 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Drop your images here
              </h3>
              <p className="text-sm text-muted-foreground">
                or click to browse
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="file-input"
            />
            <Button asChild>
              <label htmlFor="file-input" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Select Images
              </label>
            </Button>
          </div>
        </Card>

        {/* Image List */}
        {images.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Images ({images.length})
              </h2>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setShowUniversalSettings(true)}
                  className="gap-2"
                >
                  <Settings2 className="w-4 h-4" />
                  Universal Settings
                </Button>
                <Button
                  onClick={handleConvertAll}
                  disabled={images.every((img) => img.status === "completed")}
                >
                  Convert All
                </Button>
                <Button
                  onClick={downloadAll}
                  variant="outline"
                  disabled={!images.some((img) => img.status === "completed")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="gap-2 bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {images.map((image) => (
                <Card key={image.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={image.preview || "/placeholder.svg"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">
                          {image.file.name}
                        </p>
                        {image.useCustomSettings && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Custom
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{formatFileSize(image.file.size)}</span>
                        {image.outputSize && (
                          <>
                            <span>→</span>
                            <span className="text-primary">
                              {formatFileSize(image.outputSize)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {image.status === "completed" && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <Check className="w-4 h-4" />
                          <span>Converted</span>
                        </div>
                      )}
                      {image.status === "processing" && (
                        <div className="text-sm text-muted-foreground">
                          Processing...
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedImage(image.id)}
                      >
                        <Settings2 className="w-4 h-4" />
                      </Button>
                      {image.status === "completed" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => downloadImage(image)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {images.length === 0 && (
          <Card className="p-12">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No images yet</h3>
              <p className="text-sm text-muted-foreground">
                Upload some images to get started
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Advanced Options Dialog for Individual Images */}
      {selectedImage && (
        <AdvancedOptionsDialog
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

      <UniversalSettingsDialog
        options={universalSettings}
        open={showUniversalSettings}
        onOpenChange={setShowUniversalSettings}
        onSave={handleUniversalSettingsSave}
        onReset={resetAllSettings}
      />
    </div>
  );
}
