"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { page_routes } from "@/app/lib/routes-config";

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return page_routes
      .filter((p) => p.title.toLowerCase().includes(q) || p.href.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  // collect in-page headings (h1-h4) for searching within the current doc
  const [pageHeadings, setPageHeadings] = useState<Array<{ id: string; title: string }>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nodes = Array.from(document.querySelectorAll("article.prose h1, article.prose h2, article.prose h3, article.prose h4"));
    const headings = nodes.map((n) => {
      const el = n as HTMLElement;
      let id = el.id;
      if (!id) {
        // fallback slugify
        id = el.textContent
          ? el.textContent.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")
          : "";
      }
      return { id, title: el.textContent || "" };
    });
    setPageHeadings(headings);
  }, []);

  function goto(item: { title: string; href: string }) {
    const href = item.href.startsWith("/") ? `/docs${item.href}` : `/docs/${item.href}`;
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  function gotoLocal(h: { id: string; title: string }) {
    setOpen(false);
    setQuery("");
    // navigate to the same page with hash; this will scroll to the heading
    router.push(`${window.location.pathname}#${h.id}`);
  }

  return (
    <div className="relative w-full">
      <input
        aria-label="Search docs"
        className="w-full rounded-md border px-3 py-1 text-sm bg-background text-foreground placeholder:text-muted-foreground"
        placeholder="Search docs..."
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
      />

      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-card p-1 text-sm shadow">
          {query.trim() && pageHeadings.length > 0 && (
            <div className="pb-1">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">On this page</div>
              {pageHeadings
                .filter((h) => h.title.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 6)
                .map((h) => (
                  <div
                    key={h.id}
                    className="cursor-pointer px-2 py-1 hover:bg-muted/40"
                    onMouseDown={() => gotoLocal(h)}
                  >
                    <div className="font-medium">{h.title}</div>
                    <div className="text-xs text-muted-foreground">{h.id}</div>
                  </div>
                ))}
            </div>
          )}

          {results.length > 0 && (
            <div>
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Pages</div>
              {results.map((it) => (
                <li
                  key={it.href}
                  className="cursor-pointer list-none rounded px-2 py-1 hover:bg-muted/40"
                  onMouseDown={() => goto(it)}
                >
                  <div className="font-medium">{it.title}</div>
                  <div className="text-xs text-muted-foreground">{it.href.replace(/^\//, "")}</div>
                </li>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
