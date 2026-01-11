import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface DropZoneProps {
  onFilesDropped: (files: File[]) => void;
}

export function DropZone({ onFilesDropped }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    onFilesDropped(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesDropped(Array.from(e.target.files));
    }
  };

  return (
    <Card
      className={`border-2 border-dashed transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-border"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="p-12 text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Drop your images here</h3>
          <p className="text-sm text-muted-foreground">or click to browse</p>
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="file-input"
        />
        <Button asChild>
          <label htmlFor="file-input" className="cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Select Images
          </label>
        </Button>
      </div>
    </Card>
  );
}
