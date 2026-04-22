"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ExerciceMeta } from "@/content/catalogue";
import { CATEGORIE_META, COURS_BY_SLUG } from "@/content/catalogue";

interface ExerciceShellProps {
  meta:     ExerciceMeta;
  children: React.ReactNode;
}

const DIFF_LABEL = ["", "Facile", "Intermédiaire", "Difficile"];

export function ExerciceShell({ meta, children }: ExerciceShellProps) {
  const cat = CATEGORIE_META[meta.categorie];
  const cours = COURS_BY_SLUG[meta.coursSlug];

  return (
    <>
      {/* ── Top bar ───────────────────────────────────────────────────── */}
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

          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px]" style={{ color: "var(--txt3)" }}>
            <span style={{ color: cat.color }}>{cat.label}</span>
            <span>›</span>
            <span>{meta.title}</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2" style={{ color: "var(--txt3)" }}>
            <div className="level-pip">
              {[1, 2, 3].map((n) => (
                <span key={n} className={n <= meta.difficulte ? "filled" : ""} />
              ))}
            </div>
            <span className="font-mono text-[10px]">{meta.niveau}</span>
          </div>
          <span
            className="font-mono text-[10px] px-2 py-1 rounded-[5px] border"
            style={{
              color:       "var(--accent)",
              borderColor: "rgba(79,110,247,0.25)",
              background:  "var(--accent-muted)",
            }}
          >
            {meta.duree}
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="max-w-[680px] mx-auto px-8 py-8 flex flex-col gap-6">

        {/* Exercise header */}
        <header className="flex flex-col gap-1.5">
          <span
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em]"
            style={{ color: cat.color }}
          >
            <span className="inline-block w-4 h-px" style={{ background: cat.color }} />
            {cat.label} · {DIFF_LABEL[meta.difficulte]}
          </span>
          <h1
            className="font-display font-[800] text-[22px] tracking-tight"
            style={{ color: "var(--txt)" }}
          >
            {meta.title}
          </h1>
          <p className="font-body italic text-[14px] leading-relaxed" style={{ color: "var(--txt2)" }}>
            {meta.description}
          </p>
        </header>

        {/* Exercise component */}
        {children}

        {/* Cours lié */}
        {cours && (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-[10px] border mt-4"
            style={{ borderColor: "var(--border)", background: "var(--elevated)" }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color: "var(--accent)", flexShrink: 0 }}>
              <path d="M2 3h12v10H2zM2 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: "var(--txt3)" }}>
                Cours associé
              </p>
              <Link
                href={`/cours/${cours.slug}`}
                className="font-display font-[600] text-[13px] no-underline hover:underline"
                style={{ color: "var(--txt)" }}
              >
                {cours.title}
              </Link>
            </div>
            <Link
              href={`/cours/${cours.slug}`}
              className={cn(
                "font-mono text-[10px] no-underline px-2.5 py-1.5 rounded-[6px] border flex-shrink-0",
                "border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
                "transition-all duration-[180ms]"
              )}
              style={{ color: "var(--txt3)" }}
            >
              Voir le cours →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
