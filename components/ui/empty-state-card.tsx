import { ImageIcon } from "lucide-react";
import { Card } from "./card";

export default function EmptyStateCard() {
  return (
    <Card className="p-12">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <ImageIcon className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No images yet</h3>
        <p className="text-sm text-muted-foreground">
          Upload some images to get started
        </p>
      </div>
    </Card>
  );
}
