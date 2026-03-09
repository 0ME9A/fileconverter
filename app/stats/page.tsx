"use client";

import { useEffect, useState, useRef } from "react";
import PageHeader from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatFileSize } from "../_src/utils";
import gsap from "gsap";
import {
  BarChart3,
  Zap,
  HardDrive,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Files,
} from "lucide-react";

interface RecentConversion {
  originalType: string;
  convertedType: string;
  processingTime: number;
  fileSize: number;
  timestamp: string;
}

interface StatsData {
  totalFiles: number;
  totalSize: number;
  avgTime: number;
  formats: { type: string; count: number }[];
  recent: RecentConversion[];
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data);
        }
      })
      .catch((err) => console.error("Failed to fetch stats:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && stats && containerRef.current) {
      // Entrance animation for cards
      gsap.fromTo(
        ".stat-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
      );

      // Number counter animation for total files
      if (counterRef.current) {
        const obj = { value: 0 };
        gsap.to(obj, {
          value: stats.totalFiles,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.innerText = Math.round(
                obj.value,
              ).toLocaleString();
            }
          },
        });
      }
    }
  }, [loading, stats]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <div
        className="max-w-6xl mx-auto p-6 md:p-10 space-y-10"
        ref={containerRef}
      >
        <PageHeader
          title="Global Impact Dashboard"
          desc="Real-time statistics on how FileConverter is helping users process their files securely and efficiently."
        />

        {/* Hero Stat */}
        <div className="stat-card relative overflow-hidden rounded-3xl bg-primary/5 p-10 md:p-16 border border-primary/10 text-center space-y-4">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Files size={200} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary/60">
            Total Files Processed
          </p>
          <h2
            className="text-6xl md:text-8xl font-black tracking-tight text-primary"
            ref={counterRef}
          >
            0
          </h2>
          <div className="flex items-center justify-center gap-2 text-green-500 font-medium">
            <TrendingUp size={20} />
            <span>Growing every second</span>
          </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="stat-card border-none bg-secondary/30 shadow-none hover:bg-secondary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <HardDrive size={16} /> Data Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatFileSize(stats?.totalSize || 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Optimization impact
              </p>
            </CardContent>
          </Card>

          <Card className="stat-card border-none bg-secondary/30 shadow-none hover:bg-secondary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap size={16} /> Average Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.avgTime}ms</div>
              <p className="text-xs text-muted-foreground mt-1">
                Per conversion unit
              </p>
            </CardContent>
          </Card>

          <Card className="stat-card border-none bg-secondary/30 shadow-none hover:bg-secondary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 size={16} /> Popular Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold uppercase">
                {stats?.formats[0]?.type.split("/")[1] || "None"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Most used target
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Breakdown & Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10">
          <section className="stat-card space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ArrowUpRight className="text-primary" /> Format Distribution
              </h3>
            </div>
            <div className="space-y-4">
              {stats?.formats.map((f, i) => (
                <div key={f.type} className="group">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium uppercase">
                      {f.type.split("/")[1]}
                    </span>
                    <span className="text-muted-foreground">
                      {f.count} files
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full origin-left transition-transform duration-1000"
                      style={{
                        width: `${(f.count / stats.totalFiles) * 100}%`,
                        opacity: 1 - i * 0.15,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="stat-card space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Clock className="text-primary" /> Live Activity Feed
            </h3>
            <div className="rounded-2xl border bg-card/50 overflow-hidden divide-y">
              {stats?.recent.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground italic">
                  No recent activity logged yet.
                </div>
              ) : (
                stats?.recent.map((r, i) => (
                  <div
                    key={i}
                    className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <ArrowUpRight size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          <span className="uppercase">
                            {r.originalType.split("/")[1]}
                          </span>
                          <span className="mx-2 text-muted-foreground">→</span>
                          <span className="uppercase text-primary">
                            {r.convertedType.split("/")[1] || "ICO"}
                          </span>
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase opacity-70">
                          {new Date(r.timestamp).toLocaleTimeString()} •{" "}
                          {formatFileSize(r.fileSize)}
                        </p>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {Math.round(r.processingTime)}ms
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
