"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TPngConversionOptions } from "./type";
import { Settings2 } from "lucide-react";
import { useState } from "react";

type Props = {
  options: TPngConversionOptions;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (options: TPngConversionOptions) => void;
  onReset: () => void;
};

export function MasterSettings({
  options,
  open,
  onOpenChange,
  onSave,
  onReset,
}: Props) {
  const [masterOptions, setMasterOptions] =
    useState<TPngConversionOptions>(options);

  const handleSave = () => {
    onSave(masterOptions);
    onOpenChange(false);
  };

  const handleReset = () => {
    onReset();
    onOpenChange(false);
  };

  // Update local options when dialog opens with new values
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setMasterOptions(options);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            <DialogTitle>Master Settings</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            These settings will apply to all images by default. Individual
            images can override these settings.
          </p>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <h3 className="font-semibold mb-3">Image Options</h3>
            </div>

            <div className="space-y-2">
              <Label>Resize Output Image</Label>
              <Select
                value={masterOptions.resize}
                onValueChange={(value: "keep" | "custom") =>
                  setMasterOptions((prev) => ({ ...prev, resize: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keep">Keep original size</SelectItem>
                  <SelectItem value="custom">Custom size</SelectItem>
                </SelectContent>
              </Select>
              {masterOptions.resize === "custom" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Width (px)</Label>
                    <Input
                      type="number"
                      placeholder="Width"
                      value={masterOptions.width || ""}
                      onChange={(e) =>
                        setMasterOptions((prev) => ({
                          ...prev,
                          width: Number.parseInt(e.target.value) || undefined,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Height (px)</Label>
                    <Input
                      type="number"
                      placeholder="Height"
                      value={masterOptions.height || ""}
                      onChange={(e) =>
                        setMasterOptions((prev) => ({
                          ...prev,
                          height: Number.parseInt(e.target.value) || undefined,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="Master-preserve-transparency"
                checked={masterOptions.preserveTransparency}
                onCheckedChange={(checked) =>
                  setMasterOptions((prev) => ({
                    ...prev,
                    preserveTransparency: !!checked,
                  }))
                }
              />
              <div className="space-y-1">
                <label
                  htmlFor="Master-preserve-transparency"
                  className="text-sm font-medium cursor-pointer"
                >
                  Preserve Transparency
                </label>
                <p className="text-xs text-muted-foreground">
                  Keep transparent areas transparent in the output image
                </p>
              </div>
            </div>

            {/* Strip Metadata */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="Master-strip-metadata"
                checked={masterOptions.stripMetadata}
                onCheckedChange={(checked) =>
                  setMasterOptions((prev) => ({
                    ...prev,
                    stripMetadata: !!checked,
                  }))
                }
              />
              <div className="space-y-1">
                <label
                  htmlFor="Master-strip-metadata"
                  className="text-sm font-medium cursor-pointer"
                >
                  Strip Metadata
                </label>
                <p className="text-xs text-muted-foreground">
                  Remove EXIF and metadata to reduce file size
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="destructive" onClick={handleReset}>
              Reset All Settings
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Apply to All Images</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    // <Dialog open={open} onOpenChange={handleOpenChange}>
    //   <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
    //     <DialogHeader>
    //       <div className="flex items-center gap-2">
    //         <Settings2 className="w-5 h-5" />
    //         <DialogTitle>Master Settings</DialogTitle>
    //       </div>
    //       <p className="text-sm text-muted-foreground">
    //         These settings will apply to all images by default. Individual
    //         images can override these settings.
    //       </p>
    //     </DialogHeader>

    //     <div className="space-y-6">
    //       {/* Image Options Section */}
    //       <div className="space-y-4">
    //         <div className="bg-muted/50 rounded-lg p-3">
    //           <h3 className="font-semibold mb-3">Default Image Options</h3>
    //         </div>

    //         {/* Resize Output Image */}
    //         <div className="space-y-2">
    //           <Label>Resize Output Image</Label>
    //           <Select
    //             value={masterOptions.resize}
    //             onValueChange={(value: "keep" | "custom") =>
    //               setMasterOptions((prev) => ({ ...prev, resize: value }))
    //             }
    //           >
    //             <SelectTrigger>
    //               <SelectValue />
    //             </SelectTrigger>
    //             <SelectContent>
    //               <SelectItem value="keep">Keep original size</SelectItem>
    //               <SelectItem value="custom">Custom size</SelectItem>
    //             </SelectContent>
    //           </Select>
    //           {masterOptions.resize === "custom" && (
    //             <div className="grid grid-cols-2 gap-2">
    //               <div>
    //                 <Label className="text-xs">Width (px)</Label>
    //                 <Input
    //                   type="number"
    //                   placeholder="Width"
    //                   value={masterOptions.width || ""}
    //                   onChange={(e) =>
    //                     setMasterOptions((prev) => ({
    //                       ...prev,
    //                       width: Number.parseInt(e.target.value) || undefined,
    //                     }))
    //                   }
    //                 />
    //               </div>
    //               <div>
    //                 <Label className="text-xs">Height (px)</Label>
    //                 <Input
    //                   type="number"
    //                   placeholder="Height"
    //                   value={masterOptions.height || ""}
    //                   onChange={(e) =>
    //                     setMasterOptions((prev) => ({
    //                       ...prev,
    //                       height: Number.parseInt(e.target.value) || undefined,
    //                     }))
    //                   }
    //                 />
    //               </div>
    //             </div>
    //           )}
    //           <p className="text-xs text-muted-foreground">
    //             Choose a method if you want to resize the output image.
    //           </p>
    //         </div>

    //         {/* Strip Metadata */}
    //         <div className="flex items-start space-x-2">
    //           <Checkbox
    //             id="Master-strip-metadata"
    //             checked={masterOptions.stripMetadata}
    //             onCheckedChange={(checked) =>
    //               setMasterOptions((prev) => ({
    //                 ...prev,
    //                 stripMetadata: !!checked,
    //               }))
    //             }
    //           />
    //           <div className="space-y-1">
    //             <label
    //               htmlFor="Master-strip-metadata"
    //               className="text-sm font-medium cursor-pointer"
    //             >
    //               Strip Metadata
    //             </label>
    //             <p className="text-xs text-muted-foreground">
    //               Strip the image of any profiles, EXIF, and comments to reduce
    //               size
    //             </p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Action Buttons */}
    //       <div className="flex items-center justify-between pt-4 border-t">
    //         <Button variant="destructive" onClick={handleReset}>
    //           Reset All Settings
    //         </Button>
    //         <div className="flex gap-2">
    //           <Button variant="outline" onClick={() => onOpenChange(false)}>
    //             Cancel
    //           </Button>
    //           <Button onClick={handleSave}>Apply to All Images</Button>
    //         </div>
    //       </div>
    //     </div>
    //   </DialogContent>
    // </Dialog>
  );
}
