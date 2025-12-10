"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const pathname = usePathname();

  useEffect(() => {
    // Extract headings after a short delay to ensure DOM is ready
    const extractHeadings = () => {
      // Select all headings inside article or main content
      const elements = document.querySelectorAll("article h2, article h3, article h4, main h2, main h3, main h4");
      
      const headingData = Array.from(elements).map((elem) => ({
        id: elem.id,
        text: elem.textContent || "",
        level: parseInt(elem.tagName.charAt(1)),
      }));
      
      setHeadings(headingData);
      
      // Initial active state - set first heading as active
      if (headingData.length > 0) {
        setActiveId(headingData[0].id);
      }
    };

    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the heading closest to the top of the viewport
      let closestHeading = null;
      let closestDistance = Infinity;

      entries.forEach((entry) => {
        const distance = Math.abs(entry.boundingClientRect.top);
        if (entry.isIntersecting && distance < closestDistance) {
          closestDistance = distance;
          closestHeading = entry.target.id;
        }
      });

      // If a heading is in view, update active
      if (closestHeading) {
        setActiveId(closestHeading);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-80px 0px -66% 0px", // Adjusted for better tracking
      threshold: 0,
    });

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 80px offset for the fixed header
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p className="font-semibold text-sm mb-3">On This Page</p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={`text-left w-full transition-colors block py-1 border-l-2 ${
                activeId === heading.id
                  ? "border-primary font-medium text-foreground pl-3"
                  : "border-transparent text-muted-foreground hover:text-foreground pl-3"
              }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}