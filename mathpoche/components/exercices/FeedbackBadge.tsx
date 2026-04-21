"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type FeedbackType = "" | "success" | "error" | "hint";

interface FeedbackBannerProps {
  type:    FeedbackType;
  message: string;         // HTML string or plain text
  html?:   boolean;        // if true, dangerouslySetInnerHTML
}

const STYLES: Record<FeedbackType, { border: string; bg: string; icon: React.ReactNode }> = {
  "": {
    border: "var(--accent)",
    bg:     "var(--elevated)",
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5" r="1.2" fill="currentColor"/>
        <path d="M8 8v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  success: {
    border: "var(--green)",
    bg:     "var(--green-muted)",
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
        <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  error: {
    border: "var(--red)",
    bg:     "var(--red-muted)",
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
        <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  hint: {
    border: "var(--amber)",
    bg:     "var(--amber-muted)",
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
        <path d="M8 3a3.5 3.5 0 0 1 1.5 6.7V11H6.5V9.7A3.5 3.5 0 0 1 8 3z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6.5 12.5h3v1h-3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
};

export function FeedbackBanner({ type, message, html = false }: FeedbackBannerProps) {
  const s = STYLES[type];

  return (
    <div
      className="flex items-start gap-2.5 px-4 py-3 rounded-r-[6px] transition-all duration-[350ms]"
      style={{
        background:    s.bg,
        border:        "1px solid var(--border)",
        borderLeft:    `3px solid ${s.border}`,
        borderRadius:  "0 6px 6px 0",
      }}
      role="status"
      aria-live="polite"
    >
      {/* Icon bubble */}
      <span
        className="w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          color:       s.border,
          background:  `${s.border}14`,
          border:      `1px solid ${s.border}30`,
        }}
      >
        {s.icon}
      </span>

      {/* Message */}
      {html ? (
        <p
          className="font-body text-[13px] leading-relaxed pt-0.5"
          style={{ color: "var(--txt2)" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      ) : (
        <p
          className="font-body text-[13px] leading-relaxed pt-0.5"
          style={{ color: "var(--txt2)" }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

/* ─── Step tracker ───────────────────────────────────────────────────────────── */
interface Step {
  id:    number;
  label: string;
}

interface StepTrackerProps {
  steps:       Step[];
  currentStep: number;
  doneSteps:   number[];
}

export function StepTracker({ steps, currentStep, doneSteps }: StepTrackerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] mb-1" style={{ color: "var(--txt3)" }}>
        Progression
      </p>
      {steps.map((step) => {
        const done   = doneSteps.includes(step.id);
        const active = currentStep === step.id && !done;
        const locked = !done && !active;

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] border transition-all duration-[250ms]",
              done   && "border-transparent bg-[var(--green-muted)]",
              active && "border-[var(--accent)] bg-[var(--accent-muted)]",
              locked && "border-[var(--border)] opacity-40"
            )}
          >
            {/* Status icon */}
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px]"
              style={{
                background: done ? "var(--green)" : active ? "var(--accent)" : "var(--border-s)",
                color: done || active ? "#fff" : "var(--txt3)",
              }}
            >
              {done ? (
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                step.id
              )}
            </span>
            <span
              className="font-mono text-[11px]"
              style={{ color: done ? "var(--green)" : active ? "var(--accent)" : "var(--txt3)" }}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Score badge (post-validation) ─────────────────────────────────────────── */
interface ScoreBadgeProps {
  score:   number;
  message: string;
  onRetry?: () => void;
}

export function ScoreBadge({ score, message, onRetry }: ScoreBadgeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so CSS transition fires
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 p-5 rounded-[14px] border text-center",
        "transition-all duration-[400ms]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      )}
      style={{
        background:   "var(--green-muted)",
        border:       "1px solid var(--green)",
        borderColor:  `rgba(34,197,94,0.3)`,
      }}
    >
      {/* Score ring */}
      <div className="relative w-14 h-14">
        <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
          <circle cx="28" cy="28" r="22" fill="none" stroke="var(--border-s)" strokeWidth="4"/>
          <circle
            cx="28" cy="28" r="22"
            fill="none"
            stroke="var(--green)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 22}`}
            strokeDashoffset={`${2 * Math.PI * 22 * (1 - score / 100)}`}
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s" }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center font-display font-[800] text-[14px]"
          style={{ color: "var(--green)" }}
        >
          {score}
        </span>
      </div>

      <p className="font-body italic text-[13px] leading-relaxed" style={{ color: "var(--txt2)" }}>
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className={cn(
            "font-mono text-[11px] px-3 py-2 rounded-[6px] border cursor-pointer",
            "transition-all duration-[180ms]",
            "hover:bg-[var(--hover)] hover:border-[var(--border-s)]"
          )}
          style={{ color: "var(--txt2)", borderColor: "var(--border)", background: "transparent" }}
        >
          Recommencer
        </button>
      )}
    </div>
  );
}
