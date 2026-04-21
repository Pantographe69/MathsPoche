"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// ── JXG type shim ─────────────────────────────────────────────────────────────
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    JXG: any;
  }
}

export interface JSXGraphCanvasProps {
  /** Unique HTML id for the board container */
  boardId:   string;
  /** Called once after the board is ready, receives the JXG board object */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onReady:   (board: any) => void;
  /** Called on every pointer-up / move so the parent can read state */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate?: (board: any) => void;
  className?: string;
  /** Extra ring class injected from outside (success-ring / error-ring) */
  ringClass?: string;
  /** Aspect ratio expressed as "w/h" CSS value, default "1/1" */
  aspectRatio?: string;
}

/**
 * JSXGraphCanvas
 * A thin React wrapper around JSXGraph.
 * - Loads the board once on mount via `onReady`.
 * - Destroys it on unmount.
 * - Re-themes on dark/light switch by destroying + recreating.
 */
export function JSXGraphCanvas({
  boardId,
  onReady,
  onUpdate,
  className,
  ringClass,
  aspectRatio = "1/1",
}: JSXGraphCanvasProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Keep a stable ref to the callbacks so the effect doesn't re-run on render
  const onReadyRef  = useRef(onReady);
  const onUpdateRef = useRef(onUpdate);
  onReadyRef.current  = onReady;
  onUpdateRef.current = onUpdate;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boardRef = useRef<any>(null);

  const initBoard = useCallback(() => {
    if (typeof window === "undefined" || !window.JXG) return;

    // Free previous board if any
    if (boardRef.current) {
      try { window.JXG.JSXGraph.freeBoard(boardRef.current); } catch (_) {}
      boardRef.current = null;
    }

    const board = window.JXG.JSXGraph.initBoard(boardId, {
      boundingbox:     [-1, 11, 11, -1],
      keepaspectratio: false,
      shownavigation:  false,
      showCopyright:   false,
      pan:             { enabled: false },
      zoom:            { enabled: false, wheel: false },
      renderer:        "svg",
      grid: {
        visible:     true,
        strokeColor: isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.06)",
        strokeWidth: 1,
      },
      backgroundColor: isDark ? "#0f1117" : "#f8f9fd",
      defaultAxes: {
        x: {
          strokeColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)",
          strokeWidth: 1,
          ticks: { visible: false },
        },
        y: {
          strokeColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)",
          strokeWidth: 1,
          ticks: { visible: false },
        },
      },
    });

    boardRef.current = board;

    // Wire update callback
    if (onUpdateRef.current) {
      board.on("update", () => onUpdateRef.current?.(board));
    }

    // Let the parent draw its geometry
    onReadyRef.current(board);
  }, [boardId, isDark]);

  // Init on mount + re-init when theme changes
  useEffect(() => {
    // JSXGraph loads via <script defer>, wait for it
    if (window.JXG) {
      initBoard();
    } else {
      const interval = setInterval(() => {
        if (window.JXG) {
          clearInterval(interval);
          initBoard();
        }
      }, 50);
      return () => clearInterval(interval);
    }

    return () => {
      if (boardRef.current) {
        try { window.JXG.JSXGraph.freeBoard(boardRef.current); } catch (_) {}
        boardRef.current = null;
      }
    };
  }, [initBoard]);

  return (
    <div
      id={boardId}
      className={cn(
        "w-full rounded-[12px] overflow-hidden transition-all duration-[300ms]",
        ringClass,
        className
      )}
      style={{ aspectRatio }}
    />
  );
}
