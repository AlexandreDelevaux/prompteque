import commandes from "../data/commandes.json";
import mcps from "../data/mcp.json";
import skills from "../data/skills.json";
import type { Ressource, TypeRessource } from "./types";

export const ressources: Record<TypeRessource, Ressource[]> = {
  mcp: mcps,
  commandes,
  skills,
};

export function trouverRessource(
  type: TypeRessource,
  id: string,
): Ressource | undefined {
  return ressources[type].find((ressource) => ressource.id === id);
}

export function estTypeRessource(valeur: string): valeur is TypeRessource {
  return valeur === "mcp" || valeur === "commandes" || valeur === "skills";
}
