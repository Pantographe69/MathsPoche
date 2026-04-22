"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoDerivationVariations() {
  return (
    <ExoSteps
      enonce={<>f(x) = <span style={{color:"var(--accent)"}}>x² − 4x + 3</span> — étudier les variations</>}
      steps={[
        {
          id: 1,
          prompt: "f'(x) = ?  (dériver f)",
          instruction: "Calcule la dérivée de f(x) = x² − 4x + 3.",
          expected: "2x-4",
          hint: "(x²)' = 2x et (−4x)' = −4, donc f'(x) = 2x − 4",
        },
        {
          id: 2,
          prompt: "f'(x) = 0  →  2x − 4 = 0  →  x = ?",
          instruction: "Résous f'(x) = 0 pour trouver le point critique.",
          expected: "2",
          hint: "2x = 4, donc x = ?",
        },
        {
          id: 3,
          prompt: "Pour x < 2, signe de f'(x) = 2x−4 (ex: f'(0) = −4). Signe = ?",
          instruction: "f'(0) = 2×0 − 4. Quel est le signe ?",
          expected: "-",
          hint: "2×0 − 4 = −4 < 0, donc le signe est −.",
        },
        {
          id: 4,
          prompt: "f(2) = 4 − 8 + 3 = ?  (valeur du minimum)",
          instruction: "Calcule f(2).",
          expected: "-1",
          hint: "4 − 8 + 3 = ?",
        },
      ]}
      success="Parfait ! f décroît sur ]−∞, 2[, admet un minimum de −1 en x = 2, puis croît sur ]2, +∞[."
    />
  );
}
