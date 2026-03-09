"use client";
import { IcoOptions, DEFAULT_ICO_OPTIONS } from "./types";
import { SettingsForm } from "./components/SettingsForm";
import ConverterPage from "@/components/converter-page";
import { TConverterImage } from "@/hooks/use-converter";
import { convertToIco } from "./utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function IcoConverter() {
  const convertImage = async (
    imageFile: TConverterImage<IcoOptions>,
  ): Promise<Blob> => {
    // Adapt TConverterImage<IcoOptions> to the ImageFile type expected by convertToIco
    // Since they are shaped similarly, we can pass it through, but we should be explicit
    return convertToIco(imageFile as any);
  };

  return (
    <ConverterPage<IcoOptions>
      title="Image to .ICO Converter"
      description="Convert images to standard Windows .ICO format. Bundles multiple sizes (e.g. 16x16, 32x32) into a single file. All processing happens locally in your browser."
      convertedType="image/x-icon"
      extension="ico"
      defaultOptions={DEFAULT_ICO_OPTIONS}
      convertFn={convertImage}
      AdvancedSettings={({ image, open, onOpenChange, onSave }) => (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Icon Settings: {image.file.name}
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
                Master Icon Settings
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
