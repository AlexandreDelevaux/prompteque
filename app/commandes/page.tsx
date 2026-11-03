import Catalogue from "@/components/Catalogue";
import { ressources } from "@/lib/ressources";

export const metadata = {
  title: "Commandes — Prompthèque",
  description:
    "Les commandes OpenCode réutilisables, prêtes à déposer dans .opencode/commands.",
};

export default function PageCommandes() {
  return (
    <Catalogue
      titre="Commandes"
      intro="Les commandes OpenCode qui raccourcissent le travail courant : bilan, commit, revue, tests, explication et plan."
      badge="Commande"
      base="/commandes"
      placeholder="Chercher : commit, tests, revue…"
      ressources={ressources.commandes}
    />
  );
}
