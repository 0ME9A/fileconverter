"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface InformativeMessageProps {
  messages: string[];
  interval?: number;
  className?: string;
}

const InformativeMessage: React.FC<InformativeMessageProps> = ({
  messages,
  interval = 5000,
  className,
}) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      // Entry animation only - the exit is handled by the timer function to avoid loops
      gsap.fromTo(
        textRef.current,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    },
    { dependencies: [index], scope: containerRef }
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (!textRef.current) return;

      // Exit animation
      gsap.to(textRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % messages.length);
        },
      });
    }, interval);

    return () => clearInterval(timer);
  }, [messages.length, interval]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center justify-center p-8 text-center min-h-[120px]",
        className
      )}
    >
      <p
        ref={textRef}
        className="text-base md:text-lg font-bold text-foreground/80 max-w-lg leading-relaxed italic"
      >
        "{messages[index]}"
      </p>
    </div>
  );
};

export default InformativeMessage;
