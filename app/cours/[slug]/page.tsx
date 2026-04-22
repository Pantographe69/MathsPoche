import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { COURS, COURS_BY_SLUG, EXERCICES_BY_COURS, CATEGORIE_META } from "@/content/catalogue";
import { ExerciceListItem } from "@/components/exercices/ExerciceListItem";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return COURS.map((c) => ({ slug: c.slug }));
}

export default async function CoursSlugPage({ params }: Props) {
  const cours = COURS_BY_SLUG[params.slug];
  if (!cours) notFound();

  const exercices = EXERCICES_BY_COURS[params.slug] ?? [];
  const catMeta = CATEGORIE_META[cours.categorie];

  let Content: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/cours/${params.slug}.mdx`);
    Content = mod.default;
  } catch {
    // MDX not yet written
  }

  return (
    <AppShell>
      <div className="max-w-[720px] mx-auto px-8 py-10 animate-fade-in">

        {/* Back */}
        <Link
          href="/cours"
          className={cn(
            "inline-flex items-center gap-1.5 font-mono text-[11px] no-underline mb-8",
            "text-[var(--txt3)] hover:text-[var(--txt)] transition-colors duration-[180ms]"
          )}
        >
          <svg width="9" height="9" viewBox="0 0 11 11" fill="none" aria-hidden>
            <path d="M8 5.5H2M4.5 3.5l-2 2 2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Fiches de cours
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded border"
              style={{ color: catMeta.color, borderColor: `${catMeta.color}40`, background: `${catMeta.color}15` }}
            >
              {catMeta.label}
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded border"
              style={{ color: "var(--accent)", borderColor: "rgba(79,110,247,0.3)", background: "var(--accent-muted)" }}
            >
              {cours.niveau}
            </span>
            <span className="font-mono text-[10px]" style={{ color: "var(--txt3)" }}>
              {cours.duree}
            </span>
          </div>
          <h1
            className="font-display font-[800] text-[28px] tracking-tight leading-tight"
            style={{ color: "var(--txt)" }}
          >
            {cours.title}
          </h1>
          <p className="font-body italic text-[14px]" style={{ color: "var(--txt2)" }}>
            {cours.description}
          </p>
        </div>

        {/* MDX content */}
        {Content ? (
          <article className="mdx-content">
            <Content />
          </article>
        ) : (
          <div
            className="flex flex-col items-center gap-3 py-16 rounded-[14px] border border-dashed mb-8"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="text-3xl opacity-30">📄</span>
            <p className="font-mono text-[12px]" style={{ color: "var(--txt3)" }}>
              Le contenu MDX de cette fiche sera ajouté prochainement.
            </p>
          </div>
        )}

        {/* Exercices liés */}
        {exercices.length > 0 && (
          <section className="mt-12 flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--txt3)" }}>
                Exercices liés
              </p>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <span className="font-mono text-[10px]" style={{ color: "var(--txt3)" }}>
                {exercices.length} exercice{exercices.length > 1 ? "s" : ""}
              </span>
            </div>
            {exercices.map((exo) => (
              <ExerciceListItem key={exo.slug} exercice={exo} />
            ))}
          </section>
        )}

      </div>
    </AppShell>
  );
}
