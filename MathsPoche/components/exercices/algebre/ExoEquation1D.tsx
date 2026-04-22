"use client";

import { useState } from "react";
import { StepInput } from "./StepInput";
import { ScoreBadge } from "@/components/exercices/FeedbackBadge";
import { MathRenderer } from "@/components/cours/MathRenderer";

const STEPS = [
  {
    id:          1,
    prompt:      "3x + 7 = 22",
    instruction: "Soustrai 7 des deux membres de l'équation.",
    expected:    "15",
    hint:        "22 - 7 = ?",
  },
  {
    id:          2,
    prompt:      "3x = 15  →  x = ?",
    instruction: "Divise les deux membres par 3.",
    expected:    "5",
    hint:        "15 ÷ 3 = ?",
  },
  {
    id:          3,
    prompt:      "Vérification : 3 × 5 + 7 = ?",
    instruction: "Calcule 3 × 5 + 7 pour vérifier ta solution.",
    expected:    "22",
    hint:        "3 × 5 = 15, puis 15 + 7 = ?",
  },
];

export function ExoEquation1D() {
  const [score,    setScore]    = useState<number | null>(null);

  return (
    <div className="max-w-[560px] flex flex-col gap-6">

      {/* Equation display */}
      <div
        className="flex items-center justify-center px-6 py-5 rounded-[12px] border"
        style={{ background: "var(--elevated)", borderColor: "var(--border)" }}
      >
        <span
          className="font-mono text-[22px] font-[500] tracking-tight"
          style={{ color: "var(--txt)" }}
        >
          3x + 7 = 22
        </span>
      </div>

      {/* Objective */}
      <p className="font-body italic text-[13.5px] leading-relaxed" style={{ color: "var(--txt2)" }}>
        Résous cette équation <strong style={{ color: "var(--txt)", fontStyle: "normal" }}>étape par étape</strong>.
        Saisis la valeur numérique à chaque étape et valide avec <kbd
          className="font-mono text-[11px] px-1.5 py-0.5 rounded border"
          style={{ borderColor: "var(--border)", background: "var(--elevated)", color: "var(--txt3)" }}
        >Entrée</kbd>.
      </p>

      {/* Step-by-step inputs */}
      {score === null ? (
        <StepInput steps={STEPS} onComplete={setScore} />
      ) : (
        <ScoreBadge
          score={score}
          message={`Équation résolue : x = 5. Vérifie : 3×5+7 = 22 ✓`}
          onRetry={() => setScore(null)}
        />
      )}
    </div>
  );
}
