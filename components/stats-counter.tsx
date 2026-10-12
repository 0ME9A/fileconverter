"use client";

import { useEffect, useRef, useState } from "react";
import { formatFileSize } from "@/app/_src/utils";

interface StatsData {
  totalFiles: number;
  totalSize: number;
  avgTime: number;
}

// ─── Module-level cache so all StatsCounter instances share one fetch ─────────
let cachedData: StatsData | null = null;
let inflightPromise: Promise<StatsData> | null = null;

function fetchStats(): Promise<StatsData> {
  if (cachedData) return Promise.resolve(cachedData);
  if (inflightPromise) return inflightPromise;

  inflightPromise = fetch("/api/stats")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        cachedData = {
          totalFiles: data.totalFiles ?? 0,
          totalSize: data.totalSize ?? 0,
          avgTime: Math.round(data.avgTime ?? 0),
        };
        return cachedData;
      }
      throw new Error("stats fetch failed");
    })
    .catch(() => ({ totalFiles: 0, totalSize: 0, avgTime: 0 }));

  return inflightPromise;
}

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, active: boolean) {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!active || target === 0) return;
    start.current = null;

    const step = (ts: number) => {
      if (start.current === null) start.current = ts;
      const elapsed = ts - start.current;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, active]);

  return value;
}

// ─── Component ────────────────────────────────────────────────────────────────
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
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rawValue, setRawValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // ─ Intersection observer: only fetch once the section enters the viewport ──
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ─ Fetch once visible ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!isVisible) return;

    fetchStats().then((data) => {
      if (type === "totalFiles") setRawValue(data.totalFiles);
      else if (type === "totalSize") setRawValue(data.totalSize);
      else if (type === "avgTime") setRawValue(data.avgTime);
      setIsLoading(false);
    });
  }, [isVisible, type]);

  // ─ Animated counter (only meaningful for totalFiles / avgTime) ────────────
  const animatedFiles = useCountUp(
    type === "totalFiles" ? rawValue : 0,
    1400,
    !isLoading && type === "totalFiles"
  );
  const animatedTime = useCountUp(
    type === "avgTime" ? rawValue : 0,
    1400,
    !isLoading && type === "avgTime"
  );

  // ─ Formatted display ──────────────────────────────────────────────────────
  const display = (() => {
    if (isLoading) return null; // show skeleton instead
    if (type === "totalFiles")
      return animatedFiles.toLocaleString() + (showSuffix ? " Files" : "");
    if (type === "totalSize") return formatFileSize(rawValue);
    if (type === "avgTime")
      return animatedTime.toLocaleString() + (showSuffix ? "ms" : "");
    return "0";
  })();

  return (
    <span ref={ref} className={className}>
      {isLoading ? (
        // Skeleton pulse matching the text size
        <span className="inline-block h-[1em] w-24 rounded-md bg-primary/20 animate-pulse align-middle" />
      ) : (
        display
      )}
    </span>
  );
}
