"use client";

import { useState } from "react";
import { StepInput } from "@/components/exercices/algebre/StepInput";
import { ScoreBadge } from "@/components/exercices/FeedbackBadge";

interface Step {
  id:          number;
  prompt:      string;
  instruction: string;
  expected:    string | number;
  hint?:       string;
}

interface ExoStepsProps {
  enonce:  React.ReactNode;
  steps:   Step[];
  success: string;
}

export function ExoSteps({ enonce, steps, success }: ExoStepsProps) {
  const [score, setScore] = useState<number | null>(null);

  return (
    <div className="max-w-[560px] flex flex-col gap-6">
      {/* Énoncé */}
      <div
        className="flex items-center justify-center px-6 py-5 rounded-[12px] border"
        style={{ background: "var(--elevated)", borderColor: "var(--border)" }}
      >
        <div className="font-mono text-[18px] font-[500] tracking-tight text-center leading-relaxed" style={{ color: "var(--txt)" }}>
          {enonce}
        </div>
      </div>

      <p className="font-body italic text-[13.5px] leading-relaxed" style={{ color: "var(--txt2)" }}>
        Résous <strong style={{ color: "var(--txt)", fontStyle: "normal" }}>étape par étape</strong>.
        Saisis la valeur numérique et valide avec{" "}
        <kbd
          className="font-mono text-[11px] px-1.5 py-0.5 rounded border"
          style={{ borderColor: "var(--border)", background: "var(--elevated)", color: "var(--txt3)" }}
        >
          Entrée
        </kbd>.
      </p>

      {score === null ? (
        <StepInput steps={steps} onComplete={setScore} />
      ) : (
        <ScoreBadge
          score={score}
          message={success}
          onRetry={() => setScore(null)}
        />
      )}
    </div>
  );
}
