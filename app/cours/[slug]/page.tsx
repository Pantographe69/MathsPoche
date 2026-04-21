import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── Static slugs (expand as you add .mdx files) ── */
const VALID_SLUGS = [
  "geometrie-angles",
  "fractions",
  "equations-1er-degre",
  "fonctions-affines",
  "pythagore",
  "developper-factoriser",
];

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export default async function CoursSlugPage({ params }: Props) {
  if (!VALID_SLUGS.includes(params.slug)) notFound();

  // Dynamically import the MDX file — falls back to a placeholder if not found
  let Content: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/cours/${params.slug}.mdx`);
    Content = mod.default;
  } catch {
    // MDX not yet written — show a placeholder
  }

  return (
    <AppShell>
      <div className="max-w-[680px] mx-auto px-8 py-10 animate-fade-in">

        {/* Back link */}
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

        {Content ? (
          <article className="mdx-content">
            <Content />
          </article>
        ) : (
          <CoursPlaceholder slug={params.slug} />
        )}
      </div>
    </AppShell>
  );
}

/* ── Placeholder ── */
function CoursPlaceholder({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div
        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em]"
        style={{ color: "var(--accent)" }}
      >
        <span className="inline-block w-4 h-px" style={{ background: "var(--accent)" }} />
        Fiche en cours de rédaction
      </div>

      <h1
        className="font-display font-[800] text-[26px] tracking-tight"
        style={{ color: "var(--txt)" }}
      >
        {slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
      </h1>

      <div
        className="flex flex-col items-center gap-3 py-16 rounded-[14px] border border-dashed"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-3xl opacity-30">📄</span>
        <p className="font-mono text-[12px]" style={{ color: "var(--txt3)" }}>
          Le contenu MDX de cette fiche sera ajouté prochainement.
        </p>
        <p className="font-mono text-[11px]" style={{ color: "var(--txt3)" }}>
          Crée{" "}
          <code
            className="px-1.5 py-0.5 rounded"
            style={{ background: "var(--elevated)", color: "var(--accent)" }}
          >
            content/cours/{slug}.mdx
          </code>
        </p>
      </div>
    </div>
  );
}
