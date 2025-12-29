import { Shield, Zap, FileImage } from "lucide-react";
import { TFeature } from "../ts";

export const FEATURES: TFeature[] = [
  {
    id: "privacy",
    title: "100% Private",
    description:
      "All conversions happen locally in your browser. Your files never leave your device.",
    icon: Shield,
  },
  {
    id: "performance",
    title: "Lightning Fast",
    description:
      "No server uploads means instant processing. Convert hundreds of files in seconds.",
    icon: Zap,
  },
  {
    id: "advanced",
    title: "Advanced Options",
    description:
      "Full control over quality, compression, resizing, and more professional features.",
    icon: FileImage,
  },
];
