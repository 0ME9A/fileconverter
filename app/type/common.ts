export interface RecentConversion {
  originalType: string;
  convertedType: string;
  processingTime: number;
  fileSize: number;
  timestamp: string;
}

export interface StatsData {
  totalFiles: number;
  totalSize: number;
  avgTime: number;
  formats: { type: string; count: number }[];
  recent: RecentConversion[];
  success?: boolean;
}
