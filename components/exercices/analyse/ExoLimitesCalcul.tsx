"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoLimitesCalcul() {
  return (
    <ExoSteps
      enonce={
        <span className="text-[15px] leading-relaxed">
          Calculer <span style={{color:"var(--accent)"}}>lim (2n² + 3n) / (5n² − 1)</span> quand n→+∞
        </span>
      }
      steps={[
        {
          id: 1,
          prompt: "Facteur dominant au numérateur = ?",
          instruction: "Quel est le terme de plus haut degré au numérateur ?",
          expected: "n2",
          hint: "2n² + 3n. Le terme de plus haut degré est n².",
        },
        {
          id: 2,
          prompt: "Après factorisation par n² : numérateur = n²×(2 + ?/n)",
          instruction: "Complète : 2n²/n² = 2 et 3n/n² = ?",
          expected: "3/n",
          hint: "3n ÷ n² = 3/n",
        },
        {
          id: 3,
          prompt: "Après factorisation par n² : dénominateur = n²×(5 − ?)",
          instruction: "−1/n² → quand n→∞, cette expression tend vers ?",
          expected: "1/n2",
          hint: "−1 ÷ n² = −1/n²",
        },
        {
          id: 4,
          prompt: "Quand n→∞ : (2 + 3/n)/(5 − 1/n²) → ?",
          instruction: "3/n→0 et 1/n²→0. Quelle est la limite ?",
          expected: "2/5",
          hint: "(2+0)/(5−0) = 2/5",
        },
      ]}
      success="Exact ! lim (2n²+3n)/(5n²−1) = 2/5. On factorise toujours par le terme dominant."
    />
  );
}
