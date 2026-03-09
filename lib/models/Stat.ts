import mongoose, { Schema, model, models } from "mongoose";

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

const Stat = models.Stat || model<IStat>("Stat", StatSchema);

export default Stat;
