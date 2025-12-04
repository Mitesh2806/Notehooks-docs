// components/sections/header.tsx
"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "../ui/button";


const Header = () => {
  return (
    <div className="border-b border-border border-dashed fixed w-full lg:max-w-6xl top-0 bg-background/80 backdrop-blur-md z-50 left-1/2 -translate-x-1/2">
      <div className="p-4 w-full mx-auto border-border border-dashed border-x">
        <div className="flex items-center gap-4 justify-between h-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-sm">NH</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">NoteHooks</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/docs/getting-started/introduction" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="#examples" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </Link>
            <Link href="#api" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              API
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex" asChild>
              <Link href="https://github.com/yourusername/notehooks" target="_blank">
                <Github className="size-4" />
                GitHub
              </Link>
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;