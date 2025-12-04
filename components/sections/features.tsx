// components/sections/features.tsx
import { BookOpen, Code, Zap, Package, Github, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: <Code className="size-5" />,
    title: "Type-Safe",
    description: "Built with TypeScript for complete type safety and better DX."
  },
  {
    icon: <Zap className="size-5" />,
    title: "Lightweight",
    description: "Zero dependencies, tree-shakeable, and optimized for performance."
  },
  {
    icon: <Package className="size-5" />,
    title: "Well Documented",
    description: "Comprehensive docs with examples and best practices."
  },
  {
    icon: <BookOpen className="size-5" />,
    title: "Easy to Learn",
    description: "Intuitive API that follows React conventions and patterns."
  },
  {
    icon: <Github className="size-5" />,
    title: "Open Source",
    description: "MIT licensed and maintained by the community."
  },
  {
    icon: <CheckCircle2 className="size-5" />,
    title: "Production Ready",
    description: "Battle-tested in production apps by thousands of developers."
  }
];

const Features = () => {
  return (
    <section className="w-full border-b border-border border-dashed">
      <div className="max-w-6xl mx-auto border-x border-border border-dashed p-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Why NoteHooks?</h2>
          <p className="text-muted-foreground text-lg">Everything you need to build modern React applications</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-dashed border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-sm"
            >
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-muted-foreground">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;