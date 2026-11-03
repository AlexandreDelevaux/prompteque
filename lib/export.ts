import type { Prompt } from "./types";

/** Exporte la liste en Markdown : un titre par prompt, puis son texte. */
export function exporterEnMarkdown(liste: Prompt[]): string {
  return liste
    .map(
      (p) =>
        `## ${p.titre} (jour ${p.jour})\n\n${p.texte}\n\nTags : ${p.tags.join(", ")} · Source : ${p.source}`,
    )
    .join("\n\n");
}
