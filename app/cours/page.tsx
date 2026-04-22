import { AppShell } from "@/components/layout/AppShell";
import { CoursCard } from "@/components/cours/CoursCard";
import { COURS, NIVEAUX } from "@/content/catalogue";

export default function CoursPage() {
  const coursByNiveau = NIVEAUX.map((niveau) => ({
    niveau,
    cours: COURS.filter((c) => c.niveau === niveau),
  })).filter((g) => g.cours.length > 0);

  return (
    <AppShell>
      <div className="max-w-[860px] mx-auto px-8 py-10 flex flex-col gap-10 animate-fade-in">

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
            {COURS.length} fiches · de la 6ème à la Terminale
          </p>
        </header>

        {coursByNiveau.map(({ niveau, cours }) => (
          <section key={niveau} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded border"
                style={{
                  color: "var(--accent)",
                  borderColor: "rgba(79,110,247,0.3)",
                  background: "var(--accent-muted)",
                }}
              >
                {niveau}
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cours.map((c) => (
                <CoursCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.title}
                  description={c.description}
                  categorie={c.categorie}
                  niveau={c.niveau}
                  difficulte={c.difficulte}
                  nbExercices={c.exercices.length}
                />
              ))}
            </div>
          </section>
        ))}

        <div className="pb-10" />
      </div>
    </AppShell>
  );
}
