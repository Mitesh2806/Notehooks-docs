// components/sections/footer.tsx
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-dashed border-border">
      <div className="max-w-6xl mx-auto border-x border-dashed border-border px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">NH</span>
            </div>
            <span>NoteHooks © {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex items-center gap-8 font-medium">
            <Link href="https://github.com/Mitesh2806/Notehooks" className="hover:text-foreground transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Discord</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;