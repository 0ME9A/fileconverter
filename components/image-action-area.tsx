import { Download, Settings2, Trash2 } from "lucide-react";
import { TBaseImage } from "@/app/_src/ts";
import { Button } from "./ui/button";
import React from "react";

type TProps<T extends TBaseImage> = {
  images: T[];
  setShowMasterSettings: React.Dispatch<React.SetStateAction<boolean>>;
  handleConvertAll: () => Promise<void>;
  downloadAll: () => void;
  clearAll: () => void;
};

export default function ImageActionArea<T extends TBaseImage>({
  images,
  setShowMasterSettings,
  handleConvertAll,
  downloadAll,
  clearAll,
}: TProps<T>) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Images ({images.length})</h2>
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          onClick={() => setShowMasterSettings(true)}
          className="gap-2"
        >
          <Settings2 className="w-4 h-4" />
          Master Settings
        </Button>
        <Button
          onClick={handleConvertAll}
          disabled={images.every((img) => img.status === "completed")}
        >
          Convert All
        </Button>
        <Button
          onClick={downloadAll}
          variant="outline"
          disabled={!images.some((img) => img.status === "completed")}
        >
          <Download className="w-4 h-4 mr-2" />
          Download All
        </Button>
        <Button
          onClick={clearAll}
          variant="outline"
          className="gap-2 bg-transparent"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </Button>
      </div>
    </div>
  );
}
