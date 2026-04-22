// ─── Types ────────────────────────────────────────────────────────────────────

export type Niveau =
  | "6ème" | "5ème" | "4ème" | "3ème"
  | "2nde" | "1ère" | "Terminale";

export type Categorie =
  | "geometrie" | "algebre" | "arithmetique"
  | "fonctions" | "statistiques" | "trigonometrie" | "analyse";

export type Difficulte = 1 | 2 | 3;

export interface CoursMeta {
  slug:        string;
  title:       string;
  description: string;
  niveau:      Niveau;
  categorie:   Categorie;
  difficulte:  Difficulte;
  duree:       string;        // "15 min"
  exercices:   string[];      // slugs des exercices liés
}

export interface ExerciceMeta {
  slug:        string;
  title:       string;
  description: string;
  niveau:      Niveau;
  categorie:   Categorie;
  difficulte:  Difficulte;
  duree:       string;
  icon:        string;
  coursSlug:   string;        // cours parent
  component:   string;
}

// ─── Catalogue des cours (1 par niveau minimum) ───────────────────────────────

export const COURS: CoursMeta[] = [
  // 6ème
  {
    slug:        "fractions-introduction",
    title:       "Introduction aux fractions",
    description: "Comprendre ce qu'est une fraction, comparer, simplifier et effectuer des opérations simples.",
    niveau:      "6ème",
    categorie:   "arithmetique",
    difficulte:  1,
    duree:       "20 min",
    exercices:   ["fractions-simplifier", "fractions-comparer"],
  },
  // 5ème
  {
    slug:        "nombres-relatifs",
    title:       "Nombres relatifs",
    description: "Addition et soustraction de nombres relatifs, droite graduée, opposés.",
    niveau:      "5ème",
    categorie:   "arithmetique",
    difficulte:  1,
    duree:       "15 min",
    exercices:   ["relatifs-addition", "relatifs-soustraction"],
  },
  // 4ème
  {
    slug:        "equations-1er-degre",
    title:       "Équations du 1er degré",
    description: "Résolution d'équations du type ax + b = c, mise en équation de problèmes.",
    niveau:      "4ème",
    categorie:   "algebre",
    difficulte:  2,
    duree:       "20 min",
    exercices:   ["equations-simple", "equations-mise-en-equation"],
  },
  // 3ème
  {
    slug:        "theoreme-pythagore",
    title:       "Théorème de Pythagore",
    description: "Démonstration, calcul d'une longueur inconnue, réciproque et contraposée.",
    niveau:      "3ème",
    categorie:   "geometrie",
    difficulte:  2,
    duree:       "25 min",
    exercices:   ["pythagore-calcul", "pythagore-reciproque"],
  },
  // 2nde
  {
    slug:        "fonctions-affines",
    title:       "Fonctions affines",
    description: "Représentation graphique, coefficient directeur, ordonnée à l'origine, variations.",
    niveau:      "2nde",
    categorie:   "fonctions",
    difficulte:  2,
    duree:       "25 min",
    exercices:   ["fonctions-affines-graphique", "fonctions-affines-equation"],
  },
  // 1ère
  {
    slug:        "derivation",
    title:       "Dérivation — calcul de la dérivée",
    description: "Définition de la dérivée, règles de calcul (somme, produit, composée), tableau de variations.",
    niveau:      "1ère",
    categorie:   "analyse",
    difficulte:  3,
    duree:       "30 min",
    exercices:   ["derivation-polynomes", "derivation-variations"],
  },
  // Terminale
  {
    slug:        "limites-suites",
    title:       "Limites de suites",
    description: "Convergence, divergence, théorèmes des gendarmes, suites monotones bornées.",
    niveau:      "Terminale",
    categorie:   "analyse",
    difficulte:  3,
    duree:       "35 min",
    exercices:   ["limites-calcul", "limites-theoremes"],
  },
];

// ─── Catalogue des exercices ──────────────────────────────────────────────────

export const EXERCICES: ExerciceMeta[] = [
  // 6ème
  {
    slug:        "fractions-simplifier",
    title:       "Simplifier une fraction",
    description: "Trouve la fraction irréductible en divisant par le PGCD.",
    niveau:      "6ème",
    categorie:   "arithmetique",
    difficulte:  1,
    duree:       "5 min",
    icon:        "½",
    coursSlug:   "fractions-introduction",
    component:   "ExoFractionsSimplifier",
  },
  {
    slug:        "fractions-comparer",
    title:       "Comparer deux fractions",
    description: "Place les fractions sur la droite graduée et compare-les.",
    niveau:      "6ème",
    categorie:   "arithmetique",
    difficulte:  1,
    duree:       "5 min",
    icon:        "⅔",
    coursSlug:   "fractions-introduction",
    component:   "ExoFractionsComparer",
  },
  // 5ème
  {
    slug:        "relatifs-addition",
    title:       "Additionner des relatifs",
    description: "Calcule la somme de nombres positifs et négatifs.",
    niveau:      "5ème",
    categorie:   "arithmetique",
    difficulte:  1,
    duree:       "5 min",
    icon:        "±",
    coursSlug:   "nombres-relatifs",
    component:   "ExoRelatifsAddition",
  },
  {
    slug:        "relatifs-soustraction",
    title:       "Soustraire des relatifs",
    description: "Transforme la soustraction en addition de l'opposé.",
    niveau:      "5ème",
    categorie:   "arithmetique",
    difficulte:  2,
    duree:       "6 min",
    icon:        "−",
    coursSlug:   "nombres-relatifs",
    component:   "ExoRelatifsSoustraction",
  },
  // 4ème
  {
    slug:        "equations-simple",
    title:       "Résoudre 3x + 7 = 22",
    description: "Résolution pas à pas d'une équation du 1er degré.",
    niveau:      "4ème",
    categorie:   "algebre",
    difficulte:  1,
    duree:       "5 min",
    icon:        "𝑥",
    coursSlug:   "equations-1er-degre",
    component:   "ExoEquation1D",
  },
  {
    slug:        "equations-mise-en-equation",
    title:       "Mise en équation",
    description: "Traduis un problème en équation puis résous-la.",
    niveau:      "4ème",
    categorie:   "algebre",
    difficulte:  2,
    duree:       "8 min",
    icon:        "📝",
    coursSlug:   "equations-1er-degre",
    component:   "ExoMiseEnEquation",
  },
  // 3ème
  {
    slug:        "pythagore-calcul",
    title:       "Calculer l'hypoténuse",
    description: "Applique le théorème de Pythagore pour trouver une longueur.",
    niveau:      "3ème",
    categorie:   "geometrie",
    difficulte:  2,
    duree:       "6 min",
    icon:        "△",
    coursSlug:   "theoreme-pythagore",
    component:   "ExoPythagoreCalcul",
  },
  {
    slug:        "pythagore-reciproque",
    title:       "Réciproque de Pythagore",
    description: "Démontre qu'un triangle est (ou n'est pas) rectangle.",
    niveau:      "3ème",
    categorie:   "geometrie",
    difficulte:  2,
    duree:       "7 min",
    icon:        "△",
    coursSlug:   "theoreme-pythagore",
    component:   "ExoPythagoreReciproque",
  },
  // 2nde
  {
    slug:        "fonctions-affines-graphique",
    title:       "Lire une fonction affine",
    description: "Détermine f(x) = ax + b à partir d'une représentation graphique.",
    niveau:      "2nde",
    categorie:   "fonctions",
    difficulte:  1,
    duree:       "6 min",
    icon:        "ƒ",
    coursSlug:   "fonctions-affines",
    component:   "ExoFonctionsAffinesGraphique",
  },
  {
    slug:        "fonctions-affines-equation",
    title:       "Tracer f(x) = 2x − 3",
    description: "Construis le tableau de valeurs et trace la droite.",
    niveau:      "2nde",
    categorie:   "fonctions",
    difficulte:  2,
    duree:       "8 min",
    icon:        "📈",
    coursSlug:   "fonctions-affines",
    component:   "ExoFonctionsAffinesTrace",
  },
  // 1ère
  {
    slug:        "derivation-polynomes",
    title:       "Dériver un polynôme",
    description: "Calcule la dérivée de fonctions polynomiales en appliquant les règles.",
    niveau:      "1ère",
    categorie:   "analyse",
    difficulte:  2,
    duree:       "8 min",
    icon:        "f'",
    coursSlug:   "derivation",
    component:   "ExoDerivationPolynomes",
  },
  {
    slug:        "derivation-variations",
    title:       "Tableau de variations",
    description: "Signe de la dérivée et sens de variation d'une fonction.",
    niveau:      "1ère",
    categorie:   "analyse",
    difficulte:  3,
    duree:       "10 min",
    icon:        "↗",
    coursSlug:   "derivation",
    component:   "ExoDerivationVariations",
  },
  // Terminale
  {
    slug:        "limites-calcul",
    title:       "Calculer une limite",
    description: "Formes indéterminées, règles opératoires sur les limites.",
    niveau:      "Terminale",
    categorie:   "analyse",
    difficulte:  3,
    duree:       "10 min",
    icon:        "lim",
    coursSlug:   "limites-suites",
    component:   "ExoLimitesCalcul",
  },
  {
    slug:        "limites-theoremes",
    title:       "Théorème des gendarmes",
    description: "Encadre une suite pour déterminer sa limite.",
    niveau:      "Terminale",
    categorie:   "analyse",
    difficulte:  3,
    duree:       "12 min",
    icon:        "∞",
    coursSlug:   "limites-suites",
    component:   "ExoLimitesGendarmes",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const COURS_BY_SLUG = Object.fromEntries(COURS.map((c) => [c.slug, c]));
export const EXERCICES_BY_SLUG = Object.fromEntries(EXERCICES.map((e) => [e.slug, e]));
export const EXERCICES_BY_COURS = EXERCICES.reduce<Record<string, ExerciceMeta[]>>(
  (acc, e) => {
    (acc[e.coursSlug] ??= []).push(e);
    return acc;
  },
  {}
);

export const NIVEAUX: Niveau[] = [
  "6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale",
];

export const CATEGORIE_META: Record<Categorie, { label: string; color: string }> = {
  arithmetique:  { label: "Arithmétique",  color: "#e8622a" },
  algebre:       { label: "Algèbre",       color: "#4f6ef7" },
  geometrie:     { label: "Géométrie",     color: "#2aab6c" },
  fonctions:     { label: "Fonctions",     color: "#9b59b6" },
  statistiques:  { label: "Statistiques",  color: "#e67e22" },
  trigonometrie: { label: "Trigonométrie", color: "#1abc9c" },
  analyse:       { label: "Analyse",       color: "#c0392b" },
};
