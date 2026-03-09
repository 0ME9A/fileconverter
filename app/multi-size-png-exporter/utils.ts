// utils.ts

import { ImageFile } from "./type";

export const convertImageToPngs = async (
  imageFile: ImageFile,
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

        // Draw original image directly to preserve transparency
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

export const downloadImageBlobs = (image: ImageFile) => {
  if (image.outputBlobs.size === 0) return;

  const baseName = image.file.name.replace(/\.[^/.]+$/, "");

  image.outputBlobs.forEach((blob, size) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}_${size}x${size}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
};
