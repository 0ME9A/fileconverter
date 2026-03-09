"use client";
import React from "react";
import { formatFileSize } from "@/app/_src/utils";
import EmptyStateCard from "@/components/ui/empty-state-card";
import ImageActionArea from "@/components/image-action-area";
import ImageListCard from "@/components/ui/image-list-card";
import PageHeader from "@/components/ui/page-header";
import UploadArea from "@/components/upload-area";
import FAQSection from "@/components/faq-section";
import { useConverter, TConverterImage } from "@/hooks/use-converter";

type TProps<T> = {
  title: string;
  description: string;
  convertedType: string;
  extension: string;
  defaultOptions: T;
  convertFn: (
    image: TConverterImage<T>,
  ) => Promise<Blob | Map<string | number, Blob>>;
  AdvancedSettings: React.ComponentType<{
    image: TConverterImage<T>;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (options: T) => void;
  }>;
  MasterSettings: React.ComponentType<{
    options: T;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (options: T) => void;
    onReset: () => void;
  }>;
};

export default function ConverterPage<T>({
  title,
  description,
  convertedType,
  extension,
  defaultOptions,
  convertFn,
  AdvancedSettings,
  MasterSettings,
}: TProps<T>) {
  const {
    images,
    isDragging,
    setIsDragging,
    handleFiles,
    handleFileInput,
    removeImage,
    clearAll,
    updateImageSettings,
    masterSettings,
    showMasterSettings,
    setShowMasterSettings,
    handleMasterSettingsSave,
    processAll,
    downloadImage,
    downloadAll,
    selectedImageId,
    setSelectedImageId,
  } = useConverter<T>(defaultOptions);

  const resetAllSettings = () => {
    handleMasterSettingsSave(defaultOptions);
  };

  const selectedImage = images.find((img) => img.id === selectedImageId);

  return (
    <main className="min-h-screen bg-mesh py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <PageHeader title={title} desc={description} />

        <div className="relative">
          <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl rounded-3xl opacity-50" />
          <UploadArea
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            handleFiles={handleFiles}
            handleFileInput={handleFileInput}
          />
        </div>

        {images.length > 0 ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ImageActionArea
              images={images}
              setShowMasterSettings={setShowMasterSettings}
              handleConvertAll={() => processAll(convertFn, convertedType)}
              downloadAll={() => downloadAll(extension)}
              clearAll={clearAll}
            />

            <div className="grid grid-cols-1 gap-4">
              {images.map((image) => (
                <ImageListCard
                  key={image.id}
                  image={image}
                  formatFileSize={formatFileSize}
                  setSelectedImage={setSelectedImageId}
                  downloadImage={(img) =>
                    downloadImage(img as TConverterImage<T>, extension)
                  }
                  removeImage={removeImage}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-500">
            <EmptyStateCard />
          </div>
        )}
      </div>

      <div className="mt-24 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <FAQSection className="py-24" limit={6} />
        </div>
      </div>

      {selectedImage && (
        <AdvancedSettings
          image={selectedImage}
          open={!!selectedImageId}
          onOpenChange={(open) => !open && setSelectedImageId(null)}
          onSave={(options: T) => {
            updateImageSettings(selectedImage.id, options);
            setSelectedImageId(null);
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
