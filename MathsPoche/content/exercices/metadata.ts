export type ExerciceCategory = "geometrie" | "algebre" | "arithmetique" | "fonctions";
export type ExerciceType     = "interactif" | "etape-par-etape" | "guidé" | "graphique";
export type ExerciceDifficulty = 1 | 2 | 3;

export interface ExerciceMeta {
  slug:        string;
  title:       string;
  description: string;
  category:    ExerciceCategory;
  type:        ExerciceType;
  difficulty:  ExerciceDifficulty;
  level:       string;          // "3ème", "2nde", etc.
  duration:    string;          // "5–8 min"
  icon:        string;          // math symbol
  tags:        string[];
  component:   string;          // which React component to render
}

export const EXERCICES: ExerciceMeta[] = [
  {
    slug:        "angles-alternes-internes",
    title:       "Angles alternes-internes",
    description: "Démontre la parallélisme de deux droites en plaçant un angle alterno-interne égal à l'angle donné.",
    category:    "geometrie",
    type:        "interactif",
    difficulty:  2,
    level:       "3ème",
    duration:    "5–8 min",
    icon:        "∠",
    tags:        ["angles", "parallèles", "géométrie", "JSXGraph"],
    component:   "ExoAnglesAlternes",
  },
  {
    slug:        "tracer-bissectrice",
    title:       "Tracer une bissectrice",
    description: "Place le point B pour que AB bisecte exactement l'angle donné.",
    category:    "geometrie",
    type:        "interactif",
    difficulty:  2,
    level:       "4ème",
    duration:    "5–8 min",
    icon:        "∠",
    tags:        ["bissectrice", "angles", "géométrie"],
    component:   "ExoBissectrice",
  },
  {
    slug:        "equations-1er-degre",
    title:       "Résoudre 3x + 7 = 22",
    description: "Résous cette équation du 1er degré étape par étape, en justifiant chaque opération.",
    category:    "algebre",
    type:        "etape-par-etape",
    difficulty:  1,
    level:       "4ème",
    duration:    "3–5 min",
    icon:        "𝑥",
    tags:        ["équation", "algèbre", "1er degré"],
    component:   "ExoEquation1D",
  },
  {
    slug:        "pgcd-euclide",
    title:       "PGCD par l'algorithme d'Euclide",
    description: "Applique l'algorithme d'Euclide pour trouver le PGCD de deux entiers.",
    category:    "arithmetique",
    type:        "guidé",
    difficulty:  2,
    level:       "3ème",
    duration:    "6–10 min",
    icon:        "∑",
    tags:        ["PGCD", "Euclide", "arithmétique"],
    component:   "ExoPGCD",
  },
  {
    slug:        "pente-droite",
    title:       "Identifier la pente d'une droite",
    description: "Lis le coefficient directeur d'une droite représentée graphiquement.",
    category:    "fonctions",
    type:        "graphique",
    difficulty:  1,
    level:       "3ème",
    duration:    "4–6 min",
    icon:        "ƒ",
    tags:        ["pente", "coefficient directeur", "fonctions"],
    component:   "ExoPente",
  },
];

export const EXERCICES_BY_SLUG: Record<string, ExerciceMeta> =
  Object.fromEntries(EXERCICES.map((e) => [e.slug, e]));
