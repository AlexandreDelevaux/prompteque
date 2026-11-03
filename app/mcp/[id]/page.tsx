import { notFound } from "next/navigation";
import FicheRessource from "@/components/FicheRessource";
import { ressources, trouverRessource } from "@/lib/ressources";

export function generateStaticParams() {
  return ressources.mcp.map((ressource) => ({ id: ressource.id }));
}

export default async function PageMcp({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ressource = trouverRessource("mcp", id);
  if (!ressource) notFound();

  return (
    <FicheRessource
      ressource={ressource}
      retour="/mcp"
      libelleRetour="Tous les MCP"
      libelleCopier="Copier la configuration"
    />
  );
}
