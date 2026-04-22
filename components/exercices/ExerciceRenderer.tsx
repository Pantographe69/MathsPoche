"use client";

import dynamic from "next/dynamic";

const loader = (fn: () => Promise<any>, name: string) =>
  dynamic(() => fn().then((m) => ({ default: m[name] })), {
    loading: () => <ExerciceLoader />,
    ssr: false,
  });

// ── Arithmétique ──────────────────────────────────────────────────────────────
const ExoFractionsSimplifier  = loader(() => import("./arithmetique/ExoFractionsSimplifier"),  "ExoFractionsSimplifier");
const ExoFractionsComparer    = loader(() => import("./arithmetique/ExoFractionsComparer"),    "ExoFractionsComparer");
const ExoRelatifsAddition     = loader(() => import("./arithmetique/ExoRelatifsAddition"),     "ExoRelatifsAddition");
const ExoRelatifsSoustraction = loader(() => import("./arithmetique/ExoRelatifsSoustraction"), "ExoRelatifsSoustraction");

// ── Algèbre ───────────────────────────────────────────────────────────────────
const ExoEquation1D       = loader(() => import("./algebre/ExoEquation1D"),       "ExoEquation1D");
const ExoMiseEnEquation   = loader(() => import("./algebre/ExoMiseEnEquation"),   "ExoMiseEnEquation");

// ── Géométrie ─────────────────────────────────────────────────────────────────
const ExoAnglesAlternes       = loader(() => import("./geometrie/ExoAnglesAlternes"),       "ExoAnglesAlternes");
const ExoPythagoreCalcul      = loader(() => import("./geometrie/ExoPythagoreCalcul"),      "ExoPythagoreCalcul");
const ExoPythagoreReciproque  = loader(() => import("./geometrie/ExoPythagoreReciproque"),  "ExoPythagoreReciproque");

// ── Fonctions ─────────────────────────────────────────────────────────────────
const ExoFonctionsAffinesGraphique = loader(() => import("./fonctions/ExoFonctionsAffinesGraphique"), "ExoFonctionsAffinesGraphique");
const ExoFonctionsAffinesTrace     = loader(() => import("./fonctions/ExoFonctionsAffinesTrace"),     "ExoFonctionsAffinesTrace");

// ── Analyse ───────────────────────────────────────────────────────────────────
const ExoDerivationPolynomes  = loader(() => import("./analyse/ExoDerivationPolynomes"),  "ExoDerivationPolynomes");
const ExoDerivationVariations = loader(() => import("./analyse/ExoDerivationVariations"), "ExoDerivationVariations");
const ExoLimitesCalcul        = loader(() => import("./analyse/ExoLimitesCalcul"),        "ExoLimitesCalcul");
const ExoLimitesGendarmes     = loader(() => import("./analyse/ExoLimitesGendarmes"),     "ExoLimitesGendarmes");

// ── Helpers ───────────────────────────────────────────────────────────────────
function ExerciceLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div
        className="w-6 h-6 rounded-full border-2 animate-spin"
        style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
      />
    </div>
  );
}

function ComingSoon({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 rounded-[14px] border border-dashed" style={{ borderColor: "var(--border)" }}>
      <span className="text-3xl opacity-40">🚧</span>
      <p className="font-mono text-[12px]" style={{ color: "var(--txt3)" }}>
        Exercice <em>{slug}</em> en cours de développement
      </p>
    </div>
  );
}

// ── Dispatcher ────────────────────────────────────────────────────────────────
export function ExerciceRenderer({ slug }: { slug: string }) {
  switch (slug) {
    // Arithmétique
    case "fractions-simplifier":         return <ExoFractionsSimplifier />;
    case "fractions-comparer":           return <ExoFractionsComparer />;
    case "relatifs-addition":            return <ExoRelatifsAddition />;
    case "relatifs-soustraction":        return <ExoRelatifsSoustraction />;
    // Algèbre
    case "equations-simple":             return <ExoEquation1D />;
    case "equations-mise-en-equation":   return <ExoMiseEnEquation />;
    // Géométrie
    case "angles-alternes-internes":     return <ExoAnglesAlternes />;
    case "pythagore-calcul":             return <ExoPythagoreCalcul />;
    case "pythagore-reciproque":         return <ExoPythagoreReciproque />;
    // Fonctions
    case "fonctions-affines-graphique":  return <ExoFonctionsAffinesGraphique />;
    case "fonctions-affines-equation":   return <ExoFonctionsAffinesTrace />;
    // Analyse
    case "derivation-polynomes":         return <ExoDerivationPolynomes />;
    case "derivation-variations":        return <ExoDerivationVariations />;
    case "limites-calcul":               return <ExoLimitesCalcul />;
    case "limites-theoremes":            return <ExoLimitesGendarmes />;

    default:                             return <ComingSoon slug={slug} />;
  }
}
