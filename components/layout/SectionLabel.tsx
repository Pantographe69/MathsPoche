import Link from "next/link";

interface SectionLabelProps {
  label: string;
  href: string;
  count?: number;
}

export function SectionLabel({ label, href, count }: SectionLabelProps) {
  return (
    <div className="flex items-center justify-between">
      <p
        className="font-mono text-[10px] uppercase tracking-[0.12em]"
        style={{ color: "var(--txt3)" }}
      >
        {label}
        {count !== undefined && (
          <span
            className="ml-2 px-1.5 py-0.5 rounded-full border font-mono text-[9px]"
            style={{
              color: "var(--txt3)",
              borderColor: "var(--border)",
              background: "var(--elevated)",
            }}
          >
            {count}
          </span>
        )}
      </p>
      <Link
        href={href}
        className="font-mono text-[10px] no-underline transition-colors duration-[180ms] hover:text-[var(--accent)]"
        style={{ color: "var(--txt3)" }}
      >
        Tout voir →
      </Link>
    </div>
  );
}
