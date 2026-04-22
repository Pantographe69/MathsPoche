"use client";
import { ExoSteps } from "@/components/exercices/ExoSteps";

export function ExoPythagoreReciproque() {
  return (
    <ExoSteps
      enonce={
        <span className="text-[15px] leading-relaxed">
          Un triangle a pour côtés <span style={{color:"var(--accent)"}}>8 cm</span>,{" "}
          <span style={{color:"var(--accent)"}}>15 cm</span> et{" "}
          <span style={{color:"var(--accent)"}}>17 cm</span>. Est-il rectangle ?
        </span>
      }
      steps={[
        {
          id: 1,
          prompt: "Carré du plus grand côté : 17² = ?",
          instruction: "Calcule le carré du côté le plus long (hypoténuse supposée).",
          expected: "289",
          hint: "17 × 17 = ?",
        },
        {
          id: 2,
          prompt: "8² + 15² = 64 + ? = ",
          instruction: "Calcule 15².",
          expected: "225",
          hint: "15 × 15 = ?",
        },
        {
          id: 3,
          prompt: "8² + 15² = 64 + 225 = ?",
          instruction: "Additionne les deux carrés.",
          expected: "289",
          hint: "64 + 225 = ?",
        },
      ]}
      success="Bravo ! 8² + 15² = 289 = 17². Par la réciproque de Pythagore, ce triangle EST rectangle (angle droit en face du côté de 17 cm)."
    />
  );
}
