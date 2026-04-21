import Link from "next/link";
import { cn } from "@/lib/utils";

export type CoursCategory = "geometrie" | "algebre" | "fonctions" | "arithmetique";

interface CoursCardProps {
  slug:        string;
  title:       string;
  description: string;
  category:    CoursCategory;
  level:       string;
  difficulty:  1 | 2 | 3;
  className?:  string;
}

const CATEGORY_META: Record<CoursCategory, { label: string; icon: React.ReactNode }> = {
  geometrie: {
    label: "Géométrie",
    icon: (
      <svg width="9" height="9" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M8 1L15 13H1L8 1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  algebre: {
    label: "Algèbre",
    icon: (
      <svg width="9" height="9" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M2 8h12M8 2v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  fonctions: {
    label: "Fonctions",
    icon: (
      <svg width="9" height="9" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M1 13C3 13 4 3 7 3s3 10 5 10 2-4 3-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  arithmetique: {
    label: "Arithmétique",
    icon: (
      <svg width="9" height="9" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3 8h10M8 3v10M4 4l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
};

export function CoursCard({
  slug, title, description, category, level, difficulty, className,
}: CoursCardProps) {
  const meta = CATEGORY_META[category];

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
        style={{ color: "var(--accent)" }}
      >
        {meta.icon}
        {meta.label}
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
              <span key={n} className={n <= difficulty ? "filled" : ""} />
            ))}
          </div>
          <span className="font-mono text-[10px]">{level}</span>
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
