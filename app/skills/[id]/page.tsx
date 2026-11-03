import { notFound } from "next/navigation";
import FicheRessource from "@/components/FicheRessource";
import { ressources, trouverRessource } from "@/lib/ressources";

export function generateStaticParams() {
  return ressources.skills.map((ressource) => ({ id: ressource.id }));
}

export default async function PageSkill({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ressource = trouverRessource("skills", id);
  if (!ressource) notFound();

  return (
    <FicheRessource
      ressource={ressource}
      retour="/skills"
      libelleRetour="Toutes les skills"
      libelleCopier="Copier la skill"
    />
  );
}
