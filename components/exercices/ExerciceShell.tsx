import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ExerciceMeta } from "@/content/exercices/metadata";

interface ExerciceShellProps {
  meta:     ExerciceMeta;
  children: React.ReactNode;
  panel?:   React.ReactNode; // right-side panel (steps, hints, score)
}

const CATEGORY_LABEL: Record<string, string> = {
  geometrie:    "Géométrie",
  algebre:      "Algèbre",
  arithmetique: "Arithmétique",
  fonctions:    "Fonctions",
};

export function ExerciceShell({ meta, children, panel }: ExerciceShellProps) {
  return (
    <>
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div
        className="sticky top-[var(--navbar-h)] z-50 flex items-center justify-between px-6 border-b"
        style={{
          height:     "52px",
          background: "var(--surface)",
          borderColor: "var(--border)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link
            href="/exercices"
            className={cn(
              "flex items-center gap-1.5 font-mono text-[11px] no-underline",
              "px-2.5 py-1.5 rounded-[6px] border",
              "border-[var(--border)] bg-[var(--elevated)]",
              "text-[var(--txt2)] hover:text-[var(--txt)] hover:bg-[var(--hover)]",
              "transition-all duration-[180ms]"
            )}
          >
            <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden>
              <path d="M8 5.5H2M4.5 3.5l-2 2 2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Exercices
          </Link>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px]" style={{ color: "var(--txt3)" }}>
            <span style={{ color: "var(--txt2)" }}>
              {CATEGORY_LABEL[meta.category] ?? meta.category}
            </span>
            <span>›</span>
            <span style={{ color: "var(--txt3)" }}>{meta.title}</span>
          </div>
        </div>

        {/* Right — difficulty & level */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2" style={{ color: "var(--txt3)" }}>
            <div className="level-pip">
              {[1, 2, 3].map((n) => (
                <span key={n} className={n <= meta.difficulty ? "filled" : ""} />
              ))}
            </div>
            <span className="font-mono text-[10px]">{meta.level}</span>
          </div>
          <span
            className="font-mono text-[10px] px-2 py-1 rounded-[5px] border"
            style={{
              color:       "var(--accent)",
              borderColor: "rgba(79,110,247,0.25)",
              background:  "var(--accent-muted)",
            }}
          >
            {meta.duration}
          </span>
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div
        className="grid min-h-[calc(100vh-var(--navbar-h)-52px)]"
        style={{
          gridTemplateColumns: panel ? "1fr 320px" : "1fr",
        }}
      >
        {/* Canvas / content zone */}
        <div className="p-8 flex flex-col gap-6">
          {/* Exercise header */}
          <header className="flex flex-col gap-1.5">
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em]"
              style={{ color: "var(--accent)" }}
            >
              <span className="inline-block w-4 h-px" style={{ background: "var(--accent)" }} />
              {CATEGORY_LABEL[meta.category]} · {meta.type}
            </span>
            <h1
              className="font-display font-[800] text-[22px] tracking-tight"
              style={{ color: "var(--txt)" }}
            >
              {meta.title}
            </h1>
            <p
              className="font-body italic text-[14px] leading-relaxed"
              style={{ color: "var(--txt2)" }}
            >
              {meta.description}
            </p>
          </header>

          {children}
        </div>

        {/* Right panel */}
        {panel && (
          <div
            className="border-l border-[var(--border)] p-6 flex flex-col gap-6 sticky top-[calc(var(--navbar-h)+52px)] self-start"
            style={{ maxHeight: "calc(100vh - var(--navbar-h) - 52px)", overflowY: "auto" }}
          >
            {panel}
          </div>
        )}
      </div>
    </>
  );
}
