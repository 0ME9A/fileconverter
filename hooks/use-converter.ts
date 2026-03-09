import { useState, useCallback } from "react";
import { TBaseImage } from "@/app/_src/ts";

export type TConverterImage<T> = TBaseImage & {
  options: T;
  outputBlob?: Blob;
  outputBlobs?: Map<string | number, Blob>;
};

export function useConverter<T>(defaultOptions: T) {
  const [images, setImages] = useState<TConverterImage<T>[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [showMasterSettings, setShowMasterSettings] = useState(false);
  const [masterSettings, setMasterSettings] = useState<T>(defaultOptions);

  const handleFiles = useCallback(
    (files: File[]) => {
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      const newImages: TConverterImage<T>[] = imageFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        status: "pending",
        options: { ...masterSettings },
        useCustomSettings: false,
      }));
      setImages((prev) => [...prev, ...newImages]);
    },
    [masterSettings],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(Array.from(e.target.files));
      }
    },
    [handleFiles],
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  }, [images]);

  const updateImageSettings = useCallback((id: string, options: T) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, options, useCustomSettings: true, status: "pending" }
          : img,
      ),
    );
  }, []);

  const handleMasterSettingsSave = useCallback((options: T) => {
    setMasterSettings(options);
    setImages((prev) =>
      prev.map((img) =>
        img.useCustomSettings
          ? img
          : { ...img, options: { ...options }, status: "pending" },
      ),
    );
  }, []);

  const processImage = useCallback(
    async (
      image: TConverterImage<T>,
      convertFn: (
        image: TConverterImage<T>,
      ) => Promise<Blob | Map<string | number, Blob>>,
      convertedType: string,
    ) => {
      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id ? { ...img, status: "processing" } : img,
        ),
      );

      try {
        const startTime = performance.now();
        const result = await convertFn(image);
        const endTime = performance.now();

        const isMap = result instanceof Map;
        const outputBlob = isMap ? undefined : (result as Blob);
        const outputBlobs = isMap
          ? (result as Map<string | number, Blob>)
          : undefined;
        const totalSize = isMap
          ? Array.from((result as Map<any, Blob>).values()).reduce(
              (acc, b) => acc + b.size,
              0,
            )
          : (result as Blob).size;

        // Log stats
        import("@/lib/stats-client").then(({ logConversionStat }) => {
          logConversionStat({
            originalType: image.file.type,
            convertedType: convertedType,
            processingTime: Math.round(endTime - startTime),
            fileSize: image.file.size,
          });
        });

        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? {
                  ...img,
                  status: "completed",
                  outputBlob,
                  outputBlobs,
                  outputSize: totalSize,
                  outputSizes: isMap
                    ? Object.fromEntries(
                        Array.from((result as Map<any, any>).entries()).map(
                          ([k, v]) => [k, v.size],
                        ),
                      )
                    : undefined,
                }
              : img,
          ),
        );
        return result;
      } catch (error) {
        console.error("Conversion error:", error);
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id ? { ...img, status: "pending" } : img,
          ),
        );
        throw error;
      }
    },
    [],
  );

  const processAll = useCallback(
    async (
      convertFn: (
        image: TConverterImage<T>,
      ) => Promise<Blob | Map<string | number, Blob>>,
      convertedType: string,
    ) => {
      for (const image of images) {
        if (image.status === "pending") {
          await processImage(image, convertFn, convertedType);
        }
      }
    },
    [images, processImage],
  );

  const downloadImage = useCallback(
    (image: TConverterImage<T>, extension: string) => {
      const baseName = image.file.name.replace(/\.[^/.]+$/, "");

      if (image.outputBlobs) {
        Array.from(image.outputBlobs.entries()).forEach(
          ([key, blob], index) => {
            setTimeout(() => {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              const suffix =
                typeof key === "number" ? `_${key}x${key}` : `_${key}`;
              a.download = `${baseName}${suffix}.${extension}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }, index * 100);
          },
        );
      } else if (image.outputBlob) {
        const url = URL.createObjectURL(image.outputBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${baseName}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    },
    [],
  );

  const downloadAll = useCallback(
    (extension: string) => {
      const completedImages = images.filter(
        (img) => img.status === "completed",
      );
      completedImages.forEach((image, index) => {
        setTimeout(() => downloadImage(image, extension), index * 500); // Increased delay for batch
      });
    },
    [images, downloadImage],
  );

  return {
    images,
    setImages,
    isDragging,
    setIsDragging,
    handleFiles,
    handleFileInput,
    removeImage,
    clearAll,
    updateImageSettings,
    masterSettings,
    setMasterSettings,
    showMasterSettings,
    setShowMasterSettings,
    handleMasterSettingsSave,
    processAll,
    downloadImage,
    downloadAll,
    selectedImageId,
    setSelectedImageId,
  };
}
