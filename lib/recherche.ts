import type { Prompt } from "./types";

/** Filtre les prompts sur le titre, le texte et les tags (voir README). */
export function rechercher(liste: Prompt[], requete: string): Prompt[] {
  const q = requete.trim().toLowerCase();
  if (q === "") return liste;
  return liste.filter(
    (p) =>
      p.titre.toLowerCase().includes(q) ||
      p.texte.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
