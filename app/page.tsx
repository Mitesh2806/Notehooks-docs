// app/page.tsx
"use client";

import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Usage from "@/components/sections/usage";
import CTA from "@/components/sections/cta";
import Footer from "@/components/sections/footer";
import ClientDither from "@/components/ClientDither";

export default function Home() {
  return (
    <div className="min-h-screen bg-site-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative">
      {/* Global Noise Overlay */}
      
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-multiply" 
           style={{ backgroundImage: `url("/noise.png")` }} 
      />
       {/* Dark-mode dither overlay */}
       <ClientDither />
      
      <Header />
      
      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <Features />
        <Usage />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}