// components/sections/hero.tsx
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";


const Hero = () => {
  return (
    <section className="w-full border-b border-border border-dashed relative overflow-hidden pt-20">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>
      
      <div className="max-w-6xl mx-auto border-x border-border border-dashed p-6 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-secondary-foreground mb-8">
            <Zap className="size-3" />
            <span>React Hooks Made Simple</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-foreground">
            Beautiful React Hooks
            <br />
            <span className="text-muted-foreground/50">for Modern Apps</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            A collection of production-ready React hooks that simplify state management, 
            side effects, and complex UI patterns.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link 
              href="/docs/getting-started/introduction" 
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-all shadow-sm"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>
            <Link 
              href="#examples" 
              className="flex items-center gap-2 border border-border bg-background px-8 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View Demos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;