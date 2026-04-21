"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MathRendererProps {
  /** LaTeX source string, e.g. "\\frac{a}{b}" */
  latex:        string;
  /** If true, render as display math (centered, larger). */
  displayMode?: boolean;
  className?:   string;
}

/**
 * MathRenderer
 * Renders a LaTeX string via KaTeX (loaded from CDN in RootLayout).
 * Falls back to raw LaTeX text if KaTeX is not yet available.
 */
export function MathRenderer({
  latex,
  displayMode = false,
  className,
}: MathRendererProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const render = () => {
      // KaTeX is loaded via CDN script tag in layout.tsx
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const katex = (window as any).katex as typeof import("katex") | undefined;
      if (!katex) return;

      try {
        katex.render(latex, ref.current!, {
          displayMode,
          throwOnError: false,
          output: "html",
          strict: false,
        });
      } catch (e) {
        console.warn("[MathRenderer] KaTeX error:", e);
        if (ref.current) ref.current.textContent = latex;
      }
    };

    // If KaTeX script is still loading, wait for it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).katex) {
      render();
    } else {
      // Poll until available (CDN script has defer)
      const interval = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).katex) {
          clearInterval(interval);
          render();
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [latex, displayMode]);

  return (
    <span
      ref={ref}
      className={cn(displayMode ? "block" : "inline", className)}
      aria-label={latex}
    >
      {latex}
    </span>
  );
}

/** Convenience for display-mode (block) math. */
export function MathBlock({
  latex,
  className,
}: {
  latex: string;
  className?: string;
}) {
  return (
    <MathRenderer
      latex={latex}
      displayMode
      className={cn("my-4 overflow-x-auto", className)}
    />
  );
}
