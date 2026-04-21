"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href:  string;
  icon?: React.ReactNode;
}
interface NavGroup {
  id:       string;
  label:    string;
  icon:     React.ReactNode;
  items:    NavItem[];
}

/* ─── Icons ──────────────────────────────────────────────────────────────────── */
const IconTriangle = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 1L15 13H1L8 1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);
const IconPlus = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2 8h12M8 2v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IconWave = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M1 13C3 13 4 3 7 3s3 10 5 10 2-4 3-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IconHome = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2 7L8 2l6 5v7H10V9H6v5H2V7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
  </svg>
);
const IconBook = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M6 2v12M5 5h1M5 8h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconPencil = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
  </svg>
);

/* ─── Nav data ───────────────────────────────────────────────────────────────── */
const NAV_GROUPS: NavGroup[] = [
  {
    id: "geo",
    label: "Géométrie",
    icon: <IconTriangle />,
    items: [
      { label: "Angles & parallèles", href: "/cours/geometrie-angles" },
      { label: "Théorème de Pythagore", href: "/cours/pythagore" },
      { label: "Cercles & inscriptions", href: "/cours/cercles" },
      { label: "→ Exercices géométrie", href: "/exercices?cat=geometrie" },
    ],
  },
  {
    id: "alg",
    label: "Algèbre",
    icon: <IconPlus />,
    items: [
      { label: "Équations du 1er degré", href: "/cours/equations-1er-degre" },
      { label: "Fractions & simplifications", href: "/cours/fractions" },
      { label: "Développer & factoriser", href: "/cours/developper-factoriser" },
      { label: "→ Exercices algèbre", href: "/exercices?cat=algebre" },
    ],
  },
  {
    id: "fn",
    label: "Fonctions",
    icon: <IconWave />,
    items: [
      { label: "Fonctions affines", href: "/cours/fonctions-affines" },
      { label: "Fonctions quadratiques", href: "/cours/fonctions-quadratiques" },
      { label: "→ Exercices fonctions", href: "/exercices?cat=fonctions" },
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────────── */
interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    geo: true,
  });

  const toggleGroup = (id: string) =>
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside
      className={cn(
        "flex flex-col overflow-y-auto border-r border-[var(--border)]",
        "transition-[background,border-color] duration-[350ms]",
        className
      )}
      style={{
        gridArea: "sidebar",
        width: "var(--sidebar-w)",
        background: "var(--surface)",
      }}
    >
      {/* Top nav items */}
      <div className="px-3 pt-4 pb-1 flex flex-col gap-0.5">
        <NavItemLink href="/" label="Accueil" icon={<IconHome />} active={pathname === "/"} />
        <NavItemLink href="/cours" label="Tous les cours" icon={<IconBook />} active={pathname === "/cours"} />
        <NavItemLink href="/exercices" label="Exercices" icon={<IconPencil />} active={pathname === "/exercices"} />
      </div>

      {/* Divider */}
      <div className="mx-3 my-3 border-t border-[var(--border)]" />

      {/* Groups */}
      <div className="px-3 flex flex-col gap-1 flex-1">
        {NAV_GROUPS.map((group) => (
          <NavGroup
            key={group.id}
            group={group}
            open={!!openGroups[group.id]}
            onToggle={() => toggleGroup(group.id)}
            currentPath={pathname}
          />
        ))}
      </div>

      {/* Footer — progress */}
      <div
        className="mx-3 mb-4 mt-6 p-3 rounded-[10px] border border-[var(--border)] flex flex-col gap-2"
        style={{ background: "var(--elevated)" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--txt3)" }}>
            Progression globale
          </span>
          <span className="font-mono text-[11px] font-medium" style={{ color: "var(--accent)" }}>
            42%
          </span>
        </div>
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "var(--border-s)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: "42%", background: "var(--accent)" }}
          />
        </div>
        <span className="font-mono text-[10px]" style={{ color: "var(--txt3)" }}>
          8 exercices · 3 jours de suite 🔥
        </span>
      </div>
    </aside>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────────── */
function NavItemLink({
  href, label, icon, active,
}: {
  href: string; label: string; icon?: React.ReactNode; active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-2.5 py-2 rounded-[6px] no-underline",
        "font-display text-[13px] font-[500] transition-all duration-[180ms]",
        active
          ? "text-[var(--accent)] bg-[var(--accent-muted)]"
          : "text-[var(--txt2)] hover:text-[var(--txt)] hover:bg-[var(--hover)]"
      )}
    >
      <span className={active ? "text-[var(--accent)]" : "text-[var(--txt3)]"}>
        {icon}
      </span>
      {label}
    </Link>
  );
}

function NavGroup({
  group, open, onToggle, currentPath,
}: {
  group: NavGroup; open: boolean; onToggle: () => void; currentPath: string;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[6px]",
          "font-mono text-[10px] uppercase tracking-[0.08em] cursor-pointer",
          "border-none bg-transparent transition-all duration-[180ms]",
          "hover:bg-[var(--hover)]"
        )}
        style={{ color: "var(--txt3)" }}
      >
        <span>{group.icon}</span>
        <span className="flex-1 text-left">{group.label}</span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          className="transition-transform duration-200 flex-shrink-0"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="mt-0.5 ml-4 flex flex-col gap-0.5 border-l border-[var(--border)] pl-3 pb-1">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block py-1.5 font-body italic text-[12.5px] transition-all duration-[180ms] no-underline",
                currentPath === item.href
                  ? "text-[var(--accent)]"
                  : "text-[var(--txt2)] hover:text-[var(--txt)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
