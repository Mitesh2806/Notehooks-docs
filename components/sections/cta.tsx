// components/sections/cta.tsx
"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const CTA = () => {
  const [copied, setCopied] = useState(false);
  const command = "npm install notehooks";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full border-b border-border border-dashed">
      <div className="max-w-6xl mx-auto border-x border-border border-dashed p-6 py-24 text-center">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">Ready to get started?</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Install NoteHooks and start building better React apps today.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2 bg-secondary border border-border rounded-md pl-4 pr-2 py-2 font-mono text-sm text-foreground">
            <span>{command}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 ml-2 hover:bg-background"
              onClick={handleCopy}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </div>
          
          <Button   size="lg" className="px-8">
            Read the Documentation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;