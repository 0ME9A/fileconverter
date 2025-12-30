import { FileImage } from "lucide-react";
import { TToolCard } from "../ts";

export const TOOLS: TToolCard[] = [
  {
    id: "webp",
    title: "Image to WebP",
    description:
      "Convert any image format to WebP for better compression and quality",
    features: ["Batch conversion", "Quality control", "Advanced options"],
    href: "/webp-converter",
    status: "available",
    gradient: "from-blue-500 to-blue-600",
    icon: FileImage,
  },
  {
    id: "jpg",
    title: "Image to JPG",
    description:
      "Convert images to JPG format with customizable quality settings",
    features: ["Batch conversion", "Quality control", "Background color"],
    href: "/jpg-converter",
    status: "available",
    gradient: "from-purple-500 to-purple-600",
    icon: FileImage,
  },
  {
    id: "png",
    title: "Image to PNG",
    description:
      "Convert to PNG format with transparency support and lossless compression",
    features: ["Transparency support", "Lossless quality", "Batch processing"],
    href: "/png-converter",
    status: "available",
    gradient: "from-green-500 to-green-600",
    icon: FileImage,
  },
  {
    id: "compress",
    title: "Image to ICO Converter",
    description: "Convert images to ICO format for favicons and app icons",
    href: "/ico-converter",
    status: "available",
    features: ["Multiple sizes", "Favicon ready", "App icons"],
    gradient: "from-orange-500 to-orange-600",
    icon: FileImage,
  },
  {
    id: "resize",
    title: "Batch Resize",
    description: "Resize multiple images at once to custom dimensions",
    features: ["Batch processing", "Custom dimensions"],
    status: "coming-soon",
    gradient: "from-red-500 to-red-600",
    icon: FileImage,
  },
  {
    id: "format",
    title: "Format Converter",
    description: "Universal image format converter supporting 10+ formats",
    features: ["Multiple formats", "High quality"],
    status: "coming-soon",
    gradient: "from-teal-500 to-teal-600",
    icon: FileImage,
  },
];
