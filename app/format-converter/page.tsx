"use client";
import { TConversionOptions, FORMAT_OPTIONS } from "./type";
import { AdvancedSettings } from "./advanced-settings";
import MasterSettings from "./master-settings";
import { TConverterImage, useConverter } from "@/hooks/use-converter";
import { formatFileSize } from "@/app/_src/utils";
import EmptyStateCard from "@/components/ui/empty-state-card";
import ImageActionArea from "@/components/image-action-area";
import ImageListCard from "@/components/ui/image-list-card";
import PageHeader from "@/components/ui/page-header";
import UploadArea from "@/components/upload-area";
import FAQSection from "@/components/faq-section";

const defaultOptions: TConversionOptions = {
  outputFormat: "webp",
  quality: 90,
  resize: "keep",
  backgroundColor: "#FFFFFF",
};

// Converts a single image blob using canvas, respecting per-image options
async function convertImage(
  imageFile: TConverterImage<TConversionOptions>,
): Promise<Blob> {
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

      const formatMeta = FORMAT_OPTIONS.find(
        (f) => f.value === imageFile.options.outputFormat,
      );
      const mime = formatMeta?.mime ?? "image/webp";

      // Fill background only for formats that don't support transparency
      if (formatMeta && !formatMeta.supportsTransparency) {
        ctx.fillStyle = imageFile.options.backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);

      const quality = imageFile.options.quality / 100;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(
              new Error(
                "Failed to convert — your browser may not support this format.",
              ),
            );
          }
        },
        mime,
        quality,
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageFile.preview;
  });
}

export default function FormatConverter() {
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
  } = useConverter<TConversionOptions>(defaultOptions);

  const selectedImage = images.find((img) => img.id === selectedImageId);

  // Download a single image using its own outputFormat as the extension
  const handleDownloadImage = (img: TConverterImage<TConversionOptions>) => {
    downloadImage(img, img.options.outputFormat);
  };

  // Download all images, each with its own format extension
  const handleDownloadAll = () => {
    const completed = images.filter((img) => img.status === "completed");
    completed.forEach((img, index) => {
      setTimeout(() => {
        downloadImage(img, img.options.outputFormat);
      }, index * 500);
    });
  };

  // Get the mime type string for stats logging
  const getMime = (img: TConverterImage<TConversionOptions>) =>
    FORMAT_OPTIONS.find((f) => f.value === img.options.outputFormat)?.mime ??
    "image/webp";

  return (
    <main className="min-h-screen bg-mesh py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <PageHeader
          title="Universal Format Converter"
          desc="Convert any image to JPG, PNG, WebP, BMP, or AVIF in one click. Each image can target a different format — batch processing, quality control, and resize options. 100% browser-based."
        />

        <div className="relative">
          <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl rounded-3xl opacity-50" />
          <UploadArea
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            handleFiles={handleFiles}
            handleFileInput={handleFileInput}
            highlights={["JPG · PNG · WebP · BMP · AVIF", "Batch conversion", "Per-image format"]}
          />
        </div>

        {images.length > 0 ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ImageActionArea
              images={images}
              setShowMasterSettings={setShowMasterSettings}
              handleConvertAll={() => processAll(convertImage, "image/webp")}
              downloadAll={handleDownloadAll}
              clearAll={clearAll}
            />

            <div className="grid grid-cols-1 gap-4">
              {images.map((image) => (
                <ImageListCard
                  key={image.id}
                  image={image}
                  formatFileSize={formatFileSize}
                  setSelectedImage={setSelectedImageId}
                  downloadImage={() => handleDownloadImage(image)}
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
          onSave={(options: TConversionOptions) => {
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
        onReset={() => handleMasterSettingsSave(defaultOptions)}
      />
    </main>
  );
}
