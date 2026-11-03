import { notFound } from "next/navigation";
import FicheRessource from "@/components/FicheRessource";
import { ressources, trouverRessource } from "@/lib/ressources";

export function generateStaticParams() {
  return ressources.commandes.map((ressource) => ({ id: ressource.id }));
}

export default async function PageCommande({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ressource = trouverRessource("commandes", id);
  if (!ressource) notFound();

  return (
    <FicheRessource
      ressource={ressource}
      retour="/commandes"
      libelleRetour="Toutes les commandes"
      libelleCopier="Copier la commande"
    />
  );
}
