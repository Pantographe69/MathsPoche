import { AppShell } from "@/components/layout/AppShell";
import { CoursCard } from "@/components/cours/CoursCard";
import { ExerciceListItem } from "@/components/exercices/ExerciceListItem";
import { EXERCICES } from "@/content/exercices/metadata";
import { SectionLabel } from "@/components/layout/SectionLabel";

export default function HomePage() {
  const featuredCours = [
    {
      slug: "geometrie-angles",
      title: "Angles & droites parallèles",
      description: "Angles alternes-internes, correspondants. Propriétés et démonstrations.",
      category: "geometrie" as const,
      level: "3ème",
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
      slug: "fonctions-affines",
      title: "Fonctions affines & linéaires",
      description: "Représentation graphique, coefficient directeur, ordonnée à l'origine.",
      category: "fonctions" as const,
      level: "3ème",
      difficulty: 3 as const,
    },
  ];

  return (
    <AppShell>
      <div className="max-w-[860px] mx-auto px-8 py-10 flex flex-col gap-10 animate-fade-in">

        {/* ── Welcome header ────────────────────────────────────────────── */}
        <header className="flex flex-col gap-1.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--txt3)" }}>
            Bonjour 👋
          </p>
          <h1
            className="font-display font-[800] text-[28px] tracking-tight leading-tight"
            style={{ color: "var(--txt)" }}
          >
            Où veux-tu progresser{" "}
            <span style={{ color: "var(--accent)" }}>aujourd'hui ?</span>
          </h1>
        </header>

        {/* ── Stats row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "14", suffix: "/20", label: "Dernière note" },
            { value: "42", suffix: "%",   label: "Chapitre actuel" },
            { value: "8",  suffix: "",    label: "Exercices complétés" },
            { value: "3",  suffix: "",    label: "Jours de suite 🔥" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 p-4 rounded-[12px] border border-[var(--border)]"
              style={{ background: "var(--elevated)" }}
            >
              <span className="font-display font-[800] text-[22px] tracking-tight" style={{ color: "var(--txt)" }}>
                {stat.value}
                <span className="text-[14px] font-[500]" style={{ color: "var(--txt3)" }}>
                  {stat.suffix}
                </span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: "var(--txt3)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Formula band ──────────────────────────────────────────────── */}
        <div
          className="flex items-start gap-4 px-5 py-4 rounded-[10px] border-l-[3px]"
          style={{
            background: "var(--elevated)",
            border: "1px solid var(--border)",
            borderLeftColor: "var(--accent)",
            borderLeftWidth: "3px",
          }}
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.1em] mt-0.5 flex-shrink-0 px-1.5 py-0.5 rounded border"
            style={{ color: "var(--accent)", borderColor: "rgba(79,110,247,0.3)", background: "var(--accent-muted)" }}
          >
            Rappel
          </span>
          <p className="font-mono text-[13px] leading-relaxed" style={{ color: "var(--txt2)" }}>
            Dans tout triangle, la somme des angles est égale à{" "}
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>180°</span>
            <br />
            <span style={{ color: "var(--accent)" }}>α</span> +{" "}
            <span style={{ color: "var(--accent)" }}>β</span> +{" "}
            <span style={{ color: "var(--accent)" }}>γ</span> = 180°
          </p>
        </div>

        {/* ── Cours section ─────────────────────────────────────────────── */}
        <section>
          <SectionLabel
            href="/cours"
            label="Fiches de cours"
            count={featuredCours.length}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            {featuredCours.map((cours) => (
              <CoursCard key={cours.slug} {...cours} />
            ))}
          </div>
        </section>

        {/* ── Exercices section ─────────────────────────────────────────── */}
        <section className="pb-10">
          <SectionLabel
            href="/exercices"
            label="Exercices recommandés"
            count={EXERCICES.length}
          />
          <div className="mt-3 flex flex-col gap-2">
            {EXERCICES.slice(0, 4).map((exo) => (
              <ExerciceListItem key={exo.slug} exercice={exo} />
            ))}
          </div>
        </section>

      </div>
    </AppShell>
  );
}


