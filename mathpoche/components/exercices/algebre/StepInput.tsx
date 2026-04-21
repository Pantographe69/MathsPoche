"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FeedbackBanner } from "@/components/exercices/FeedbackBadge";
import type { FeedbackType } from "@/components/exercices/FeedbackBadge";

/* ─── Types ──────────────────────────────────────────────────────────────────── */
interface Step {
  id:          number;
  instruction: string;           // displayed to user
  prompt:      string;           // e.g. "3x = ?"
  expected:    string | number;  // correct answer
  hint?:       string;
}

interface StepInputProps {
  steps:     Step[];
  onComplete?: (score: number) => void;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */
export function StepInput({ steps, onComplete }: StepInputProps) {
  const [currentIdx,  setCurrentIdx]  = useState(0);
  const [inputValues, setInputValues] = useState<Record<number, string>>({});
  const [states,      setStates]      = useState<Record<number, "idle" | "correct" | "wrong">>({});
  const [feedback,    setFeedback]    = useState<{ type: FeedbackType; message: string }>({
    type: "", message: steps[0]?.instruction ?? "",
  });
  const [attempts,    setAttempts]    = useState<Record<number, number>>({});
  const [done,        setDone]        = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !done) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentIdx, done]);

  const currentStep = steps[currentIdx];
  const totalSteps  = steps.length;

  const handleSubmit = () => {
    if (!currentStep || done) return;
    const raw      = inputValues[currentStep.id]?.trim() ?? "";
    const expected = String(currentStep.expected).trim();
    const correct  = raw.toLowerCase().replace(/\s/g, "") === expected.toLowerCase().replace(/\s/g, "");
    const att      = (attempts[currentStep.id] ?? 0) + 1;

    setAttempts((p) => ({ ...p, [currentStep.id]: att }));

    if (correct) {
      setStates((p) => ({ ...p, [currentStep.id]: "correct" }));

      if (currentIdx + 1 >= totalSteps) {
        setDone(true);
        const score = Math.round(
          (Object.values({ ...attempts, [currentStep.id]: att })
            .reduce((sum, a) => sum + Math.max(0, 3 - a + 1), 0) /
            totalSteps) *
            100 /
            3
        );
        setFeedback({
          type:    "success",
          message: `<strong>Bravo !</strong> Exercice terminé. Toutes les étapes sont correctes.`,
        });
        onComplete?.(score);
      } else {
        setFeedback({
          type:    "success",
          message: `<strong>Correct !</strong> Passons à l'étape suivante.`,
        });
        setTimeout(() => {
          setCurrentIdx((i) => i + 1);
          setFeedback({ type: "", message: steps[currentIdx + 1].instruction });
        }, 700);
      }
    } else {
      setStates((p) => ({ ...p, [currentStep.id]: "wrong" }));
      if (att >= 2 && currentStep.hint) {
        setFeedback({ type: "hint", message: `<strong>Indice —</strong> ${currentStep.hint}` });
      } else {
        setFeedback({ type: "error", message: `<strong>Pas tout à fait.</strong> Vérifie ton calcul pour : <em>${currentStep.prompt}</em>` });
      }
      // Shake input
      setTimeout(() => setStates((p) => ({ ...p, [currentStep.id]: "idle" })), 600);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Feedback */}
      <FeedbackBanner type={feedback.type} message={feedback.message} html />

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "var(--border-s)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width:      `${(currentIdx / totalSteps) * 100}%`,
              background: "var(--accent)",
            }}
          />
        </div>
        <span className="font-mono text-[10px] flex-shrink-0" style={{ color: "var(--txt3)" }}>
          {currentIdx}/{totalSteps}
        </span>
      </div>

      {/* Steps list */}
      <div className="flex flex-col gap-2">
        {steps.map((step, idx) => {
          const state   = states[step.id] ?? "idle";
          const isPast  = idx < currentIdx || (idx === currentIdx && state === "correct" && done);
          const isActive = idx === currentIdx && !done;
          const isLocked = idx > currentIdx;

          return (
            <div
              key={step.id}
              className={cn(
                "px-4 py-3.5 rounded-[10px] border transition-all duration-[250ms]",
                isPast  && "border-transparent bg-[var(--green-muted)] opacity-70",
                isActive && state === "wrong" && "border-[var(--red)] bg-[var(--red-muted)] animate-[error-shake_0.35s_ease]",
                isActive && state !== "wrong" && "border-[var(--accent)] bg-[var(--accent-muted)]",
                isLocked && "border-[var(--border)] opacity-35"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                {/* Step header */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-[10px]"
                    style={{
                      background: isPast ? "var(--green)" : isActive ? "var(--accent)" : "var(--border-s)",
                      color: isPast || isActive ? "#fff" : "var(--txt3)",
                    }}
                  >
                    {isPast ? (
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : step.id}
                  </span>
                  <div>
                    <p className="font-mono text-[11px]" style={{ color: isPast ? "var(--green)" : isActive ? "var(--accent)" : "var(--txt3)" }}>
                      {step.prompt}
                    </p>
                    {isActive && (
                      <p className="font-body italic text-[12px] mt-0.5" style={{ color: "var(--txt2)" }}>
                        {step.instruction}
                      </p>
                    )}
                  </div>
                </div>

                {/* Input or answer display */}
                {isPast && (
                  <span className="font-mono text-[12px] font-[500]" style={{ color: "var(--green)" }}>
                    = {step.expected}
                  </span>
                )}
                {isActive && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <input
                      ref={idx === currentIdx ? inputRef : undefined}
                      type="text"
                      inputMode="numeric"
                      value={inputValues[step.id] ?? ""}
                      onChange={(e) => setInputValues((p) => ({ ...p, [step.id]: e.target.value }))}
                      onKeyDown={handleKey}
                      placeholder="?"
                      className={cn(
                        "w-20 px-2.5 py-1.5 rounded-[6px] border font-mono text-[13px] text-center outline-none",
                        "transition-all duration-[180ms]",
                        "focus:border-[var(--accent)]"
                      )}
                      style={{
                        background:  "var(--surface)",
                        borderColor: state === "wrong" ? "var(--red)" : "var(--border-s)",
                        color:       "var(--txt)",
                      }}
                      disabled={done || isLocked}
                      aria-label={`Réponse étape ${step.id}`}
                    />
                    <button
                      onClick={handleSubmit}
                      className={cn(
                        "px-3 py-1.5 rounded-[6px] font-mono text-[11px] cursor-pointer",
                        "bg-[var(--accent)] text-white border border-[var(--accent)]",
                        "hover:bg-[var(--accent-hover)] transition-all duration-[180ms]"
                      )}
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
