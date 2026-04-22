"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoRelatifsAddition() {
  return (
    <ExoSteps
      enonce={<>Calcule <span style={{color:"var(--accent)"}}>(+7) + (−4) + (−3) + (+5)</span></>}
      steps={[
        {
          id: 1,
          prompt: "Somme des positifs : (+7) + (+5) = ?",
          instruction: "Additionne d'abord tous les nombres positifs.",
          expected: "12",
          hint: "7 + 5 = ?",
        },
        {
          id: 2,
          prompt: "Somme des négatifs : (−4) + (−3) = ?",
          instruction: "Additionne les valeurs absolues des négatifs, puis mets le signe −.",
          expected: "-7",
          hint: "4 + 3 = 7, donc le résultat est −7.",
        },
        {
          id: 3,
          prompt: "Résultat final : (+12) + (−7) = ?",
          instruction: "Signes opposés : soustrait les valeurs absolues, garde le signe du plus grand.",
          expected: "5",
          hint: "12 − 7 = 5. 12 > 7 donc le résultat est positif.",
        },
      ]}
      success="Parfait ! (+7) + (−4) + (−3) + (+5) = 5."
    />
  );
}
