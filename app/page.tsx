import { AppShell } from "@/components/layout/AppShell";
import { CoursCard } from "@/components/cours/CoursCard";
import { ExerciceListItem } from "@/components/exercices/ExerciceListItem";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { COURS, EXERCICES, NIVEAUX } from "@/content/catalogue";

export default function HomePage() {
  // 3 premiers cours (un par niveau différent)
  const featuredCours = COURS.slice(0, 3);
  // 4 premiers exercices
  const featuredExos = EXERCICES.slice(0, 4);

  return (
    <AppShell>
      <div className="max-w-[860px] mx-auto px-8 py-10 flex flex-col gap-10 animate-fade-in">

        {/* ── Welcome header ─────────────────────────────────────────── */}
        <header className="flex flex-col gap-1.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--txt3)" }}>
            Bienvenue 👋
          </p>
          <h1
            className="font-display font-[800] text-[28px] tracking-tight leading-tight"
            style={{ color: "var(--txt)" }}
          >
            Où veux-tu progresser{" "}
            <span style={{ color: "var(--accent)" }}>aujourd'hui ?</span>
          </h1>
        </header>

        {/* ── Niveaux disponibles ────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          {NIVEAUX.map((niveau) => {
            const count = COURS.filter((c) => c.niveau === niveau).length;
            return (
              <a
                key={niveau}
                href={`/cours#${niveau}`}
                className="font-mono text-[11px] px-3 py-1.5 rounded-full border no-underline transition-all duration-[180ms] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{
                  color: "var(--txt2)",
                  borderColor: "var(--border)",
                  background: "var(--elevated)",
                }}
              >
                {niveau}
                {count > 0 && (
                  <span className="ml-1.5 opacity-50">{count}</span>
                )}
              </a>
            );
          })}
        </div>

        {/* ── Cours section ──────────────────────────────────────────── */}
        <section>
          <SectionLabel
            href="/cours"
            label="Fiches de cours"
            count={COURS.length}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            {featuredCours.map((cours) => (
              <CoursCard
                key={cours.slug}
                slug={cours.slug}
                title={cours.title}
                description={cours.description}
                categorie={cours.categorie}
                niveau={cours.niveau}
                difficulte={cours.difficulte}
                nbExercices={cours.exercices.length}
              />
            ))}
          </div>
        </section>

        {/* ── Exercices section ──────────────────────────────────────── */}
        <section className="pb-10">
          <SectionLabel
            href="/exercices"
            label="Exercices"
            count={EXERCICES.length}
          />
          <div className="mt-3 flex flex-col gap-2">
            {featuredExos.map((exo) => (
              <ExerciceListItem key={exo.slug} exercice={exo} />
            ))}
          </div>
        </section>

      </div>
    </AppShell>
  );
}
