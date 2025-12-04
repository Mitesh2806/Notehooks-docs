import { ComponentProps } from "react";
import Copy from "./copy";
import { cn } from "@/app/lib/utils";

export default function Pre({
  children,
  raw,
  className,
  ...rest
}: ComponentProps<"pre"> & { raw?: string }) {
  return (
    <div className="my-5 relative group">
      <div className="absolute top-3 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Copy content={raw!} />
      </div>
      <div className="relative">
        <pre
          className={cn(
            "p-4 rounded-lg border bg-zinc-950 dark:bg-zinc-900 text-slate-50 overflow-x-auto font-mono text-sm leading-relaxed",
            className
          )}
          {...rest}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}