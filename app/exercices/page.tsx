import { AppShell } from "@/components/layout/AppShell";
import { ExerciceListItem } from "@/components/exercices/ExerciceListItem";
import { EXERCICES, NIVEAUX, COURS_BY_SLUG } from "@/content/catalogue";

export default function ExercicesPage() {
  const exosByNiveau = NIVEAUX.map((niveau) => ({
    niveau,
    exercices: EXERCICES.filter((e) => e.niveau === niveau),
  })).filter((g) => g.exercices.length > 0);

  return (
    <AppShell>
      <div className="max-w-[760px] mx-auto px-8 py-10 flex flex-col gap-10 animate-fade-in">

        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: "var(--txt3)" }}>
            Exercices
          </p>
          <h1
            className="font-display font-[800] text-[26px] tracking-tight"
            style={{ color: "var(--txt)" }}
          >
            Entraîne-toi
          </h1>
          <p className="font-body italic text-[14px] mt-1.5" style={{ color: "var(--txt2)" }}>
            {EXERCICES.length} exercices · de la 6ème à la Terminale
          </p>
        </header>

        {exosByNiveau.map(({ niveau, exercices }) => (
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

            <div className="flex flex-col gap-2">
              {exercices.map((exo) => {
                const cours = COURS_BY_SLUG[exo.coursSlug];
                return (
                  <div key={exo.slug} className="flex flex-col gap-0.5">
                    <ExerciceListItem exercice={exo} />
                    {cours && (
                      <p className="font-mono text-[10px] pl-1" style={{ color: "var(--txt3)" }}>
                        Cours lié :{" "}
                        <a
                          href={`/cours/${cours.slug}`}
                          className="no-underline hover:underline"
                          style={{ color: "var(--accent)" }}
                        >
                          {cours.title}
                        </a>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div className="pb-10" />
      </div>
    </AppShell>
  );
}
