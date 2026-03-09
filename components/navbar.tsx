/* eslint-disable @next/next/no-img-element */
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-all"
          >
            <div className="relative">
              <img
                src="/logos/text-logo-c.png"
                alt="FileConverter"
                className="h-7 sm:h-9 relative z-10 transition-transform group-hover:scale-105"
              />
              <div className="absolute -inset-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </div>
          </Link>

          <div className="flex items-center gap-1 sm:gap-8">
            <div className="hidden md:flex items-center gap-6">
              {[
                { href: "/about", label: "About" },
                { href: "/tools", label: "Tools" },
                { href: "/features", label: "Features" },
                { href: "/stats", label: "Stats" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="h-6 w-px bg-border/50 hidden sm:block mx-2" />
              <Button
                asChild
                size="sm"
                className="hidden sm:flex px-5 shadow-glow hover:shadow-primary/40 transition-shadow"
              >
                <Link href="/contact" className="gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Contact Us
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="sm:hidden rounded-full font-bold text-primary"
              >
                <Link href="/tools">Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
