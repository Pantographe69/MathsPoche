"use client";

import { useCallback, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { JSXGraphCanvas } from "./JSXGraphCanvas";
import { FeedbackBanner, StepTracker, ScoreBadge } from "@/components/exercices/FeedbackBadge";
import type { FeedbackType } from "@/components/exercices/FeedbackBadge";
import { cn } from "@/lib/utils";

/* ─── Config ─────────────────────────────────────────────────────────────────── */
const TARGET_ANGLE = 50;
const TOLERANCE    = 3;

/* ─── Types ──────────────────────────────────────────────────────────────────── */
interface FeedbackState {
  type:    FeedbackType;
  message: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function computeAngle(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pB: any, pC: any, pA: any
): number {
  const [bx, by] = [pB.X(), pB.Y()];
  const [cx, cy] = [pC.X(), pC.Y()];
  const [ax, ay] = [pA.X(), pA.Y()];

  const v1 = [bx - cx, by - cy];
  const v2 = [ax - cx, ay - cy];
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const m1  = Math.hypot(v1[0], v1[1]);
  const m2  = Math.hypot(v2[0], v2[1]);
  if (m1 === 0 || m2 === 0) return 0;
  const cos = Math.max(-1, Math.min(1, dot / (m1 * m2)));
  return Math.round(Math.acos(cos) * (180 / Math.PI));
}

/* ─── Confetti ───────────────────────────────────────────────────────────────── */
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#4F6EF7", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"];
  const pieces = Array.from({ length: 80 }, () => ({
    x:     Math.random() * canvas.width,
    y:     -10 - Math.random() * 40,
    vx:    (Math.random() - 0.5) * 3,
    vy:    3 + Math.random() * 4,
    r:     3 + Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * Math.PI * 2,
    spin:  (Math.random() - 0.5) * 0.2,
    w:     6 + Math.random() * 8,
    h:     3 + Math.random() * 4,
    alpha: 1,
    shape: Math.random() > 0.5 ? "rect" : "circle",
  }));

  let frame = 0;
  function draw() {
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    let alive = 0;
    for (const p of pieces) {
      if (p.y > canvas!.height + 20 || p.alpha <= 0) continue;
      alive++;
      p.x += p.vx; p.y += p.vy; p.angle += p.spin; p.vy += 0.08;
      if (p.y > canvas!.height * 0.6) p.alpha -= 0.025;
      ctx!.save();
      ctx!.globalAlpha = Math.max(0, p.alpha);
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.angle);
      ctx!.fillStyle = p.color;
      if (p.shape === "circle") {
        ctx!.beginPath(); ctx!.arc(0, 0, p.r, 0, Math.PI * 2); ctx!.fill();
      } else {
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx!.restore();
    }
    if (alive > 0 && frame++ < 200) requestAnimationFrame(draw);
    else ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
  }
  requestAnimationFrame(draw);
}

/* ─── Component ──────────────────────────────────────────────────────────────── */
export function ExoAnglesAlternes() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // JSXGraph refs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boardRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pCRef    = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const angleLblRef = useRef<any>(null);

  // UI state
  const [currentAngle, setCurrentAngle] = useState(0);
  const [ringClass,    setRingClass]     = useState("");
  const [validated,    setValidated]     = useState(false);
  const [hintShown,    setHintShown]     = useState(false);
  const [doneSteps,    setDoneSteps]     = useState<number[]>([]);
  const [currentStep,  setCurrentStep]   = useState(1);
  const [showScore,    setShowScore]     = useState(false);
  const [score,        setScore]         = useState(0);
  const [scoreMsg,     setScoreMsg]      = useState("");
  const [feedback, setFeedback] = useState<FeedbackState>({
    type:    "",
    message: "<strong>Étape 1 —</strong> Déplace le point mobile <strong>C</strong> (orange) sur la droite d₂ pour que l'angle ∠BCA soit alterno-interne à l'angle α = 50°.",
  });

  const completeStep = (n: number) => {
    setDoneSteps((prev) => Array.from(new Set([...prev, n])));
    setCurrentStep(n + 1);
  };

  /* ── Board init ──────────────────────────────────────────────────────────── */
  const handleBoardReady = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (board: any) => {
      boardRef.current = board;

      const accent = "#4F6EF7";
      const orange = "#F59E0B";
      const green  = "#22C55E";
      const txt2   = isDark ? "#8A8FA8" : "#5A6080";
      const lw     = 1.8;

      /* ── Fixed geometry ─────────────────────────────────────────────────── */

      // Sécante (transversal) — passes through (3,3)→(7,7)
      board.create("line", [[3, 3], [7, 7]], {
        strokeColor: txt2, strokeWidth: lw,
        straightFirst: true, straightLast: true,
        fixed: true, highlight: false,
      });

      // Droite d₁ — y = 7, from x=0 to x=10
      const pD1a = board.create("point", [0, 7], { visible: false, fixed: true });
      const pD1b = board.create("point", [10, 7], { visible: false, fixed: true });
      board.create("line", [pD1a, pD1b], {
        strokeColor: accent, strokeWidth: lw,
        straightFirst: true, straightLast: true,
        fixed: true, highlight: false,
      });

      // Droite d₂ — y = 3, from x=0 to x=10
      const pD2a = board.create("point", [0, 3], { visible: false, fixed: true });
      const pD2b = board.create("point", [10, 3], { visible: false, fixed: true });
      board.create("line", [pD2a, pD2b], {
        strokeColor: accent, strokeWidth: lw,
        straightFirst: true, straightLast: true,
        fixed: true, highlight: false,
      });

      // Labels d₁ / d₂
      board.create("text", [9.3, 7.4], {
        text: "d₁", color: accent,
        fontSize: 13, fontFamily: "var(--font-syne, sans-serif)", fixed: true,
      });
      board.create("text", [9.3, 3.4], {
        text: "d₂", color: accent,
        fontSize: 13, fontFamily: "var(--font-syne, sans-serif)", fixed: true,
      });

      // Intersection points A (on d₁) and B (on sécante near d₁)
      const pA = board.create("point", [5, 7], {
        name: "A", size: 4,
        fillColor: green, strokeColor: green,
        fixed: true, showInfoBox: false,
        label: { color: green, fontSize: 12, offset: [8, 4] },
      });
      const pB = board.create("point", [5, 5], {
        name: "B", size: 4,
        fillColor: txt2, strokeColor: txt2,
        fixed: true, showInfoBox: false,
        label: { color: txt2, fontSize: 12, offset: [8, 4] },
      });

      // α angle indicator on d₁
      const pAlpha1 = board.create("point", [3.5, 7], { visible: false, fixed: true });
      board.create("angle", [pAlpha1, pA, pB], {
        radius: 0.55,
        strokeColor: green, fillColor: "rgba(34,197,94,0.12)",
        label: {
          text: `α=${TARGET_ANGLE}°`,
          color: green, fontSize: 11,
          fontFamily: "var(--font-dm-mono, monospace)",
          offset: [16, 2],
        },
        fixed: true,
      });

      /* ── Mobile point C on d₂ ─────────────────────────────────────────── */
      const pC = board.create("glider", [5.5, 3, pD2a.parentElement ? pD2a : board.defaultAxes?.x ?? pD2b], {
        name: "C", size: 6,
        fillColor: orange, strokeColor: "#fff",
        strokeWidth: 1.5, showInfoBox: false,
        label: { color: orange, fontSize: 12, offset: [8, -16] },
        snapToGrid: true, snapSizeX: 0.5, snapSizeY: 0,
      });
      // Re-create as a constrained glider on d₂ line
      // Simpler: use a point on d₂ (y=3) with x free
      // Use a free point constrained via Y
      const pC2 = board.create("point", [5.5, 3], {
        name: "C", size: 6,
        fillColor: orange, strokeColor: "#fff",
        strokeWidth: 1.5, showInfoBox: false,
        label: { color: orange, fontSize: 12, offset: [8, -16] },
        snapToGrid: true, snapSizeX: 0.5,
      });

      // Remove the glider attempt, keep pC2
      board.removeObject(pC);
      pCRef.current = pC2;

      // Constrain C to stay on d₂ (y=3)
      pC2.moveAlong = false;
      // Lock Y via event
      board.on("update", () => {
        if (pC2.Y() !== 3) {
          pC2.setPositionDirectly(window.JXG.COORDS_BY_USER, [pC2.X(), 3]);
        }
      });

      // Ray from B through C (dynamic)
      board.create("arrow", [pB, pC2], {
        strokeColor: orange, strokeWidth: 1.6,
        lastArrow: { type: 1, size: 5 },
        highlight: false,
      });

      /* ── Angle arc BCA ───────────────────────────────────────────────────── */
      // Anchor point on d₂ to the left of C for angle measurement
      const pAnchor = board.create("point", [0, 3], { visible: false, fixed: true });
      const angleArc = board.create("angle", [pB, pC2, pAnchor], {
        radius: 0.65,
        strokeColor: orange, fillColor: "rgba(245,158,11,0.15)",
        label: { color: orange, fontSize: 11, fontFamily: "var(--font-dm-mono, monospace)" },
        highlight: false,
      });

      /* ── Angle label (live) ──────────────────────────────────────────────── */
      const lbl = board.create("text", [
        () => pC2.X() + 0.8,
        () => pC2.Y() + 0.9,
        () => {
          const deg = computeAngle(pB, pC2, pAnchor);
          return `∠BCA = ${deg}°`;
        },
      ], {
        color: orange, fontSize: 11,
        fontFamily: "var(--font-dm-mono, monospace)",
        fixed: false, highlight: false,
      });
      angleLblRef.current = lbl;

      /* ── Live angle update → parent state ─────────────────────────────── */
      board.on("update", () => {
        const deg = computeAngle(pB, pC2, pAnchor);
        setCurrentAngle(deg);
        // Step 1 done when user has dragged C (angle changed from 0)
        if (deg > 0) {
          setDoneSteps((prev) => {
            if (prev.includes(1)) return prev;
            setCurrentStep(2);
            return [...prev, 1];
          });
        }
      });
    },
    [isDark]
  );

  /* ── Validate ────────────────────────────────────────────────────────────── */
  const handleValidate = () => {
    const diff = Math.abs(currentAngle - TARGET_ANGLE);
    if (diff <= TOLERANCE) {
      setValidated(true);
      completeStep(2);
      completeStep(3);
      setRingClass("canvas-ring-success");
      setFeedback({
        type:    "success",
        message: `<strong>Excellent !</strong> ∠BCA = ${currentAngle}° ≈ α = ${TARGET_ANGLE}°. Les angles alternes-internes sont égaux, donc <strong>d₁ ∥ d₂</strong>.`,
      });
      const s = Math.max(60, Math.round(100 - diff * 8));
      setScore(s);
      setScoreMsg(
        diff < 1
          ? `Parfait ! Placement au degré près. d₁ ∥ d₂ par les angles alternes-internes.`
          : `Très bien ! Ton angle est à ${diff.toFixed(1)}° de la cible. La propriété est validée.`
      );
      setTimeout(() => setShowScore(true), 400);
      launchConfetti();
    } else if (diff <= TOLERANCE * 3) {
      setRingClass("");
      setFeedback({
        type:    "hint",
        message: `<strong>Presque !</strong> Ton angle est à ${diff.toFixed(1)}° de la cible. Déplace C un peu ${currentAngle < TARGET_ANGLE ? "vers la droite" : "vers la gauche"}.`,
      });
    } else {
      setRingClass("canvas-ring-error");
      setFeedback({
        type:    "error",
        message: `<strong>Pas encore.</strong> ∠BCA = ${currentAngle}° mais α = ${TARGET_ANGLE}°. Repositionne le point C sur d₂.`,
      });
      setTimeout(() => setRingClass(""), 900);
    }
  };

  /* ── Hint ────────────────────────────────────────────────────────────────── */
  const handleHint = () => {
    if (hintShown) return;
    setHintShown(true);
    setFeedback({
      type:    "hint",
      message: `<strong>Indice —</strong> L'angle alterno-interne est du <em>côté opposé</em> de la sécante à α. Pour α = 50°, cherche C tel que BC forme 50° avec d₂ mais de l'autre côté. Essaie de déplacer C vers la droite (x ≈ 6.5).`,
    });
  };

  /* ── Reset ───────────────────────────────────────────────────────────────── */
  const handleReset = () => {
    setValidated(false);
    setHintShown(false);
    setDoneSteps([]);
    setCurrentStep(1);
    setRingClass("");
    setShowScore(false);
    setCurrentAngle(0);
    setFeedback({
      type:    "",
      message: "<strong>Étape 1 —</strong> Déplace le point mobile <strong>C</strong> (orange) sur la droite d₂ pour que l'angle ∠BCA soit alterno-interne à l'angle α = 50°.",
    });

    // Move C back
    if (pCRef.current && boardRef.current) {
      pCRef.current.moveTo([5.5, 3], 400);
      boardRef.current.update();
    }
  };

  /* ── Steps config ────────────────────────────────────────────────────────── */
  const steps = [
    { id: 1, label: "Déplacer C sur d₂" },
    { id: 2, label: `Ajuster ∠BCA = ${TARGET_ANGLE}°` },
    { id: 3, label: "Valider le parallélisme" },
  ];

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

      {/* ── Left — canvas + controls ─────────────────────────────────────── */}
      <div className="flex flex-col gap-4">

        {/* Instruction banner */}
        <FeedbackBanner type={feedback.type} message={feedback.message} html />

        {/* Canvas */}
        <div className="relative">
          <JSXGraphCanvas
            boardId="board-angles-alternes"
            onReady={handleBoardReady}
            ringClass={ringClass}
            aspectRatio="4/3"
          />

          {/* Live angle badge overlay */}
          <div
            className="absolute top-3 left-3 font-mono text-[11px] px-2.5 py-1.5 rounded-[6px] pointer-events-none"
            style={{
              background:  "var(--surface)",
              border:      "1px solid var(--border)",
              color:       currentAngle > 0 ? "#F59E0B" : "var(--txt3)",
            }}
          >
            ∠BCA = {currentAngle}°
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleValidate}
            disabled={validated || currentAngle === 0}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] font-mono text-[12px] cursor-pointer",
              "border transition-all duration-[180ms]",
              validated
                ? "bg-[var(--green-muted)] border-[rgba(34,197,94,0.3)] text-[var(--green)]"
                : currentAngle === 0
                ? "opacity-40 cursor-not-allowed border-[var(--border)] text-[var(--txt3)] bg-[var(--elevated)]"
                : "bg-[var(--accent)] border-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
            )}
          >
            {validated ? (
              <>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Correct !
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Valider ma réponse
              </>
            )}
          </button>

          {!validated && (
            <button
              onClick={handleHint}
              disabled={hintShown}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2.5 rounded-[8px] font-mono text-[11px] cursor-pointer",
                "border border-[var(--border)] bg-[var(--elevated)]",
                "text-[var(--txt2)] hover:text-[var(--txt)] hover:bg-[var(--hover)]",
                "transition-all duration-[180ms]",
                hintShown && "opacity-50 cursor-not-allowed"
              )}
            >
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="8" cy="5" r="1.2" fill="currentColor"/>
                <path d="M8 8v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              {hintShown ? "Indice affiché" : "Afficher un indice"}
            </button>
          )}

          <button
            onClick={handleReset}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 rounded-[8px] font-mono text-[11px] cursor-pointer ml-auto",
              "border border-[var(--border)] bg-[var(--elevated)]",
              "text-[var(--txt2)] hover:text-[var(--txt)] hover:bg-[var(--hover)]",
              "transition-all duration-[180ms]"
            )}
          >
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 8A6 6 0 1 1 4.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 3.5V8H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Réinitialiser
          </button>
        </div>
      </div>

      {/* ── Right — steps + score ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-5">

        {/* Step tracker */}
        <StepTracker
          steps={steps}
          currentStep={currentStep}
          doneSteps={doneSteps}
        />

        {/* Recall card */}
        <div
          className="p-4 rounded-[10px] border border-[var(--border)] flex flex-col gap-2"
          style={{ background: "var(--elevated)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: "var(--txt3)" }}>
            Rappel — définition
          </p>
          <p className="font-body italic text-[12.5px] leading-relaxed" style={{ color: "var(--txt2)" }}>
            Deux angles sont <strong style={{ color: "var(--txt)", fontStyle: "normal" }}>alternes-internes</strong> s'ils sont de part et d'autre de la sécante, entre les deux droites.
          </p>
          <p className="font-mono text-[12px] mt-1" style={{ color: "var(--accent)" }}>
            α = {TARGET_ANGLE}° → ∠BCA = ?
          </p>
        </div>

        {/* Score badge (appears on success) */}
        {showScore && (
          <ScoreBadge
            score={score}
            message={scoreMsg}
            onRetry={handleReset}
          />
        )}
      </div>
    </div>
  );
}
