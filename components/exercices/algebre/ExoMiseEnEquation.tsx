"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoMiseEnEquation() {
  return (
    <ExoSteps
      enonce={
        <span className="text-[15px] leading-relaxed">
          Un rectangle a un périmètre de <span style={{color:"var(--accent)"}}>36 cm</span>.{" "}
          Sa longueur est le triple de sa largeur. Quelle est sa largeur ?
        </span>
      }
      steps={[
        {
          id: 1,
          prompt: "Si largeur = x, longueur = 3x. Périmètre = 2×(x + 3x) = ?",
          instruction: "Développe l'expression du périmètre en fonction de x.",
          expected: "8x",
          hint: "2×(x + 3x) = 2×4x = 8x",
        },
        {
          id: 2,
          prompt: "8x = 36  →  x = ?",
          instruction: "Résous l'équation pour trouver la largeur.",
          expected: "4.5",
          hint: "36 ÷ 8 = 4,5",
        },
        {
          id: 3,
          prompt: "Vérification : longueur = 3 × 4,5 = ?",
          instruction: "Calcule la longueur.",
          expected: "13.5",
          hint: "3 × 4,5 = ?",
        },
        {
          id: 4,
          prompt: "Périmètre = 2 × (4,5 + 13,5) = ?",
          instruction: "Vérifie que le périmètre vaut bien 36 cm.",
          expected: "36",
          hint: "2 × 18 = ?",
        },
      ]}
      success="Parfait ! La largeur est 4,5 cm et la longueur 13,5 cm. Périmètre = 36 cm ✓"
    />
  );
}
