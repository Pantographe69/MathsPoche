"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoFractionsComparer() {
  return (
    <ExoSteps
      enonce={<>Comparer <span style={{color:"var(--accent)"}}>2/3</span> et <span style={{color:"var(--accent)"}}>3/4</span> — quel est le plus grand ?</>}
      steps={[
        {
          id: 1,
          prompt: "Dénominateur commun de 3 et 4 = ?",
          instruction: "Trouve le plus petit commun multiple de 3 et 4.",
          expected: "12",
          hint: "3 × 4 = 12. PPCM(3,4) = 12.",
        },
        {
          id: 2,
          prompt: "2/3 = ?/12  (numérateur)",
          instruction: "Convertis 2/3 avec le dénominateur 12.",
          expected: "8",
          hint: "2/3 = 2×4 / 3×4 = ?/12",
        },
        {
          id: 3,
          prompt: "3/4 = ?/12  (numérateur)",
          instruction: "Convertis 3/4 avec le dénominateur 12.",
          expected: "9",
          hint: "3/4 = 3×3 / 4×3 = ?/12",
        },
      ]}
      success="Exact ! 8/12 < 9/12 donc 2/3 < 3/4. La plus grande fraction est 3/4."
    />
  );
}
