/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { TConversionOptions, TImageFile } from "./type";
import { AdvancedSettings } from "./advanced-settings";
import { MasterSettings } from "./master-settings";
import { formatFileSize } from "../_src/utils";
import EmptyStateCard from "@/components/ui/empty-state-card";
import ImageActionArea from "@/components/image-action-area";
import ImageListCard from "@/components/ui/image-list-card";
import PageHeader from "@/components/ui/page-header";
import UploadArea from "@/components/upload-area";
import { removeImageBackground } from "@/lib/services/BackgroundRemover";
import confetti from "canvas-confetti";
import { logConversionStat } from "@/lib/stats-client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/faq-section";

const defaultOptions: TConversionOptions = {
  quality: 90,
  backgroundColor: "transparent",
};

export default function BGRemoverPage() {
  const [images, setImages] = useState<TImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<TImageFile | null>(null);
  const [masterSettings, setMasterSettings] = useState<TConversionOptions>({
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

  const processImage = async (imageFile: TImageFile) => {
    try {
      // 1. Remove Background
      const transparentBlob = await removeImageBackground(
        imageFile.preview,
        (p) => {
          // Optional: Update progress for each image
          console.log(`Processing ${imageFile.file.name}: ${p.progress}%`);
        },
      );

      // 2. Load the transparent image into memory
      const img = new Image();
      const transparentUrl = URL.createObjectURL(transparentBlob);
      img.src = transparentUrl;
      await new Promise((resolve) => (img.onload = resolve));

      // 3. Create Canvas and apply Background
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context failed");

      const isTransparent = imageFile.options.backgroundColor === "transparent";

      if (!isTransparent) {
        ctx.fillStyle = imageFile.options.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      // 4. Output according to background selection
      const outputType = isTransparent ? "image/png" : "image/jpeg";
      const quality = imageFile.options.quality / 100;

      const outputBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob!),
          outputType,
          outputType === "image/jpeg" ? quality : undefined,
        );
      });

      URL.revokeObjectURL(transparentUrl);
      return outputBlob;
    } catch (error) {
      console.error("Processing error:", error);
      throw error;
    }
  };

  const handleProcessAll = async () => {
    for (const image of images) {
      if (image.status === "pending") {
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id ? { ...img, status: "processing" } : img,
          ),
        );

        try {
          const startTime = performance.now();
          const blob = await processImage(image);
          const endTime = performance.now();

          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id
                ? {
                    ...img,
                    status: "completed",
                    outputBlob: blob,
                    outputSize: blob.size,
                  }
                : img,
            ),
          );

          // Log individual conversion stat
          logConversionStat({
            originalType: image.file.type || "image/png",
            convertedType:
              image.options.backgroundColor === "transparent"
                ? "image/png"
                : "image/jpeg",
            processingTime: Math.round(endTime - startTime),
            fileSize: image.file.size,
          });
        } catch (error) {
          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id ? { ...img, status: "pending" } : img,
            ),
          );
        }
      }
    }
    confetti();
  };

  const viewImage = (image: TImageFile) => {
    if (!image.outputBlob) return;
    setPreviewImage(image);
  };

  const downloadImage = (image: TImageFile) => {
    if (!image.outputBlob) return;
    const isTransparent = image.options.backgroundColor === "transparent";
    const extension = isTransparent ? ".png" : ".jpg";

    const url = URL.createObjectURL(image.outputBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = image.file.name.replace(/\.[^/.]+$/, "") + extension;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    const completedImages = images.filter((img) => img.status === "completed");
    completedImages.forEach((image, index) => {
      setTimeout(() => downloadImage(image), index * 200);
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
    setMasterSettings({ ...defaultOptions });
    setImages((prev) =>
      prev.map((img) =>
        img.useCustomSettings
          ? img
          : { ...img, options: { ...defaultOptions }, status: "pending" },
      ),
    );
  };

  const handleMasterSettingsSave = (options: TConversionOptions) => {
    setMasterSettings(options);
    setImages((prev) =>
      prev.map((img) =>
        img.useCustomSettings
          ? img
          : { ...img, options: { ...options }, status: "pending" },
      ),
    );
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <PageHeader
          title={"AI Background Remover"}
          desc={
            "Remove backgrounds from multiple images at once. Choose a custom background color or keep it transparent."
          }
        />

        <UploadArea
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          handleFiles={handleFiles}
          handleFileInput={handleFileInput}
          highlights={[
            "Batch AI Removal",
            "High Quality JPG/PNG",
            "Custom BG Colors",
            "100% Browser Based",
          ]}
        />

        {images.length > 0 && (
          <div className="space-y-4">
            <ImageActionArea<TImageFile>
              images={images}
              setShowMasterSettings={setShowMasterSettings}
              handleConvertAll={handleProcessAll}
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
                  viewImage={viewImage}
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
                  : img,
              ),
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

      <Dialog
        open={!!previewImage}
        onOpenChange={(open) => !open && setPreviewImage(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl ring-1 ring-white/10">
          <DialogHeader className="p-4 border-b border-border/50 bg-muted/30">
            <DialogTitle className="text-sm font-bold tracking-tight uppercase flex items-center justify-between">
              <span>Preview Result</span>
              {/* <span className="text-muted-foreground font-normal lowercase">{previewImage?.file.name}</span> */}
            </DialogTitle>
          </DialogHeader>

          <div className="relative w-full aspect-square md:aspect-auto md:h-[70vh] flex items-center justify-center p-6 bg-checkerboard">
            {previewImage?.outputBlob && (
              <img
                src={URL.createObjectURL(previewImage.outputBlob)}
                alt="Preview"
                className="max-w-full max-h-full object-contain rounded-md shadow-2xl animate-in zoom-in duration-300"
              />
            )}
          </div>

          <div className="p-4 bg-muted/30 border-t border-border/50 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">
                Format
              </span>
              <span className="text-xs font-bold uppercase">
                {previewImage?.options.backgroundColor === "transparent"
                  ? "PNG (Lossless)"
                  : "JPG (Optimized)"}
              </span>
            </div>
            <Button
              size="sm"
              onClick={() => previewImage && downloadImage(previewImage)}
              className="font-bold uppercase tracking-tighter"
            >
              Download This Image
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-24 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <FAQSection className="py-24" limit={6} />
        </div>
      </div>
    </main>
  );
}
