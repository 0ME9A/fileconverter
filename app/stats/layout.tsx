import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Impact Dashboard | FileConverter",
  description:
    "Real-time statistics and insights into how FileConverter helps users worldwide process their files securely and efficiently.",
  keywords: [
    "file conversion stats",
    "privacy statistics",
    "usage dashboard",
    "real-time data",
  ],
};

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
