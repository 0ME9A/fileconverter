/* eslint-disable @next/next/no-img-element */
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logos/text-logo-c.png" alt="" className="h-6 sm:h-8" />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="#tools"
              className="text-sm font-medium hover:text-primary transition-colors hidden sm:inline"
            >
              Tools
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors hidden sm:inline"
            >
              Features
            </Link>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Button asChild size="sm">
              <Link href="/webp-converter">Start Converting</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
