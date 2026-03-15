import PassportPhotoTool from "@/app/passport-photo-maker/PassportPhotoTool";
import FAQSection from "@/components/faq-section";
import PageHeader from "@/components/ui/page-header";

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
      <div className="mt-24 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <FAQSection className="py-24" limit={6} />
        </div>
      </div>
    </main>
  );
}
