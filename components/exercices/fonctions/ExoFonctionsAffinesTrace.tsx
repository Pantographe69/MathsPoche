"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoFonctionsAffinesTrace() {
  return (
    <ExoSteps
      enonce={<>f(x) = <span style={{color:"var(--accent)"}}>2x − 3</span> — Remplis le tableau de valeurs</>}
      steps={[
        {
          id: 1,
          prompt: "f(0) = 2×0 − 3 = ?",
          instruction: "Calcule f(0).",
          expected: "-3",
          hint: "2×0 = 0, donc 0 − 3 = ?",
        },
        {
          id: 2,
          prompt: "f(1) = 2×1 − 3 = ?",
          instruction: "Calcule f(1).",
          expected: "-1",
          hint: "2×1 = 2, donc 2 − 3 = ?",
        },
        {
          id: 3,
          prompt: "f(2) = 2×2 − 3 = ?",
          instruction: "Calcule f(2).",
          expected: "1",
          hint: "2×2 = 4, donc 4 − 3 = ?",
        },
        {
          id: 4,
          prompt: "f(3) = 2×3 − 3 = ?",
          instruction: "Calcule f(3).",
          expected: "3",
          hint: "2×3 = 6, donc 6 − 3 = ?",
        },
      ]}
      success="Tableau complet : f(0)=−3, f(1)=−1, f(2)=1, f(3)=3. La droite est bien croissante (a=2 > 0)."
    />
  );
}
