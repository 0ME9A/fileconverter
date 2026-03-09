"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, Cookie } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-100 w-full md:max-w-lg transition-all duration-700 px-4",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-10 pointer-events-none",
      )}
    >
      <div className="bg-card/95 backdrop-blur-md border shadow-2xl rounded-2xl p-5 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex gap-4 items-start">
          <div className="bg-primary/10 rounded-xl p-2 shrink-0">
            <Cookie className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-3 pr-4">
            <div>
              <h3 className="font-bold text-sm">Cookie Notice</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                We use localized browser storage to ensure the best performance
                and privacy. Your files are always processed locally.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                onClick={acceptCookies}
                className="text-xs px-4 h-8"
              >
                Accept All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={declineCookies}
                className="text-xs px-4 h-8"
              >
                Essentials Only
              </Button>
              <Link
                href="/cookie-policy"
                className="text-[10px] text-muted-foreground hover:underline ml-1"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
