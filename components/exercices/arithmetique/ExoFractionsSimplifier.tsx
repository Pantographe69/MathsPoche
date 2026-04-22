"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoFractionsSimplifier() {
  return (
    <ExoSteps
      enonce={<>Simplifier <span style={{color:"var(--accent)"}}>12/18</span> sous forme irréductible</>}
      steps={[
        {
          id: 1,
          prompt: "PGCD(12, 18) = ?",
          instruction: "Trouve le plus grand commun diviseur de 12 et 18.",
          expected: "6",
          hint: "Les diviseurs de 12 : 1, 2, 3, 4, 6, 12. Ceux de 18 : 1, 2, 3, 6, 9, 18.",
        },
        {
          id: 2,
          prompt: "12 ÷ 6 = ?  (nouveau numérateur)",
          instruction: "Divise le numérateur 12 par le PGCD.",
          expected: "2",
          hint: "12 ÷ 6 = ?",
        },
        {
          id: 3,
          prompt: "18 ÷ 6 = ?  (nouveau dénominateur)",
          instruction: "Divise le dénominateur 18 par le PGCD.",
          expected: "3",
          hint: "18 ÷ 6 = ?",
        },
      ]}
      success="Bravo ! 12/18 = 2/3 est bien la fraction irréductible."
    />
  );
}
