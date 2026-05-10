"use client";

import { useEffect, useState } from "react";
import { formatFileSize } from "@/app/_src/utils";
import { StatsData } from "@/app/type/common";

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
  const [res, setRes] = useState<StatsData | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => setRes(data))
      .catch((e) => console.error(e));
  }, []);

  if (!res || !res.success) return <span className={className}>0</span>;

  if (type === "totalFiles") {
    return (
      <span className={className}>
        {res.totalFiles.toLocaleString() + (showSuffix ? " Files" : "")}
      </span>
    );
  } else if (type === "totalSize") {
    return <span className={className}>{formatFileSize(res.totalSize)}</span>;
  } else if (type === "avgTime") {
    return (
      <span className={className}>
        {res.avgTime + (showSuffix ? "ms" : "")}
      </span>
    );
  }

  return <span className={className}>0</span>;
}