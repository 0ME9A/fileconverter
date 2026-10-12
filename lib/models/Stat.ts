import { Schema, model, models } from "mongoose";

export interface IStat {
  originalType: string;
  convertedType: string;
  processingTime: number; // in ms
  fileSize: number; // in bytes
  deviceInfo: {
    browser?: string;
    os?: string;
    platform?: string;
  };
  timestamp: Date;
}

const StatSchema = new Schema<IStat>({
  originalType: { type: String, required: true },
  convertedType: { type: String, required: true },
  processingTime: { type: Number, required: true },
  fileSize: { type: Number, required: true },
  deviceInfo: {
    browser: String,
    os: String,
    platform: String,
  },
  timestamp: { type: Date, default: Date.now },
});

// Index speeds up the $group aggregation on fileSize / processingTime
StatSchema.index({ timestamp: -1 });
StatSchema.index({ fileSize: 1, processingTime: 1 });

const Stat = models.Stat || model<IStat>("Stat", StatSchema);

export default Stat;
