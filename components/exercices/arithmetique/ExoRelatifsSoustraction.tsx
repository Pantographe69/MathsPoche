"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoRelatifsSoustraction() {
  return (
    <ExoSteps
      enonce={<>Calcule <span style={{color:"var(--accent)"}}>−5 − (−8) + (−3)</span></>}
      steps={[
        {
          id: 1,
          prompt: "−(−8) = ?  (transformer la soustraction)",
          instruction: "Soustraire un nombre = additionner son opposé. Quel est l'opposé de −8 ?",
          expected: "+8",
          hint: "L'opposé de −8 est +8.",
        },
        {
          id: 2,
          prompt: "L'expression devient : −5 + 8 + (−3). Somme des positifs = ?",
          instruction: "Additionne les nombres positifs.",
          expected: "8",
          hint: "Il n'y a qu'un positif : +8.",
        },
        {
          id: 3,
          prompt: "Somme des négatifs : (−5) + (−3) = ?",
          instruction: "Additionne les valeurs absolues, mets le signe −.",
          expected: "-8",
          hint: "5 + 3 = 8, donc −8.",
        },
        {
          id: 4,
          prompt: "Résultat : (+8) + (−8) = ?",
          instruction: "Signes opposés, valeurs absolues égales.",
          expected: "0",
          hint: "8 − 8 = 0.",
        },
      ]}
      success="Excellent ! −5 − (−8) + (−3) = 0."
    />
  );
}
