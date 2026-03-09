"use client";

import { useEffect, useState } from "react";
import { formatFileSize } from "@/app/_src/utils";

interface StatsCounterProps {
  type?: "totalFiles" | "totalSize" | "avgTime";
  className?: string;
  showSuffix?: boolean;
}

export default function StatsCounter({
  type = "totalFiles",
  className = "text-xl font-black text-primary",
  showSuffix = false,
}: StatsCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>("0");

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (type === "totalFiles") {
            setDisplayValue(
              data.totalFiles.toLocaleString() + (showSuffix ? " Files" : ""),
            );
          } else if (type === "totalSize") {
            setDisplayValue(formatFileSize(data.totalSize));
          } else if (type === "avgTime") {
            setDisplayValue(data.avgTime + (showSuffix ? "ms" : ""));
          }
        }
      })
      .catch(() => setDisplayValue("0"));
  }, [type, showSuffix]);

  return <span className={className}>{displayValue}</span>;
}
