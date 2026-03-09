import { Upload, CloudUpload } from "lucide-react";
import { Button } from "./ui/button";

type TProps = {
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFiles: (files: File[]) => void;
};

export default function UploadArea({
  isDragging,
  setIsDragging,
  handleFileInput,
  handleFiles,
}: TProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  return (
    <div
      className={`relative group transition-all duration-500 rounded-2xl p-1 ${
        isDragging
          ? "bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_auto] animate-shimmer shadow-glow"
          : "bg-border/50"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="glass-card rounded-xl bg-card/80 dark:bg-card/40 p-12 text-center space-y-6 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full transition-opacity group-hover:opacity-100 opacity-0" />

        <div className="flex justify-center relative">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              isDragging
                ? "bg-primary text-primary-foreground scale-110 rotate-12"
                : "bg-primary/10 text-primary group-hover:bg-primary/20"
            }`}
          >
            {isDragging ? (
              <CloudUpload className="w-10 h-10" />
            ) : (
              <Upload className="w-10 h-10" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">
            {isDragging ? "Drop to Process" : "Select or Drop Images"}
          </h3>
          <p className="text-muted-foreground">
            Fast, secure, and 100% private processing in your browser.
          </p>
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="file-input"
        />

        <Button
          asChild
          size="lg"
          className="px-8 shadow-glow hover:shadow-primary/40 transition-all font-semibold"
        >
          <label htmlFor="file-input" className="cursor-pointer gap-2">
            <Upload className="w-4 h-4" />
            Browse Files
          </label>
        </Button>

        <div className="pt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary" /> Multi-select
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent" /> High quality
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary" /> Batch mode
          </span>
        </div>
      </div>
    </div>
  );
}
