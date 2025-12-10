// components/sections/usage.tsx
const Usage = () => {
  return (
    <section className="w-full border-b border-border border-dashed bg-secondary/20">
      <div className="max-w-6xl mx-auto border-x border-border border-dashed p-4 md:p-6 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Simple. Powerful. Elegant.</h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              Write cleaner React code with hooks that handle common patterns like debouncing, 
              local storage, and media queries without the boilerplate.
            </p>
            
            <div className="space-y-3">
              {['useDebounce', 'useLocalStorage', 'useMediaQuery', 'useOnClickOutside'].map((hook) => (
                <div key={hook} className="flex items-center gap-3 group">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full group-hover:bg-primary transition-colors flex-shrink-0"></div>
                  <code className="text-xs md:text-sm font-mono bg-secondary border border-border px-2 py-1 rounded text-secondary-foreground truncate">
                    {hook}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet Card */}
          <div className="relative min-w-0">
             <div className="absolute -inset-1 bg-gradient-to-r from-border to-transparent rounded-2xl opacity-20 blur-sm"></div>
             <div className="relative bg-card rounded-xl border border-dashed border-border overflow-hidden">
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-b border-dashed border-border bg-muted/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 flex-shrink-0"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 flex-shrink-0"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 flex-shrink-0"></div>
                  <span className="ml-2 text-xs text-muted-foreground font-mono truncate">Example.tsx</span>
                </div>
                <div className="p-3 md:p-6 overflow-x-auto bg-[#0a0a0a] dark:bg-[#0a0a0a]">
                  <pre className="text-xs md:text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
{`import { useDebounce } from 'notehooks';

function SearchComponent() {
  const [value, setValue] = useState('');
  // 🪄 Debounce value by 500ms
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    // API call triggers only when user stops typing
    fetchResults(debouncedValue);
  }, [debouncedValue]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search..."
    />
  );
}`}
                  </pre>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Usage;