import type { Metadata } from "next";
import { Syne, DM_Mono, Lora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MathPoche — Apprendre les maths autrement",
    template: "%s · MathPoche",
  },
  description:
    "Plateforme d'apprentissage des mathématiques (collège / lycée) avec exercices interactifs, cours en fiches et géométrie dynamique.",
  keywords: ["mathématiques", "collège", "lycée", "exercices", "géométrie", "algèbre"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${syne.variable} ${dmMono.variable} ${lora.variable}`}
    >
      <head>
        {/* JSXGraph — loaded globally so the canvas component can reference it */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/1.9.2/jsxgraph.min.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/1.9.2/jsxgraphcore.min.js"
          defer
        />
        {/* KaTeX */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
        />
      </head>
      <body className="font-body">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="mathpoche-theme"
        >
          {children}
          <canvas id="confetti-canvas" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  );
}
