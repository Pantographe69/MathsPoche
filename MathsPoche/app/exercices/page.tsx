"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ExerciceListItem } from "@/components/exercices/ExerciceListItem";
import { EXERCICES, type ExerciceCategory } from "@/content/exercices/metadata";

const CATEGORIES: { id: ExerciceCategory | "all"; label: string }[] = [
  { id: "all",          label: "Tous" },
  { id: "geometrie",    label: "Géométrie" },
  { id: "algebre",      label: "Algèbre" },
  { id: "arithmetique", label: "Arithmétique" },
  { id: "fonctions",    label: "Fonctions" },
];

export default function ExercicesPage() {
  return (
    <AppShell>
      <div className="max-w-[760px] mx-auto px-8 py-10 flex flex-col gap-8 animate-fade-in">

        {/* Header */}
        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: "var(--txt3)" }}>
            Exercices interactifs
          </p>
          <h1
            className="font-display font-[800] text-[26px] tracking-tight"
            style={{ color: "var(--txt)" }}
          >
            Entraîne-toi
          </h1>
          <p className="font-body italic text-[14px] mt-1.5" style={{ color: "var(--txt2)" }}>
            {EXERCICES.length} exercices disponibles · géométrie, algèbre, fonctions
          </p>
        </header>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.id}
              className="font-mono text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-[180ms]"
              style={{
                color:       cat.id === "all" ? "var(--accent)" : "var(--txt3)",
                borderColor: cat.id === "all" ? "rgba(79,110,247,0.3)" : "var(--border)",
                background:  cat.id === "all" ? "var(--accent-muted)" : "var(--elevated)",
              }}
            >
              {cat.label}
            </span>
          ))}
        </div>

        {/* Exercise list */}
        <div className="flex flex-col gap-2 pb-16">
          {EXERCICES.map((exo) => (
            <ExerciceListItem key={exo.slug} exercice={exo} />
          ))}
        </div>

      </div>
    </AppShell>
  );
}
