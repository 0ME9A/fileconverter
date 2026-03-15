export type PaperSize = {
  id: string;
  name: string;
  width: number; // mm
  height: number; // mm
  defaultRows: number;
  defaultCols: number;
  orientation: "landscape" | "portrait";
  margin: {
    x: number;
    y: number;
  };
  gap: {
    x: number;
    y: number;
  };
};

export const PAPER_SIZES: PaperSize[] = [
  {
    id: "a4",
    name: "A4",
    width: 210,
    height: 297,
    defaultRows: 7,
    defaultCols: 6,
    orientation: "portrait",
    margin: {
      x: 4,
      y: 4,
    },
    gap: {
      x: 4,
      y: 4,
    },
  },
  {
    id: "letter",
    name: "Letter",
    width: 215.9,
    height: 279.4,
    defaultRows: 6,
    defaultCols: 5,
    orientation: "portrait",
    margin: {
      x: 4,
      y: 4,
    },
    gap: {
      x: 4,
      y: 4,
    },
  },
  {
    id: "7x5",
    name: "7x5 in",
    width: 177.8,
    height: 127,
    defaultRows: 3,
    defaultCols: 5,
    orientation: "landscape",
    margin: {
      x: 4,
      y: 4,
    },
    gap: {
      x: 4,
      y: 4,
    },
  },
  {
    id: "4x6",
    name: "4x6 in",
    width: 101.6,
    height: 152.4,
    defaultRows: 3,
    defaultCols: 2,
    orientation: "portrait",
    margin: {
      x: 4,
      y: 4,
    },
    gap: {
      x: 4,
      y: 4,
    },
  },
];

export const highlights: string[] = [
  "Smart AI Removal",
  "High-Precision Grid",
  "300 DPI Quality",
  "Print Ready",
];

export const PRESET_COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Blue", value: "#0033a0" },
  { name: "Sky Blue", value: "#87ceeb" },
  { name: "Red", value: "#ff0000" },
  { name: "Transparent", value: "transparent" },
];

export const INFORMATIVE_MESSAGES = [
  "Your privacy is our priority. All processing happens in your browser.",
  "Tip: Use a clear, front-facing photo with good lighting for best results.",
  "Did you know? You can manually add or remove photos from the sheet by clicking the slots.",
  "Save time with 'Auto Fill' to quickly populate the entire sheet.",
  "High-quality 300 DPI output ensures your passport photos look professional.",
  "You can adjust margins and gaps to fit your specific printing needs.",
];
