"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  Eraser,
  RotateCcw,
  Plus,
  Minus,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Upload,
  Download,
  Printer,
  File,
  Check,
} from "lucide-react";
import InformativeMessage from "../../components/InformativeMessage";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UploadArea from "@/components/upload-area";
import {
  removeImageBackground,
  BackgroundRemovalProgress,
} from "@/lib/services/BackgroundRemover";
import Cropper, { Point, Area } from "react-easy-crop";
import { jsPDF } from "jspdf";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { ButtonGroup } from "../../components/ui/button-group";
import EmptyStateCard from "../../components/ui/empty-state-card";
import PageHeader from "../../components/ui/page-header";
import { Switch } from "../../components/ui/switch";
import { logConversionStat } from "@/lib/stats-client";

// --- Types ---

type PaperSize = {
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

const PAPER_SIZES: PaperSize[] = [
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

const highlights: string[] = [
  "Smart AI Removal",
  "High-Precision Grid",
  "300 DPI Quality",
  "Print Ready",
];

const PRESET_COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Blue", value: "#0033a0" },
  { name: "Sky Blue", value: "#87ceeb" },
  { name: "Red", value: "#ff0000" },
  { name: "Transparent", value: "transparent" },
];

const INFORMATIVE_MESSAGES = [
  "Your privacy is our priority. All processing happens in your browser.",
  "Tip: Use a clear, front-facing photo with good lighting for best results.",
  "Did you know? You can manually add or remove photos from the sheet by clicking the slots.",
  "Save time with 'Auto Fill' to quickly populate the entire sheet.",
  "High-quality 300 DPI output ensures your passport photos look professional.",
  "You can adjust margins and gaps to fit your specific printing needs.",
];

export default function PassportPhotoTool() {
  const [step, setStep] = useState<"upload" | "process" | "crop" | "sheet">(
    "upload",
  );
  const [isDragging, setIsDragging] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [finalPhoto, setFinalPhoto] = useState<string | null>(null);

  // Sheet Settings
  const [paperBase, setPaperBase] = useState<PaperSize>(PAPER_SIZES[0]);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "landscape",
  );
  const [margin, setMargin] = useState(10); // mm
  const [gap, setGap] = useState(10); // mm
  const [rows, setRows] = useState(7);
  const [cols, setCols] = useState(5);
  const [autoFill, setAutoFill] = useState(false);
  const [autoArrange, setAutoArrange] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [bgColor, setBgColor] = useState("#ffffff");

  // Slot System
  const [activeSlots, setActiveSlots] = useState<Set<number>>(new Set());

  // BG Removal State
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [bgProgress, setBgProgress] =
    useState<BackgroundRemovalProgress | null>(null);

  const goBack = () => {
    if (step === "process") setStep("upload");
    else if (step === "crop") setStep("process");
    else if (step === "sheet") setStep("crop");
  };

  // Derived Paper Dimensions
  const selectedPaper = useMemo(() => {
    const isLandscape = orientation === "landscape";
    const width = isLandscape
      ? Math.max(paperBase.width, paperBase.height)
      : Math.min(paperBase.width, paperBase.height);
    const height = isLandscape
      ? Math.min(paperBase.width, paperBase.height)
      : Math.max(paperBase.width, paperBase.height);
    return { ...paperBase, width, height };
  }, [paperBase, orientation]);

  // Photo Sizing Logic - Maintain Aspect Ratio (3.5:4.5)
  const photoDimensions = useMemo(() => {
    const availableWidth = selectedPaper.width - 2 * margin - (cols - 1) * gap;
    const availableHeight =
      selectedPaper.height - 2 * margin - (rows - 1) * gap;

    const cellWidth = Math.max(0, availableWidth / cols);
    const cellHeight = Math.max(0, availableHeight / rows);

    const targetAspect = 3.5 / 4.5;
    const cellAspect = cellWidth / cellHeight;

    let w, h;
    if (cellAspect > targetAspect) {
      h = cellHeight;
      w = h * targetAspect;
    } else {
      w = cellWidth;
      h = w / targetAspect;
    }

    return { width: w, height: h, cellWidth, cellHeight };
  }, [selectedPaper, margin, gap, rows, cols]);

  // Handlers
  const resetToDefault = () => {
    setMargin(paperBase.margin.x);
    setGap(paperBase.gap.x);
    setRows(paperBase.defaultRows);
    setCols(paperBase.defaultCols);
    setOrientation(paperBase.orientation);
    // Don't auto-trigger fill here, let user click it
    setAutoFill(false);
    setAutoArrange(true);
    setShowGrid(true);
    setActiveSlots(new Set());
  };

  // Auto-fill logic when dimensions change
  React.useEffect(() => {
    if (autoFill) {
      const all = new Set<number>();
      for (let i = 0; i < rows * cols; i++) all.add(i);
      setActiveSlots(all);
    }
  }, [rows, cols, autoFill]);

  // Auto-arrange logic: pack photos to the top-left
  React.useEffect(() => {
    if (autoArrange && activeSlots.size > 0 && !autoFill) {
      const count = activeSlots.size;
      const maxSlots = rows * cols;
      const newSlots = new Set<number>();
      for (let i = 0; i < Math.min(count, maxSlots); i++) {
        newSlots.add(i);
      }

      // Check if current activeSlots is already packed to avoid unnecessary updates
      const isAlreadyPacked =
        activeSlots.size === newSlots.size &&
        Array.from(activeSlots).every((idx) => newSlots.has(idx));

      if (!isAlreadyPacked) {
        setActiveSlots(newSlots);
      }
    }
  }, [autoArrange, activeSlots.size, rows, cols, autoFill]);

  // Handle default grid per paper size
  React.useEffect(() => {
    setRows(paperBase.defaultRows);
    setCols(paperBase.defaultCols);
    setMargin(paperBase.margin.x);
    setGap(paperBase.gap.x);
    setOrientation(paperBase.orientation);
  }, [paperBase]);

  const onFileSelect = useCallback((files: File[]) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setProcessedImage(null);
        setFinalPhoto(null);
        setStep("process");
      };
      reader.readAsDataURL(files[0]);
    }
  }, []);

  const handleBgRemoval = async () => {
    if (!originalImage) return;
    setIsRemovingBg(true);
    setBgProgress({ status: "Starting...", progress: 0 });
    try {
      const blob = await removeImageBackground(originalImage, (prog) => {
        // Improve progress reporting
        let status = prog.status;
        let p = prog.progress;

        // Simplify technical status messages
        const technicalStatus = status.toLowerCase();
        if (
          p > 100 ||
          technicalStatus.includes("fetching") ||
          technicalStatus.includes("downloading")
        ) {
          status = "Preparing smart tools...";
          p = 0;
        } else if (technicalStatus.includes("processing")) {
          status = "Cleaning background...";
        } else {
          status = "Almost there...";
        }

        setBgProgress({ status, progress: p });
      });
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);

      // Auto-step to crop after success
      setTimeout(() => setStep("crop"), 500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRemovingBg(false);
    }
  };

  const generateCroppedImage = async () => {
    if (!originalImage || !croppedAreaPixels) return;

    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = processedImage || originalImage;

    await new Promise((resolve) => (img.onload = resolve));

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    if (bgColor !== "transparent") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    setFinalPhoto(canvas.toDataURL("image/jpeg", 0.95));
    setStep("sheet");
  };

  const toggleSlot = (idx: number) => {
    const newSlots = new Set(activeSlots);
    const isRemoving = newSlots.has(idx);

    if (isRemoving) {
      newSlots.delete(idx);
    } else {
      newSlots.add(idx);
    }
    setActiveSlots(newSlots);

    // If user manually interacts, disable auto-fill
    if (autoFill) setAutoFill(false);

    // Only disable auto-arrange if the user is explicitly ADDING a photo to a specific (potentially non-packed) spot
    // If they are removing, we let auto-arrange stay ON to re-pack if enabled
    if (!isRemoving && autoArrange) setAutoArrange(false);
  };

  const fillAllSlots = () => {
    const all = new Set<number>();
    for (let i = 0; i < rows * cols; i++) all.add(i);
    setActiveSlots(all);
    setAutoFill(true);
  };

  const clearSlots = () => {
    setActiveSlots(new Set());
    setAutoFill(false);
  };

  const createPDF = (autoPrint = false) => {
    if (!finalPhoto) return;

    const pdf = new jsPDF({
      orientation: orientation,
      unit: "mm",
      format: [paperBase.width, paperBase.height],
    });

    const slotsArray = Array.from(activeSlots).sort((a, b) => a - b);

    slotsArray.forEach((idx) => {
      const r = Math.floor(idx / cols);
      const c = idx % cols;

      const x =
        margin +
        c * (photoDimensions.cellWidth + gap) +
        (photoDimensions.cellWidth - photoDimensions.width) / 2;
      const y =
        margin +
        r * (photoDimensions.cellHeight + gap) +
        (photoDimensions.cellHeight - photoDimensions.height) / 2;

      if (
        x + photoDimensions.width <= selectedPaper.width &&
        y + photoDimensions.height <= selectedPaper.height
      ) {
        pdf.addImage(
          finalPhoto,
          "JPEG",
          x,
          y,
          photoDimensions.width,
          photoDimensions.height,
        );
      }
    });

    if (autoPrint) {
      pdf.autoPrint();
      window.open(pdf.output("bloburl"), "_blank");
    } else {
      pdf.save(`passport-sheet.pdf`);
      confetti();
    }

    // Log Conversion Stat
    logConversionStat({
      originalType: "image",
      convertedType: "passport-sheet",
      processingTime: 0, // Not explicitly tracked here
      fileSize: 0, // Not easily available from jsPDF blob here
    });
  };

  const scale = 2.4; // Zoom for the preview paper
  const stepsIndicator =
    step === "process" || step === "crop" || step === "sheet";

  return (
    <>
      {step === "upload" && (
        <>
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl rounded-3xl opacity-50" />
            <UploadArea
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              handleFiles={onFileSelect}
              handleFileInput={(e) =>
                e.target.files && onFileSelect(Array.from(e.target.files))
              }
              highlights={highlights}
            />
          </div>
          <div className="animate-in fade-in zoom-in duration-500">
            <EmptyStateCard />
          </div>
        </>
      )}

      {step !== "upload" && (
        <div className="grid lg:grid-cols-3 gap-4 bg-background p-4 h-full rounded-3xl shadow-xl">
          <div className="space-y-4 col-span-3 lg:col-span-1">
            {stepsIndicator && (
              <div className="h-10 flex flex-wrap items-center gap-2 md:flex-row w-full">
                <Button size={"icon"} onClick={goBack} className="">
                  <ChevronLeft />
                </Button>

                <ButtonGroup>
                  {["Removel", "Frame", "Sheet"].map((s, i) => (
                    <Button
                      key={s}
                      variant={"ghost"}
                      disabled={
                        (!originalImage && i > 0) || (!finalPhoto && i > 1)
                      }
                      className="h-full"
                    >
                      {s}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            )}
            {step === "process" ? (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-4 relative rounded-md">
                <div className="aspect-3/4 overflow-hidden relative">
                  {originalImage && (
                    <img
                      src={originalImage}
                      alt="Original"
                      className="w-full h-full object-contain p-4 rounded-md"
                    />
                  )}
                  {isRemovingBg && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-pulse rounded-md">
                      <Loader2 className="animate-spin mb-4" />
                      <p className="text-lg font-black uppercase tracking-tighter text-foreground">
                        {bgProgress?.status || "Processing..."}
                      </p>
                      <p className="text-sm text-primary font-bold mt-2">
                        {bgProgress?.progress
                          ? bgProgress.progress > 1
                            ? 100
                            : Math.round(bgProgress.progress * 100)
                          : 0}
                        %
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-full space-y-4">
                  <Button
                    onClick={handleBgRemoval}
                    disabled={isRemovingBg}
                    className="w-full"
                  >
                    <Eraser /> Clean Background
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => setStep("crop")}
                    className="w-full"
                  >
                    Continue to Crop <ChevronRight />
                  </Button>
                </div>
              </div>
            ) : step === "crop" ? (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-4 relative overflow-hidden">
                <div className="aspect-3/4 relative">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor:
                        bgColor === "transparent" ? "transparent" : bgColor,
                    }}
                  />
                  <Cropper
                    image={processedImage || originalImage || ""}
                    crop={crop}
                    zoom={zoom}
                    aspect={3.5 / 4.5}
                    onCropChange={setCrop}
                    onCropComplete={(_, area) => setCroppedAreaPixels(area)}
                    onZoomChange={setZoom}
                    classes={{ containerClassName: "bg-transparent" }}
                  />
                  <Button
                    size={"icon-sm"}
                    className="absolute bottom-4 right-4 bg-background text-primary hover:text-white"
                    onClick={() => setCrop({ x: 0, y: 0 })}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setBgColor(c.value)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                        bgColor === c.value
                          ? "border-primary scale-125"
                          : "border-white/10 shadow-lg",
                      )}
                      style={{
                        background:
                          c.value === "transparent"
                            ? "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACBJREFUGF5jZEACDAwM/0AYmYAIGIkKMAIRMCADAwMDXyQDALB4Aw+0D/kIAAAAAElFTkSuQmCC')"
                            : c.value,
                      }}
                    />
                  ))}

                  {/* Custom Color Picker */}
                  <div className="relative w-8 h-8 rounded-full border-2 border-white/10 shadow-lg overflow-hidden flex items-center justify-center bg-zinc-800 hover:scale-110 transition-all cursor-pointer">
                    <input
                      type="color"
                      value={bgColor.startsWith("#") ? bgColor : "#ffffff"}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full scale-150"
                    />
                    <Plus className="w-4 h-4 text-white pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="flex justify-between items-center text-xs font-black uppercase text-muted-foreground/60">
                      <span>Aspect Ratio - 3.5x4.5</span>
                    </p>
                    <Button
                      size={"icon-sm"}
                      variant={"ghost"}
                      onClick={() => setZoom(1)}
                    >
                      <RotateCcw />
                    </Button>
                  </div>
                  <Slider
                    value={[zoom]}
                    min={1}
                    max={3}
                    step={0.01}
                    onValueChange={([v]) => setZoom(v)}
                  />
                </div>

                <Button onClick={generateCroppedImage} className="w-full mt-4">
                  Export to Sheet
                </Button>
              </div>
            ) : step === "sheet" ? (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-4 relative overflow-hidden w-full">
                <div className="aspect-3/4 max-w-[200px] mx-auto overflow-hidden">
                  <img
                    src={finalPhoto || ""}
                    alt="Final"
                    className="size-full object-contain"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground/75 text-xs">
                      Dimensions
                    </Label>
                    <Select
                      defaultValue={paperBase.id}
                      onValueChange={(val) =>
                        setPaperBase(
                          PAPER_SIZES.find((p) => p.id === val) ||
                            PAPER_SIZES[0],
                        )
                      }
                    >
                      <SelectTrigger className="font-bold w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PAPER_SIZES.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground/75 text-xs">
                      Rotation
                    </Label>
                    <Select
                      value={orientation}
                      onValueChange={(val: any) => setOrientation(val)}
                    >
                      <SelectTrigger className="font-bold w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-muted-foreground/75 text-xs">
                        Margin
                      </Label>
                      <span className="text-xs font-bold text-foreground">
                        {margin}mm
                      </span>
                    </div>
                    <Slider
                      value={[margin]}
                      min={0}
                      max={40}
                      step={1}
                      onValueChange={([v]) => setMargin(v)}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-muted-foreground/75 text-xs">
                        Gap
                      </Label>
                      <span className="text-xs font-bold text-foreground">
                        {gap}mm
                      </span>
                    </div>
                    <Slider
                      value={[gap]}
                      min={0}
                      max={40}
                      step={1}
                      onValueChange={([v]) => setGap(v)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-4 rounded-md overflow-hidden bg-background shadow-inner p-4">
                    <Label className="text-muted-foreground/50 uppercase text-xs">
                      Rows
                    </Label>
                    <div className="flex items-center justify-between">
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => setRows(Math.max(1, rows - 1))}
                      >
                        <Minus />
                      </Button>
                      <span className="text-xl font-bold">{rows}</span>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => setRows(rows + 1)}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4 rounded-md overflow-hidden bg-background shadow-inner p-4">
                    <Label className="text-muted-foreground/50 uppercase text-xs">
                      Cols
                    </Label>
                    <div className="flex items-center justify-between">
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => setCols(Math.max(1, cols - 1))}
                      >
                        <Minus />
                      </Button>
                      <span className="text-xl font-bold">{cols}</span>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => setCols(cols + 1)}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 justify-between">
                    <Label htmlFor="auto-fill">Auto Fill</Label>
                    <Switch
                      id="auto-fill"
                      checked={autoFill}
                      onCheckedChange={(v) => {
                        v ? fillAllSlots() : clearSlots();
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                    <Label htmlFor="auto-arrange">Auto Arrange</Label>
                    <Switch
                      id="auto-arrange"
                      checked={autoArrange}
                      onCheckedChange={setAutoArrange}
                    />
                  </div>

                  {/* <Switch
                  label="Grid Lines"
                  checked={showGrid}
                  onChange={setShowGrid}
                /> */}
                </div>

                <div className="pt-2 space-y-4">
                  <ButtonGroup className="w-full">
                    <Button onClick={() => createPDF(false)} className="w-1/2">
                      Download
                    </Button>
                    <Button
                      onClick={() => createPDF(true)}
                      variant="outline"
                      className="w-1/2"
                    >
                      Print Now
                    </Button>
                  </ButtonGroup>
                  <Button
                    variant="outline"
                    onClick={resetToDefault}
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset Settings
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={() => setActiveSlots(new Set())}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Clear All Photos
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
          {step === "sheet" ? (
            <div className="col-span-3 lg:col-span-2 flex flex-col gap-4">
              <div className="flex justify-between items-center p-4 relative overflow-hidden h-10">
                <span className="font-bold text-lg uppercase">Paper size</span>
                <div className="bg-primary rounded-full px-2 uppercase font-bold text-background">
                  {selectedPaper.id.toUpperCase()}
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[850px] group/workspace relative rounded-md overflow-hidden p-4 md:p-10 h-full">
                <div
                  className="bg-white transition-all duration-700 ease-in-out overflow-hidden relative shadow-lg border dark:shadow-none"
                  style={{
                    width: "100%",
                    maxWidth: `${selectedPaper.width * scale}px`,
                    aspectRatio: `${selectedPaper.width} / ${selectedPaper.height}`,
                    containerType: "inline-size",
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      inset: `${(margin / selectedPaper.width) * 100}cqw`,
                      display: "grid",
                      gridTemplateColumns: `repeat(${cols}, 1fr)`,
                      gridTemplateRows: `repeat(${rows}, 1fr)`,
                      gap: `${(gap / selectedPaper.width) * 100}cqw`,
                    }}
                  >
                    {Array.from({ length: rows * cols }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center relative group"
                        style={{ width: "100%", height: "100%" }}
                      >
                        {activeSlots.has(i) ? (
                          <div
                            className="relative cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
                            onClick={() => toggleSlot(i)}
                            style={{
                              width: `${(photoDimensions.width / selectedPaper.width) * 100}cqw`,
                              height: `${(photoDimensions.height / selectedPaper.width) * 100}cqw`,
                            }}
                          >
                            {finalPhoto ? (
                              <img
                                src={finalPhoto}
                                alt="Photo"
                                className="size-full object-cover shadow-xl"
                              />
                            ) : (
                              <div className="size-full bg-zinc-100 animate-pulse" />
                            )}
                            <div className="absolute inset-0 bg-red-600/0 hover:bg-red-600/30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                              <Trash2 />
                            </div>
                          </div>
                        ) : (
                          <div
                            className="flex items-center justify-center cursor-pointer transition-all rounded-md"
                            onClick={() => toggleSlot(i)}
                            style={{
                              width: `${(photoDimensions.width / selectedPaper.width) * 100}cqw`,
                              height: `${(photoDimensions.height / selectedPaper.width) * 100}cqw`,
                            }}
                          >
                            <Plus className="text-primary opacity-25 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="absolute inset-0 z-[-1] opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${"var(--foreground)"} 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                  }}
                />
              </div>

              <div className="flex items-center justify-between px-8 py-2 bg-background rounded-md">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] italic">
                    Real-time Layout Engine v3.0
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-tighter">
                      Current Print Quality
                    </span>
                    <span className="text-[10px] font-black text-blue-400 tracking-widest uppercase">
                      300 DPI LOSSLESS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-2 border border-background/50 rounded-md flex items-center justify-center p-8 bg-background/30 backdrop-blur-sm">
              <InformativeMessage messages={INFORMATIVE_MESSAGES} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
