/**
 * lib/katex.ts
 * Server-safe KaTeX rendering helper.
 * For client components, import `renderToString` from "katex" directly.
 */

/** Render a LaTeX string to an HTML string (server-side or SSR-safe). */
export function renderLatex(latex: string, displayMode = false): string {
  // Dynamic import so this works without bundling KaTeX on every page.
  // In practice you'd call this once per component render.
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const katex = require("katex") as typeof import("katex");
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      output: "html",
      strict: false,
    });
  } catch {
    return `<span style="color:var(--red)">${latex}</span>`;
  }
}
