import { ImageFile, IcoPresetType } from "./types";

// Helper to determine the list of sizes based on the single preset
const getSizesFromPreset = (
  preset: IcoPresetType,
  customSize?: number,
): number[] => {
  if (preset === "favicon") return [16, 32, 48];
  if (preset === "windows") return [16, 24, 32, 48, 64, 256];
  if (preset === "android") return [192];
  if (typeof preset === "number") return [preset];
  if (preset === "custom" && customSize) return [customSize];
  return [32]; // Fallback
};

const createPngBlob = async (
  img: HTMLImageElement,
  size: number,
): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No canvas context");

  canvas.width = size;
  canvas.height = size;

  // Clear and keep transparent
  ctx.clearRect(0, 0, size, size);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Note: "Auto Orient" is generally handled by the browser when loading the <img>
  // tag before drawing to canvas.
  ctx.drawImage(img, 0, 0, size, size);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas to Blob failed"));
    }, "image/png");
  });
};

export const convertToIco = async (imageFile: ImageFile): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      try {
        // 1. Determine sizes based on the preset selection
        const sizes = getSizesFromPreset(
          imageFile.options.preset,
          imageFile.options.customSize,
        );

        const pngBlobs: Blob[] = [];

        for (const size of sizes) {
          const blob = await createPngBlob(img, size);
          pngBlobs.push(blob);
        }

        // --- ICO BINARY CONSTRUCTION ---
        const headerSize = 6;
        const directorySize = 16;
        const numImages = pngBlobs.length;

        let offset = headerSize + directorySize * numImages;

        const header = new Uint8Array(6);
        const view = new DataView(header.buffer);

        view.setUint16(0, 0, true);
        view.setUint16(2, 1, true);
        view.setUint16(4, numImages, true);

        const directories: Uint8Array[] = [];
        const pngBuffers: Uint8Array[] = [];

        for (let i = 0; i < numImages; i++) {
          const blob = pngBlobs[i];
          const size = sizes[i];
          const buffer = await blob.arrayBuffer();
          pngBuffers.push(new Uint8Array(buffer));

          const dir = new Uint8Array(16);
          const dirView = new DataView(dir.buffer);

          const w = size >= 256 ? 0 : size;
          const h = size >= 256 ? 0 : size;

          dirView.setUint8(0, w);
          dirView.setUint8(1, h);
          dirView.setUint8(2, 0);
          dirView.setUint8(3, 0);
          dirView.setUint16(4, 1, true);
          dirView.setUint16(6, 32, true);
          dirView.setUint32(8, buffer.byteLength, true);
          dirView.setUint32(12, offset, true);

          directories.push(dir);
          offset += buffer.byteLength;
        }

        const blobParts = [header, ...directories, ...pngBuffers] as BlobPart[];
        const icoBlob = new Blob(blobParts, { type: "image/x-icon" });
        resolve(icoBlob);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => reject(new Error("Failed to load source image"));
    img.src = imageFile.preview;
  });
};

export const downloadIco = (image: ImageFile) => {
  if (!image.outputBlob) return;
  const url = URL.createObjectURL(image.outputBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${image.file.name.replace(/\.[^/.]+$/, "")}.ico`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
