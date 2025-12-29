import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Home
    </Link>
  );
}
