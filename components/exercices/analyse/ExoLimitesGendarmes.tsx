"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoLimitesGendarmes() {
  return (
    <ExoSteps
      enonce={
        <span className="text-[15px] leading-relaxed">
          Montrer que <span style={{color:"var(--accent)"}}>lim sin(n)/n = 0</span> par le théorème des gendarmes
        </span>
      }
      steps={[
        {
          id: 1,
          prompt: "Encadrement de sin(n) : −? ≤ sin(n) ≤ ?",
          instruction: "Quel est l'encadrement classique de la fonction sinus ?",
          expected: "1",
          hint: "La fonction sinus est toujours comprise entre −1 et 1.",
        },
        {
          id: 2,
          prompt: "En divisant par n > 0 : −1/n ≤ sin(n)/n ≤ ?",
          instruction: "Divise l'encadrement par n (n > 0, sens des inégalités conservé).",
          expected: "1/n",
          hint: "Si −1 ≤ sin(n) ≤ 1, en divisant par n on obtient −1/n ≤ sin(n)/n ≤ 1/n.",
        },
        {
          id: 3,
          prompt: "lim (−1/n) quand n→+∞ = ?",
          instruction: "Calcule la limite du gendarme inférieur.",
          expected: "0",
          hint: "−1/n → 0 quand n→+∞.",
        },
        {
          id: 4,
          prompt: "lim (1/n) quand n→+∞ = ?",
          instruction: "Calcule la limite du gendarme supérieur.",
          expected: "0",
          hint: "1/n → 0 quand n→+∞.",
        },
      ]}
      success="Parfait ! Les deux gendarmes tendent vers 0. Par le théorème des gendarmes, lim sin(n)/n = 0."
    />
  );
}
