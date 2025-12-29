import { FileImage } from "lucide-react";
import { TToolHighlight } from "../ts";

export const TOOLS: TToolHighlight[] = [
  {
    id: "webp",
    title: "Image to WebP",
    description:
      "Convert any image format to WebP with advanced compression and quality controls",
    href: "/webp-converter",
    status: "available",
    gradient: "from-blue-500 to-blue-600",
    icon: FileImage,
  },
  {
    id: "jpg",
    title: "Image to JPG",
    description: "Convert images to optimized JPG format with quality control",
    status: "coming-soon",
    gradient: "from-purple-500 to-purple-600",
    icon: FileImage,
  },
  {
    id: "png",
    title: "Image to PNG",
    description:
      "Convert to PNG format with transparency support and lossless compression",
    status: "coming-soon",
    gradient: "from-green-500 to-green-600",
    icon: FileImage,
  },
  {
    id: "compress",
    title: "Image Compression",
    description: "Reduce image file sizes while maintaining visual quality",
    status: "coming-soon",
    gradient: "from-orange-500 to-orange-600",
    icon: FileImage,
  },
  {
    id: "resize",
    title: "Batch Resize",
    description: "Resize multiple images at once to custom dimensions",
    status: "coming-soon",
    gradient: "from-red-500 to-red-600",
    icon: FileImage,
  },
  {
    id: "format",
    title: "Format Converter",
    description: "Universal image format converter supporting 10+ formats",
    status: "coming-soon",
    gradient: "from-teal-500 to-teal-600",
    icon: FileImage,
  },
];
