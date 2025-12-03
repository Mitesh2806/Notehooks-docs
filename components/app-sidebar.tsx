"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ROUTES, type EachRoute } from "@/app/lib/routes-config";

interface AppSidebarProps {
  onLinkClick?: () => void;
}

export function AppSidebar({ onLinkClick }: AppSidebarProps = {}) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(ROUTES.map((route) => route.title))
  );

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const renderRoute = (route: EachRoute, basePath = "") => {
    const fullPath = basePath + route.href;
    const isExpanded = expandedSections.has(route.title);
    const hasItems = route.items && route.items.length > 0;
    const isActive = pathname === fullPath;

    return (
      <div key={route.title}>
        {hasItems ? (
          <>
            <button
              onClick={() => toggleSection(route.title)}
              className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors mb-2"
            >
              <div className="flex items-center gap-2">
                <span>{route.title}</span>
                {route.tag && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {route.tag}
                  </span>
                )}
              </div>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {isExpanded && route.items && (
              <ul className="space-y-1 ml-4 border-l border-border mb-4">
                {route.items.map((item) => {
                  const itemPath = '/docs'+ fullPath + item.href;
                  const itemActive = pathname === itemPath;

                  return (
                    <li key={item.href}>
                      {item.noLink ? (
                        <div className="py-1.5 px-3 text-sm font-medium text-foreground">
                          {item.title}
                          {item.tag && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {item.tag}
                            </span>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={itemPath}
                          onClick={onLinkClick}
                          className={`block py-1.5 px-3 text-sm transition-colors border-l-2 -ml-px ${
                            itemActive
                              ? "border-primary text-primary font-medium bg-primary/5"
                              : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {item.title}
                            {item.tag && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                {item.tag}
                              </span>
                            )}
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          !route.noLink && (
            <Link
              href={fullPath}
              onClick={onLinkClick}
              className={`block py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                {route.title}
                {route.tag && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {route.tag}
                  </span>
                )}
              </span>
            </Link>
          )
        )}
      </div>
    );
  };

  return (
    <aside className="w-64 h-[calc(100vh-4em)] sticky top-16 overflow-y-auto border-r bg-background p-4">
      <div className="space-y-4">
        {ROUTES.map((route) => renderRoute(route))}
      </div>
    </aside>
  );
}