import Catalogue from "@/components/Catalogue";
import { ressources } from "@/lib/ressources";

export const metadata = {
  title: "MCP — Prompthèque",
  description:
    "Les serveurs MCP utiles au développement, avec leur configuration prête à coller.",
};

export default function PageMcp() {
  return (
    <Catalogue
      titre="Serveurs MCP"
      intro="Les serveurs MCP branchés à l'agent : documentation, navigateur, dépôts, fichiers, base de données et erreurs de production."
      badge="MCP"
      base="/mcp"
      placeholder="Chercher : context7, navigateur, github…"
      ressources={ressources.mcp}
    />
  );
}
