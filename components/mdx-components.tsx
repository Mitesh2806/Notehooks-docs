// components/mdx-components.tsx
"use client";

import React, { ComponentPropsWithoutRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Stepper, StepperItem } from "@/components/stepper";

// 1. TABLE COMPONENTS
export function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 w-full overflow-y-auto rounded-md border border-border">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

export function THead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead className={cn("[&_tr]:border-b border-border bg-muted/50", className)} {...props} />
  );
}

export function TBody({ className, ...props }: ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  );
}

export function TR({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className={cn(
        "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  );
}

export function TH({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

export function TD({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  );
}

// 2. CODE BLOCK COMPONENTS
export function Pre({ children, className, ...props }: ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // @ts-ignore
    const raw = props["raw"];
    const code = typeof raw === "string" ? raw : extractTextFromChildren(children);
    
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-md border border-border bg-secondary/20 dark:bg-secondary/10">
      <div className="absolute right-2 top-2 z-20 flex items-center">
        <button
          onClick={handleCopy}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background p-1.5 text-muted-foreground opacity-0 shadow-sm transition-all hover:bg-muted group-hover:opacity-100",
            copied && "text-primary border-primary/50"
          )}
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="relative">
        <pre
          className={cn(
            "overflow-x-auto py-4 px-4 font-mono text-sm leading-relaxed",
            className
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

export function Code({ className, ...props }: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className={cn(
        "relative rounded-md border border-border bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-foreground",
        className
      )}
      {...props}
    />
  );
}

// 3. HEADING COMPONENTS
let headingCounter = 0;

function generateId(text: string | React.ReactNode): string {
  let textContent = "";
  if (typeof text === "string") {
    textContent = text;
  } else if (React.isValidElement(text)) {
    textContent = extractTextFromChildren(text);
  }

  if (!textContent.trim()) {
    headingCounter++;
    return `heading-${headingCounter}`;
  }

  return textContent
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function H2({ className, children, ...props }: ComponentPropsWithoutRef<"h2">) {
  const id = generateId(children);
  return (
    <h2 id={id} className={cn("text-4xl font-bold my-8 scroll-m-20", className)} {...props}>
      {children}
    </h2>
  );
}

export function H3({ className, children, ...props }: ComponentPropsWithoutRef<"h3">) {
  const id = generateId(children);
  return (
    <h3 id={id} className={cn("text-3xl font-bold my-6 scroll-m-20", className)} {...props}>
      {children}
    </h3>
  );
}

export function H4({ className, children, ...props }: ComponentPropsWithoutRef<"h4">) {
  const id = generateId(children);
  return (
    <h4 id={id} className={cn("text-2xl font-bold my-6 scroll-m-20", className)} {...props}>
      {children}
    </h4>
  );
}

// 4. STEPPER COMPONENTS (imported from stepper.tsx)

// Helper to extract text from React children
function extractTextFromChildren(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }
  if (children?.props?.children) {
    return extractTextFromChildren(children.props.children);
  }
  return "";
}

export const mdxComponents = {
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: TR,
  th: TH,
  td: TD,
  pre: Pre,
  code: Code,
  h2: H2,
  h3: H3,
  h4: H4,
  Stepper,
  StepperItem,
};