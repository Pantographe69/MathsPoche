"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoPythagoreCalcul() {
  return (
    <ExoSteps
      enonce={
        <span className="text-[15px] leading-relaxed">
          Triangle rectangle en C. AC = <span style={{color:"var(--accent)"}}>5 cm</span>,
          BC = <span style={{color:"var(--accent)"}}>12 cm</span>. Calculer AB.
        </span>
      }
      steps={[
        {
          id: 1,
          prompt: "AC² = 5² = ?",
          instruction: "Calcule le carré de AC.",
          expected: "25",
          hint: "5 × 5 = ?",
        },
        {
          id: 2,
          prompt: "BC² = 12² = ?",
          instruction: "Calcule le carré de BC.",
          expected: "144",
          hint: "12 × 12 = ?",
        },
        {
          id: 3,
          prompt: "AB² = AC² + BC² = 25 + 144 = ?",
          instruction: "Applique le théorème de Pythagore.",
          expected: "169",
          hint: "25 + 144 = ?",
        },
        {
          id: 4,
          prompt: "AB = √169 = ?",
          instruction: "Extrait la racine carrée.",
          expected: "13",
          hint: "13 × 13 = 169",
        },
      ]}
      success="Excellent ! AB = 13 cm. (Triangle 5-12-13 : triplet pythagoricien classique !)"
    />
  );
}
