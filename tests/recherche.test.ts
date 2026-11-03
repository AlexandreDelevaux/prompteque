import { describe, expect, it } from "vitest";
import { rechercher } from "../lib/recherche";
import type { Prompt } from "../lib/types";

const liste: Prompt[] = [
  {
    id: "a",
    titre: "Installer gh",
    jour: 2,
    tags: ["git"],
    texte: "Installe la CLI GitHub.",
    source: "J2",
  },
  {
    id: "b",
    titre: "Hook gitleaks",
    jour: 3,
    tags: ["sécurité"],
    texte: "Bloque les secrets avant le commit.",
    source: "J3",
  },
];

describe("rechercher", () => {
  it("rend toute la liste quand la requête est vide", () => {
    expect(rechercher(liste, "   ")).toHaveLength(2);
  });

  it("ignore la casse", () => {
    expect(rechercher(liste, "GITLEAKS").map((p) => p.id)).toEqual(["b"]);
  });

  it("cherche aussi dans les tags", () => {
    expect(rechercher(liste, "sécurité").map((p) => p.id)).toEqual(["b"]);
  });
});
