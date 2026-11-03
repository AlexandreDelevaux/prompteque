import { describe, expect, it } from "vitest";
import { rechercher } from "../lib/recherche";
import { ressources } from "../lib/ressources";
import type { TypeRessource } from "../lib/types";

const types: TypeRessource[] = ["mcp", "commandes", "skills"];

describe("ressources", () => {
  it("expose des fiches pour chaque onglet", () => {
    for (const type of types) {
      expect(ressources[type].length).toBeGreaterThan(0);
    }
  });

  it("n'a pas d'id en double dans un onglet", () => {
    for (const type of types) {
      const ids = ressources[type].map((ressource) => ressource.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("cherche dans la description et le contenu", () => {
    const mcp = rechercher(ressources.mcp, "documentation");
    expect(mcp.map((ressource) => ressource.id)).toContain("context7");

    const contenu = rechercher(ressources.commandes, "conforme");
    expect(contenu.length).toBeGreaterThan(0);
  });
});
