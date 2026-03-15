import { removeBackground } from "@imgly/background-removal";

export type BackgroundRemovalProgress = {
  status: string;
  progress: number;
};

export const removeImageBackground = async (
  imageSource: string | File | Blob | ImageData | ArrayBuffer | Uint8Array,
  onProgress?: (progress: BackgroundRemovalProgress) => void
): Promise<Blob> => {
  try {
    const config: any = {
      progress: (status: string, progress: number) => {
        if (onProgress) {
          onProgress({ status, progress });
        }
      },
      model: "medium", // or 'small' for faster download
    };

    const blob = await removeBackground(imageSource, config);
    return blob;
  } catch (error) {
    console.error("Background removal failed:", error);
    throw error;
  }
};
