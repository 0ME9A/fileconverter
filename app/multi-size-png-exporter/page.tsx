"use client";
import { PngConversionOptions } from "./type";
import { SettingsForm } from "./components/SettingsForm";
import ConverterPage from "@/components/converter-page";
import { TConverterImage } from "@/hooks/use-converter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const defaultOptions: PngConversionOptions = {
  sizes: [16, 32, 48],
};

export default function MultiSizePngExporter() {
  const convertImage = async (
    imageFile: TConverterImage<PngConversionOptions>,
  ): Promise<Map<number, Blob>> => {
    const pngBlobs = new Map<number, Blob>();

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
            (b) => {
              if (b) resolve(b);
              else reject(new Error("Failed to convert image"));
            },
            "image/png",
            1.0,
          );
        };

        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageFile.preview;
      });

      pngBlobs.set(size, blob);
    }

    return pngBlobs;
  };

  return (
    <ConverterPage<PngConversionOptions>
      title="Multi-Size PNG Exporter"
      description="Export your images to multiple PNG files at different sizes. Perfect for creating assets for web and mobile apps. All processing happens locally in your browser."
      convertedType="image/png"
      extension="png"
      defaultOptions={defaultOptions}
      convertFn={convertImage}
      AdvancedSettings={({ image, open, onOpenChange, onSave }) => (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                File Settings: {image.file.name}
              </DialogTitle>
            </DialogHeader>
            <SettingsForm
              initialOptions={image.options}
              onSave={onSave}
              onCancel={() => onOpenChange(false)}
            />
          </DialogContent>
        </Dialog>
      )}
      MasterSettings={({ options, open, onOpenChange, onSave, onReset }) => (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Master Exporter Settings
              </DialogTitle>
            </DialogHeader>
            <SettingsForm
              initialOptions={options}
              onSave={onSave}
              onCancel={() => onOpenChange(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
}
