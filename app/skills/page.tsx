import Catalogue from "@/components/Catalogue";
import { ressources } from "@/lib/ressources";

export const metadata = {
  title: "Skills — Prompthèque",
  description:
    "Les skills OpenCode réutilisables, prêtes à déposer dans .opencode/skills.",
};

export default function PageSkills() {
  return (
    <Catalogue
      titre="Skills"
      intro="Les skills qui donnent une méthode à l'agent : commit, revue, test, documentation, sécurité, bilan et inspection visuelle."
      badge="Skill"
      base="/skills"
      placeholder="Chercher : commit, sécurité, tests…"
      ressources={ressources.skills}
    />
  );
}
