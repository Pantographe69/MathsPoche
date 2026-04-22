import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ExerciceMeta } from "@/content/catalogue";
import { CATEGORIE_META } from "@/content/catalogue";

interface ExerciceListItemProps {
  exercice: ExerciceMeta;
  showCours?: boolean;
}

const DIFF_LABEL = ["", "Facile", "Intermédiaire", "Difficile"];

export function ExerciceListItem({ exercice, showCours }: ExerciceListItemProps) {
  const cat = CATEGORIE_META[exercice.categorie];

  return (
    <Link
      href={`/exercices/${exercice.slug}`}
      className={cn(
        "group flex items-center gap-4 px-4 py-3.5 rounded-[10px] no-underline",
        "border border-[var(--border)] bg-[var(--surface)]",
        "hover:border-[var(--border-s)] hover:bg-[var(--elevated)]",
        "transition-all duration-[180ms]"
      )}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 border font-mono font-bold text-sm"
        style={{
          background:  "var(--elevated)",
          borderColor: "var(--border)",
          color: cat.color,
        }}
      >
        {exercice.icon}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <p
          className="font-display font-[600] text-[13.5px] leading-snug truncate"
          style={{ color: "var(--txt)" }}
        >
          {exercice.title}
        </p>
        <p className="font-mono text-[10.5px] mt-0.5" style={{ color: "var(--txt3)" }}>
          {exercice.niveau}
          {" · "}
          {DIFF_LABEL[exercice.difficulte]}
          {" · "}
          {exercice.duree}
        </p>
      </div>

      {/* Arrow */}
      <svg width="9" height="9" viewBox="0 0 11 11" fill="none" aria-hidden
        className="flex-shrink-0 opacity-30 group-hover:opacity-100 transition-opacity"
        style={{ color: "var(--accent)" }}>
        <path d="M2.5 5.5h6M6.5 3.5l2 2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  );
}
