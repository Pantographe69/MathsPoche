import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Exercice progress ─────────────────────────────────────────────────────────
interface ExerciceProgress {
  slug:        string;
  status:      "todo" | "inprogress" | "done";
  score?:      number;       // 0-100
  completedAt?: string;      // ISO date
  attempts:    number;
}

// ── Store shape ───────────────────────────────────────────────────────────────
interface MathPocheStore {
  // Progress
  progress: Record<string, ExerciceProgress>;
  setProgress: (slug: string, data: Partial<ExerciceProgress>) => void;
  getProgress: (slug: string) => ExerciceProgress | undefined;

  // Streak
  streak: number;
  lastActiveDate: string | null;
  incrementStreak: () => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// ── Store ─────────────────────────────────────────────────────────────────────
export const useMathPocheStore = create<MathPocheStore>()(
  persist(
    (set, get) => ({
      // Progress
      progress: {},
      setProgress: (slug, data) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [slug]: {
              slug,
              status:   "inprogress",
              attempts: 0,
              ...state.progress[slug],
              ...data,
            },
          },
        })),
      getProgress: (slug) => get().progress[slug],

      // Streak
      streak: 0,
      lastActiveDate: null,
      incrementStreak: () => {
        const today = new Date().toDateString();
        const last  = get().lastActiveDate;
        if (last === today) return;
        const yesterday = new Date(Date.now() - 86_400_000).toDateString();
        set({
          streak:         last === yesterday ? get().streak + 1 : 1,
          lastActiveDate: today,
        });
      },

      // UI
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    { name: "mathpoche-store" }
  )
);
