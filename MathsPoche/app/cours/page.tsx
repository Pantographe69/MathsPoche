"use client";

import { AppShell } from "@/components/layout/AppShell";
import { CoursCard } from "@/components/cours/CoursCard";

const ALL_COURS = [
  {
    slug: "geometrie-angles",
    title: "Angles & droites parallèles",
    description: "Angles alternes-internes, correspondants. Propriétés et démonstrations.",
    category: "geometrie" as const,
    level: "3ème",
    difficulty: 2 as const,
  },
  {
    slug: "pythagore",
    title: "Théorème de Pythagore",
    description: "Démonstration, applications, réciproque du théorème dans le triangle rectangle.",
    category: "geometrie" as const,
    level: "4ème",
    difficulty: 2 as const,
  },
  {
    slug: "equations-1er-degre",
    title: "Équations du 1er degré",
    description: "Résolution d'équations, mise en équation de problèmes concrets.",
    category: "algebre" as const,
    level: "4ème",
    difficulty: 1 as const,
  },
  {
    slug: "fractions",
    title: "Fractions & simplifications",
    description: "Opérations sur les fractions, simplification, fractions irréductibles.",
    category: "arithmetique" as const,
    level: "5ème",
    difficulty: 1 as const,
  },
  {
    slug: "fonctions-affines",
    title: "Fonctions affines & linéaires",
    description: "Représentation graphique, coefficient directeur, ordonnée à l'origine.",
    category: "fonctions" as const,
    level: "3ème",
    difficulty: 3 as const,
  },
  {
    slug: "developper-factoriser",
    title: "Développer & factoriser",
    description: "Identités remarquables, distributivité, factorisation d'expressions.",
    category: "algebre" as const,
    level: "3ème",
    difficulty: 2 as const,
  },
];

export default function CoursPage() {
  return (
    <AppShell>
      <div className="max-w-[860px] mx-auto px-8 py-10 flex flex-col gap-8 animate-fade-in">

        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: "var(--txt3)" }}>
            Fiches de cours
          </p>
          <h1
            className="font-display font-[800] text-[26px] tracking-tight"
            style={{ color: "var(--txt)" }}
          >
            Apprends à ton rythme
          </h1>
          <p className="font-body italic text-[14px] mt-1.5" style={{ color: "var(--txt2)" }}>
            {ALL_COURS.length} fiches · collège et lycée
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-16">
          {ALL_COURS.map((cours) => (
            <CoursCard key={cours.slug} {...cours} />
          ))}
        </div>

      </div>
    </AppShell>
  );
}
