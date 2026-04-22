"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Lazy-load each exercise component to avoid bundling JSXGraph everywhere
const ExoAnglesAlternes = dynamic(
  () =>
    import("@/components/exercices/geometrie/ExoAnglesAlternes").then(
      (m) => m.ExoAnglesAlternes
    ),
  {
    loading: () => <ExerciceLoader />,
    ssr: false, // JSXGraph requires the DOM
  }
);

const ExoEquation1D = dynamic(
  () =>
    import("@/components/exercices/algebre/ExoEquation1D").then(
      (m) => m.ExoEquation1D
    ),
  { loading: () => <ExerciceLoader /> }
);

/* ── Placeholder for not-yet-implemented exercises ── */
function ComingSoon({ slug }: { slug: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16",
        "rounded-[14px] border border-dashed border-[var(--border)]"
      )}
    >
      <span className="text-3xl opacity-40">🚧</span>
      <p className="font-mono text-[12px]" style={{ color: "var(--txt3)" }}>
        Exercice <em>{slug}</em> en cours de développement
      </p>
    </div>
  );
}

function ExerciceLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div
        className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
      />
    </div>
  );
}

/* ── Main renderer ── */
export function ExerciceRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case "angles-alternes-internes":
      return <ExoAnglesAlternes />;
    case "equations-1er-degre":
      return <ExoEquation1D />;
    default:
      return <ComingSoon slug={slug} />;
  }
}
