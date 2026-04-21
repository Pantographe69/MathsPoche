"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout-shell">
      <Navbar
        onMenuToggle={() => setSidebarOpen((v) => !v)}
        menuOpen={sidebarOpen}
      />

      {/* Desktop sidebar */}
      <div className="hidden md:block" style={{ gridArea: "sidebar" }}>
        <Sidebar className="h-full" />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
          <div
            className={cn(
              "fixed top-0 left-0 h-full z-[200] md:hidden",
              "animate-slide-in-right"
            )}
            style={{ width: "var(--sidebar-w)" }}
          >
            <Sidebar className="h-full pt-[var(--navbar-h)]" />
          </div>
        </>
      )}

      <main
        className="overflow-y-auto"
        style={{ gridArea: "main" }}
      >
        {children}
      </main>
    </div>
  );
}
