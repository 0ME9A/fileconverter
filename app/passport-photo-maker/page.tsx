import PassportPhotoTool from "@/app/passport-photo-maker/PassportPhotoTool";
import PageHeader from "@/components/ui/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Passport Photo Maker - Remove Background & Print",
  description:
    "Create professional passport photos with AI background removal. Adjust photo grid on A4, Letter, and other paper sizes. Download as high-quality PDF.",
};

export default function PassportPhotoPage() {
  return (
    <main className="min-h-screen bg-mesh py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <PageHeader
          title={"Passport Photo Maker"}
          desc={
            "Create professional passport photos with AI background removal. Adjust photo grid on A4, Letter, and other paper sizes. Download as high-quality PDF."
          }
        />

        <PassportPhotoTool />
      </div>
    </main>
  );
}
