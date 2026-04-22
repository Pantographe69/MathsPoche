"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoDerivationPolynomes() {
  return (
    <ExoSteps
      enonce={<>Calculer f'(x) pour f(x) = <span style={{color:"var(--accent)"}}>3x³ − 5x² + 2x − 7</span></>}
      steps={[
        {
          id: 1,
          prompt: "(3x³)' = ?  (utilise (xⁿ)' = nxⁿ⁻¹)",
          instruction: "Dérive le terme 3x³.",
          expected: "9x2",
          hint: "(xⁿ)' = nxⁿ⁻¹, donc (3x³)' = 3×3×x² = 9x²",
        },
        {
          id: 2,
          prompt: "(−5x²)' = ?",
          instruction: "Dérive le terme −5x².",
          expected: "-10x",
          hint: "(−5x²)' = −5×2×x = −10x",
        },
        {
          id: 3,
          prompt: "(2x)' = ?",
          instruction: "Dérive le terme 2x.",
          expected: "2",
          hint: "(ax)' = a. Donc (2x)' = ?",
        },
        {
          id: 4,
          prompt: "(−7)' = ?  (constante)",
          instruction: "Dérive la constante −7.",
          expected: "0",
          hint: "La dérivée d'une constante est toujours 0.",
        },
      ]}
      success="Exact ! f'(x) = 9x² − 10x + 2. Chaque terme est dérivé indépendamment."
    />
  );
}
