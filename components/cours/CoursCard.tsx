"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Categorie, Niveau } from "@/content/catalogue";
import { CATEGORIE_META } from "@/content/catalogue";

interface CoursCardProps {
  slug:         string;
  title:        string;
  description:  string;
  categorie:    Categorie;
  niveau:       Niveau;
  difficulte:   1 | 2 | 3;
  nbExercices?: number;
  className?:   string;
}

export function CoursCard({
  slug, title, description, categorie, niveau, difficulte, nbExercices, className,
}: CoursCardProps) {
  const cat = CATEGORIE_META[categorie];

  return (
    <Link
      href={`/cours/${slug}`}
      className={cn(
        "group block no-underline p-4 rounded-[12px] border",
        "border-[var(--border)] bg-[var(--surface)]",
        "hover:border-[var(--border-s)] hover:bg-[var(--elevated)]",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow)]",
        "transition-all duration-[180ms]",
        className
      )}
    >
      {/* Category tag */}
      <div
        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] mb-2.5"
        style={{ color: cat.color }}
      >
        {cat.label}
      </div>

      {/* Title */}
      <h2
        className="font-display font-[700] text-[15px] leading-snug mb-1.5 tracking-tight"
        style={{ color: "var(--txt)" }}
      >
        {title}
      </h2>

      {/* Description */}
      <p
        className="font-body italic text-[12.5px] leading-relaxed mb-4"
        style={{ color: "var(--txt2)" }}
      >
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2" style={{ color: "var(--txt3)" }}>
          {/* Difficulty pips */}
          <div className="level-pip">
            {[1, 2, 3].map((n) => (
              <span key={n} className={n <= difficulte ? "filled" : ""} />
            ))}
          </div>
          <span className="font-mono text-[10px]">{niveau}</span>
          {nbExercices !== undefined && (
            <span className="font-mono text-[10px]">· {nbExercices} exo{nbExercices > 1 ? "s" : ""}</span>
          )}
        </div>

        {/* Arrow */}
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-muted)] transition-all duration-[180ms]"
          style={{ color: "var(--txt3)" }}
        >
          <svg width="9" height="9" viewBox="0 0 11 11" fill="none" aria-hidden>
            <path d="M2.5 5.5h6M6.5 3.5l2 2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </Link>
  );
}
