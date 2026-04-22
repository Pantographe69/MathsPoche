import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ExerciceShell } from "@/components/exercices/ExerciceShell";
import { ExerciceRenderer } from "@/components/exercices/ExerciceRenderer";
import { EXERCICES_BY_SLUG } from "@/content/catalogue";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(EXERCICES_BY_SLUG).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props) {
  const meta = EXERCICES_BY_SLUG[params.slug];
  if (!meta) return {};
  return { title: meta.title, description: meta.description };
}

export default function ExercicePage({ params }: Props) {
  const meta = EXERCICES_BY_SLUG[params.slug];
  if (!meta) notFound();

  return (
    <AppShell>
      <ExerciceShell meta={meta}>
        <ExerciceRenderer slug={params.slug} />
      </ExerciceShell>
    </AppShell>
  );
}
