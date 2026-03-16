"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Command } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TOOLS } from "@/app/_src/data/tools";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import ToolListCard from "./tool-list-card";

export function ToolSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredTools = TOOLS.filter(
    (tool) =>
      tool.title.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()),
  ).filter((tool) => tool.status === "available");

  const onSelect = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router],
  );

  return (
    <>
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => setOpen(true)}
        className="group relative rounded-full hidden lg:flex items-center"
      >
        <Search className="opacity-50 group-hover:opacity-100 transition-colors" />
        <span className="hidden sm:block text-xs text-muted-foreground font-medium">
          Search tools...
        </span>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Button
        size={"icon-sm"}
        variant={"outline"}
        onClick={() => setOpen(true)}
        className="group relative rounded-full lg:hidden"
      >
        <Search className="opacity-50 group-hover:opacity-100 transition-colors" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-xl border-primary/50 overflow-hidden">
          <DialogHeader className="py-5 border-b">
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-primary animate-pulse shrink-0" />
              <input
                autoFocus
                placeholder="Type a tool name (e.g. background remover)..."
                className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <DialogTitle className="sr-only">Search Tools</DialogTitle>
            </div>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="space-y-1.5 pb-2">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => <ToolListCard tool={tool} />)
              ) : (
                <div className="p-8 text-center space-y-4">
                  <Command className="w-12 h-12 text-muted-foreground/20 mx-auto" />
                  <p className="text-sm text-muted-foreground font-medium">
                    No tools found for{" "}
                    <span className="text-primary font-bold">"{query}"</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="py-3 border-t flex items-center justify-between text-[10px] text-muted-foreground font-mono uppercase tracking-widest shrink-0">
            <div className="flex gap-4">
              <span>
                <span className="bg-muted px-1 rounded text-foreground">
                  ↑↓
                </span>{" "}
                Navigate
              </span>
              <span>
                <span className="bg-muted px-1 rounded text-foreground">
                  Enter
                </span>{" "}
                Select
              </span>
            </div>
            <div>
              <span>Esc to close</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
