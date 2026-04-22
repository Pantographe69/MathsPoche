"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuToggle?: () => void;
  menuOpen?: boolean;
}

export function Navbar({ onMenuToggle, menuOpen }: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav
      className="sticky top-0 z-[100] flex items-center px-5 border-b border-[var(--border)]"
      style={{
        gridArea: "navbar",
        height: "var(--navbar-h)",
        background: "var(--surface)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "background var(--t-slow), border-color var(--t-slow)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 no-underline flex-shrink-0 group"
        style={{ width: "var(--sidebar-w)", paddingRight: "20px" }}
      >
        <span
          className="w-[34px] h-[34px] rounded-[6px] flex items-center justify-center text-white flex-shrink-0"
          style={{
            background: "var(--accent)",
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "15px",
            letterSpacing: "-0.5px",
            transition: "box-shadow var(--t), transform var(--t)",
          }}
        >
          𝑀
        </span>
        <span
          className="font-display font-bold text-[17px] tracking-tight"
          style={{ color: "var(--txt)" }}
        >
          Math<span style={{ color: "var(--accent)" }}>Poche</span>
        </span>
      </Link>

      {/* Search */}
      <div className="flex-1 flex items-center gap-2">
        <div
          className={cn(
            "flex items-center gap-2 rounded-[6px] px-3 py-[7px] cursor-text",
            "border bg-[var(--elevated)] transition-all",
            searchFocused
              ? "border-[var(--accent)] bg-[var(--hover)] w-72"
              : "border-[var(--border)] w-60"
          )}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden
            className="text-[var(--txt3)] flex-shrink-0">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="search"
            placeholder="Rechercher un cours ou exercice…"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent border-none outline-none font-mono text-[12px] w-full"
            style={{ color: "var(--txt)" }}
          />
          <kbd
            className="font-mono text-[10px] px-1.5 py-0.5 rounded border hidden sm:block flex-shrink-0"
            style={{ color: "var(--txt3)", borderColor: "var(--border)", background: "var(--elevated)" }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Level badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] border font-mono text-[11px]"
          style={{
            color: "var(--accent)",
            borderColor: "rgba(79,110,247,0.25)",
            background: "var(--accent-muted)",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 1l2.2 4.5 5 .7-3.6 3.5.85 5L8 12.4l-4.45 2.3.85-5L.8 6.2l5-.7L8 1z"
              fill="currentColor"/>
          </svg>
          3ème · Niveau 4
        </div>

        <ThemeToggle />

        {/* Mobile menu btn */}
        <button
          onClick={onMenuToggle}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className={cn(
            "md:hidden w-8 h-8 rounded-[6px] flex items-center justify-center",
            "border border-[var(--border)] bg-[var(--elevated)]",
            "text-[var(--txt2)] hover:text-[var(--txt)] hover:bg-[var(--hover)]",
            "transition-all cursor-pointer"
          )}
        >
          {menuOpen ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
