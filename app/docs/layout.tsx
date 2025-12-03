"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { TableOfContents } from "@/components/table-of-contents";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen max-w-[90em] mx-auto">
    
      <div className="w-full h-16 border-b bg-background sticky top-0 z-50">
        
        <div className="w-full mx-auto h-full flex items-center justify-between px-4">
          <h1 className="text-xl font-bold">Notehooks</h1>
          
          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 hover:bg-accent rounded-md transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <AppSidebar onLinkClick={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] lg:grid-cols-[256px_1fr_256px] gap-0">
          {/* Left Sidebar - Navigation */}
          <div className="hidden md:block">
            <AppSidebar />
          </div>

          {/* Main Content Area */}
          <main className="min-w-0 max-w-4xl mx-auto w-full px-6 md:px-8 py-8">
            <article className="prose prose-slate dark:prose-invert max-w-none">
              {children}
            </article>
          </main>

          {/* Right Sidebar - Table of Contents */}
          <div className="hidden lg:block">
            <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-6">
              <TableOfContents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}