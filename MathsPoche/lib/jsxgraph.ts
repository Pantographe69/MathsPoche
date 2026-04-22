/**
 * lib/jsxgraph.ts
 * Helpers for JSXGraph board initialisation and common utilities.
 * All functions are CLIENT-ONLY (they reference the global JXG object).
 */

// ── Types ────────────────────────────────────────────────────────────────────
declare const JXG: {
  JSXGraph: {
    initBoard: (id: string, attrs: Record<string, unknown>) => JXGBoard;
    freeBoard: (board: JXGBoard) => void;
  };
};

export type JXGBoard = {
  create: (type: string, parents: unknown[], attrs?: Record<string, unknown>) => unknown;
  removeObject: (obj: unknown) => void;
  update: () => void;
  on: (event: string, handler: (evt: Event) => void) => void;
};

// ── Default theme attrs ───────────────────────────────────────────────────────
export function getBoardThemeAttrs(isDark: boolean) {
  return {
    boundingbox:        [-1, 11, 11, -1] as [number, number, number, number],
    keepaspectratio:    false,
    shownavigation:     false,
    showCopyright:      false,
    pan:                { enabled: false },
    zoom:               { enabled: false, wheel: false },
    grid:               {
      visible:   true,
      strokeColor: isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.06)",
      strokeWidth: 1,
    },
    axis:               false,
    backgroundColor:    isDark ? "#0f1117" : "#f8f9fd",
    defaultAxes:        {
      x: {
        strokeColor:  isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)",
        strokeWidth:  1,
        ticks: { visible: false },
      },
      y: {
        strokeColor:  isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)",
        strokeWidth:  1,
        ticks: { visible: false },
      },
    },
  };
}

// ── Init board ────────────────────────────────────────────────────────────────
export function initBoard(containerId: string, isDark: boolean): JXGBoard | null {
  if (typeof JXG === "undefined") return null;
  const attrs = getBoardThemeAttrs(isDark);
  return JXG.JSXGraph.initBoard(containerId, {
    ...attrs,
    renderer: "svg",
  });
}

export function freeBoard(board: JXGBoard) {
  if (typeof JXG === "undefined") return;
  JXG.JSXGraph.freeBoard(board);
}

// ── Snapping helper ───────────────────────────────────────────────────────────
/** Snap a value to the nearest multiple of `step`. */
export function snap(value: number, step: number): number {
  return Math.round(value / step) * step;
}

// ── Angle helpers ──────────────────────────────────────────────────────────────
/** Return the angle (degrees) of vector from A to B, measured from positive X-axis. */
export function angleDeg(ax: number, ay: number, bx: number, by: number): number {
  return (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
}

/** Clamp angle to [0, 180] for interior angle display. */
export function clampAngle(deg: number): number {
  const a = ((deg % 360) + 360) % 360;
  return a > 180 ? 360 - a : a;
}
