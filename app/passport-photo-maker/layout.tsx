import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Passport Photo Maker - Remove Background & Print",
  description:
    "Create professional passport photos with AI background removal. Adjust photo grid on A4, Letter, and other paper sizes. Download as high-quality PDF.",
  keywords: [
    "passport photo maker",
    "ai background remover",
    "biometric photo",
    "print passport photo",
    "a4 passport grid",
  ],
};

export default function PassportPhotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
