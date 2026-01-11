"use client";

import { useImageProcessor } from "./hooks/use-image-processor";
import { DEFAULT_OPTIONS, PngConversionOptions } from "./type";
import { Settings2, Download, Trash2 } from "lucide-react";
import { SettingsForm } from "./components/SettingsForm";
import { ImageCard } from "./components/ImageCard";
import { DropZone } from "./components/DropZone";
import { Button } from "@/components/ui/button";
import { downloadImageBlobs } from "./utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmptyStateCard from "@/components/ui/empty-state-card";
import PageHeader from "@/components/ui/page-header";

export default function MultiSizePngExporter() {
  const {
    images,
    addImages,
    removeImage,
    clearAll,
    updateImageSettings,
    applyMasterSettings,
    processAllImages,
  } = useImageProcessor();

  const [MasterSettings, setMasterSettings] = useState(DEFAULT_OPTIONS);
  const [showMasterSettings, setShowMasterSettings] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const selectedImage = images.find((img) => img.id === selectedImageId);

  const handleDownloadAll = () => {
    const completedImages = images.filter((img) => img.status === "completed");
    completedImages.forEach((image, index) => {
      setTimeout(() => downloadImageBlobs(image), index * 500);
    });
  };

  const handleMasterSave = (options: PngConversionOptions) => {
    setMasterSettings(options);
    applyMasterSettings(options);
    setShowMasterSettings(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        <PageHeader
          title={"Multi-Size PNG Exporter"}
          desc={"Export your images to multiple PNG files at different sizes."}
        />

        <DropZone
          onFilesDropped={(files) => addImages(files, MasterSettings)}
        />

        {images.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Images ({images.length})
              </h2>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setShowMasterSettings(true)}
                  className="gap-2"
                >
                  <Settings2 className="w-4 h-4" /> Master Settings
                </Button>
                <Button
                  onClick={processAllImages}
                  disabled={images.every((img) => img.status === "completed")}
                >
                  Convert All
                </Button>
                <Button
                  onClick={handleDownloadAll}
                  variant="outline"
                  disabled={!images.some((img) => img.status === "completed")}
                >
                  <Download className="w-4 h-4 mr-2" /> Download All
                </Button>
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="gap-2 bg-transparent"
                >
                  <Trash2 className="w-4 h-4" /> Clear All
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {images.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onRemove={removeImage}
                  onSettingsClick={setSelectedImageId}
                />
              ))}
            </div>
          </div>
        )}

        {images.length === 0 && <EmptyStateCard />}
      </div>

      {/* Master Settings Dialog */}
      <Dialog
        open={showMasterSettings}
        onOpenChange={setShowMasterSettings}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Master Settings</DialogTitle>
          </DialogHeader>
          <SettingsForm
            initialOptions={MasterSettings}
            onSave={handleMasterSave}
            onCancel={() => setShowMasterSettings(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Individual Image Settings Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImageId(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>File Settings: {selectedImage?.file.name}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <SettingsForm
              initialOptions={selectedImage.options}
              onSave={(opts) => {
                updateImageSettings(selectedImage.id, opts);
                setSelectedImageId(null);
              }}
              onCancel={() => setSelectedImageId(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
