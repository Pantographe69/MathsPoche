"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={cn("w-8 h-8 rounded-[6px]", className)} />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer en thème clair" : "Passer en thème sombre"}
      className={cn(
        "relative w-8 h-8 rounded-[6px] overflow-hidden",
        "flex items-center justify-center",
        "border border-[var(--border)] bg-[var(--elevated)]",
        "text-[var(--txt2)] hover:text-[var(--txt)] hover:bg-[var(--hover)]",
        "transition-all duration-[180ms] ease-smooth cursor-pointer",
        className
      )}
    >
      {/* Sun icon */}
      <span
        className="absolute transition-all duration-300"
        style={{
          transform: isDark ? "translateY(0)" : "translateY(-22px)",
          opacity: isDark ? 1 : 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M11.89 4.11l1.06-1.06M3.05 12.95l1.06-1.06"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          />
        </svg>
      </span>

      {/* Moon icon */}
      <span
        className="absolute transition-all duration-300"
        style={{
          transform: isDark ? "translateY(22px)" : "translateY(0)",
          opacity: isDark ? 0 : 1,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M13.5 10A6 6 0 0 1 6 2.5a6 6 0 1 0 7.5 7.5z"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
}
