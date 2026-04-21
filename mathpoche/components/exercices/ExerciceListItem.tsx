import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ExerciceMeta } from "@/content/exercices/metadata";

type Status = "todo" | "inprogress" | "done";

interface ExerciceListItemProps {
  exercice: ExerciceMeta;
  status?:  Status;
}

const STATUS_STYLES: Record<Status, { dot: string; label: string }> = {
  done:       { dot: "bg-[var(--green)]",  label: "Terminé" },
  inprogress: { dot: "bg-[var(--amber)]",  label: "En cours" },
  todo:       { dot: "bg-[var(--border-s)]", label: "À faire" },
};

const TYPE_LABEL: Record<string, string> = {
  "interactif":      "Interactif",
  "etape-par-etape": "Étape par étape",
  "guidé":           "Guidé",
  "graphique":       "Graphique",
};

export function ExerciceListItem({ exercice, status = "todo" }: ExerciceListItemProps) {
  const s = STATUS_STYLES[status];

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
        className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 border"
        style={{
          background:  "var(--elevated)",
          borderColor: "var(--border)",
          fontSize:    "18px",
          lineHeight:  1,
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
          {exercice.category.charAt(0).toUpperCase() + exercice.category.slice(1)}
          {" · "}
          {exercice.duration}
          {" · "}
          {TYPE_LABEL[exercice.type] ?? exercice.type}
        </p>
      </div>

      {/* Status dot */}
      <span
        className={cn("w-2 h-2 rounded-full flex-shrink-0", s.dot)}
        aria-label={s.label}
        title={s.label}
      />
    </Link>
  );
}
