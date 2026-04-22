"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoFonctionsAffinesGraphique() {
  return (
    <ExoSteps
      enonce={
        <span className="text-[15px] leading-relaxed">
          Une droite passe par A(<span style={{color:"var(--accent)"}}>0, −2</span>) et B(<span style={{color:"var(--accent)"}}>3, 4</span>).
          Détermine f(x) = ax + b.
        </span>
      }
      steps={[
        {
          id: 1,
          prompt: "b = f(0) = ?  (ordonnée à l'origine)",
          instruction: "La droite passe par A(0, −2). Que vaut f(0) ?",
          expected: "-2",
          hint: "Si le point est (0, y), alors b = y.",
        },
        {
          id: 2,
          prompt: "Δy = y_B − y_A = 4 − (−2) = ?",
          instruction: "Calcule la variation en y entre A et B.",
          expected: "6",
          hint: "4 − (−2) = 4 + 2 = ?",
        },
        {
          id: 3,
          prompt: "Δx = x_B − x_A = 3 − 0 = ?",
          instruction: "Calcule la variation en x.",
          expected: "3",
          hint: "3 − 0 = ?",
        },
        {
          id: 4,
          prompt: "a = Δy/Δx = 6/3 = ?",
          instruction: "Calcule le coefficient directeur.",
          expected: "2",
          hint: "6 ÷ 3 = ?",
        },
      ]}
      success="Parfait ! f(x) = 2x − 2. Vérification : f(0) = −2 ✓ et f(3) = 6−2 = 4 ✓"
    />
  );
}
